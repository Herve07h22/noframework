import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { type ServerOptions } from "./src/api/utils/middleware";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createFullstackPlugin({
      apiPrefix: "/api",
      enableLogging: true,
      entry: "src/api/utils/middleware.ts",
    }),
  ],
})

function createFullstackPlugin(options: ServerOptions): Plugin {
  return {
    name: "api-middleware",
    async configureServer(server) {
      console.log("Starting vite plugin..");
      const appModule = await server.ssrLoadModule(options.entry);
      const middleware =
        "middleware" in appModule ? appModule["middleware"] : null;
      if (middleware) {
        server.middlewares.use(middleware(options));
      } else {
        console.log(`Error : no middleware export found in ${options.entry}`)
      }
    },
  
  };
}