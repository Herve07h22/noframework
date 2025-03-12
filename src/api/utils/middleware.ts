import { IncomingMessage, ServerResponse } from "node:http";
import { Connect } from "vite";
import { parse as parseCookie } from "cookie";
import { type ApiFnArgs } from "../API";
import { api } from "../endpoints";

const COOKIE_NAME = "arco-auth-token"

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  path: "/",
} as const;

export type ServerOptions = {
  apiPrefix?: string;
  enableLogging?: boolean;
  entry:string;
};

export class ServerError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "ServerError";
  }
}

export function middleware(config: ServerOptions) {
  const logRequest = (
    message: string
  ) => {
    if (config.enableLogging) {
      console.log(
        `[${new Date().toISOString()}] ${message}`
      );
    }
  };

  return async (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    next: Connect.NextFunction
  ) => {
    const startTime = Date.now();
    const url = new URL(req.url!, `http://${req.headers.host}`);

    // Only handle requests to apiPrefix
    if (
      !url.pathname?.startsWith(config.apiPrefix || "/api") ||
      req.method !== "POST"
    ) {
      return next();
    }

    try {
      // Extract handler name from URL
      
      const domain =  url.pathname.split("/")[2] as keyof typeof api
      const endpoint = url.pathname.split("/")[3]
      let handler: ((args: ApiFnArgs<any>) => Promise<any>) | undefined

      if (domain in api) {
        const apiDomain = api[domain]
        if (endpoint in apiDomain) {
            handler = apiDomain[endpoint as keyof typeof apiDomain]
        }
      }

      if (!handler) {
        logRequest(
          `${req.method || "POST"} ${url.pathname || ""} 401 ${url.pathname} not found`
        );
        res.statusCode = 401;
        res.end(JSON.stringify({ error: `route ${url.pathname} not found` }));
        return
      }


      // Check authentication
      const cookies = parseCookie(req.headers.cookie || "");
      const token = cookies[COOKIE_NAME];

      // Read and parse request body
      const body = await readBody(req);
      const data = JSON.parse(body);

      // Execute handler
      const result = await handler({...data, token});

      // Set auth cookie if needed (e.g. on login/refresh)
      const maybeToken = result?.value?.token 
      if (maybeToken) {
        logRequest(
          `${req.method || "POST"} ${url.pathname || ""} Setting new token in cookie ${COOKIE_NAME}`
        );
        res.setHeader(
          "Set-Cookie",
          `${COOKIE_NAME}=${maybeToken}; ${Object.entries(COOKIE_OPTIONS)
            .map(([k, v]) => `${k}=${v}`)
            .join("; ")}`
        );
      }

      if (maybeToken === null) {
        logRequest(
          `${req.method || "POST"} ${url.pathname || ""} Removing token in cookie ${COOKIE_NAME}`
        );
        res.setHeader(
          "Set-Cookie",
          `${COOKIE_NAME}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ${Object.entries(
            COOKIE_OPTIONS
          )
            .map(([k, v]) => `${k}=${v}`)
            .join("; ")}`
        );
      }

      // Send response
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));

      logRequest(
        `${req.method || "POST"} ${url.pathname || ""} 200 ${Date.now() - startTime}ms`
      );
    } catch (error) {
      const statusCode = error instanceof ServerError ? error.statusCode : 500;

      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";

      res.statusCode = statusCode;
      res.end(JSON.stringify({ error: errorMessage }));

      logRequest(
        `${req.method || "POST"} ${url.pathname || ""} ${statusCode} ${Date.now() - startTime}ms`
      );
    }
  };
}

const readBody = async (req: IncomingMessage): Promise<string> => {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString();
};

