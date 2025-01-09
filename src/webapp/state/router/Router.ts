import { type ReactNode } from "react";

export class Router {
  currentPage = "/login";

  navigate(to: string) {
    this.currentPage = to; 
  }

  match<T extends string>(
    path: T,
    render: (params: ExtractParams<T>) => ReactNode,
    loader?: (params: ExtractParams<T>) => void
  ): ReactNode {
    const patternSegments = path.split("/").filter(Boolean);
    const pathSegments = this.currentPage.split("/").filter(Boolean);

    if (patternSegments.length !== pathSegments.length) {
      return null;
    }

    const params = {} as ExtractParams<T>;

    for (let i = 0; i < patternSegments.length; i++) {
      const patternSegment = patternSegments[i];
      const pathSegment = pathSegments[i];

      if (patternSegment.startsWith(":")) {
        const paramName = patternSegment.slice(1);
        (params as any)[paramName] = pathSegment;
      } else if (patternSegment !== pathSegment) {
        return null;
      }
    }
    loader && loader(params);
    return render(params);
  }
}

type ExtractParams<T extends string> =
  T extends `${infer Start}:${infer Param}/${infer Rest}`
    ? {
        [K in Param extends `${infer Name}/${string}` ? Name : Param]: string;
      } & ExtractParams<Rest>
    : T extends `${infer Start}:${infer Param}`
    ? { [K in Param]: string }
    : {};
