import { createServer, defineConfig, type Plugin, type ResolvedConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

function publicLobby(): Plugin {
  let config: ResolvedConfig;
  return {
    name: "nodevoice-public-lobby",
    configResolved(resolved) { config = resolved; },
    transformIndexHtml: {
      order: "pre",
      async handler(html, context) {
        const marker = "<!--public-lobby-->";
        if (html.split(marker).length !== 2) {
          throw new Error("Public HTML must contain exactly one lobby rendering marker.");
        }
        const renderer = context.server ?? await createServer({
          configFile: false,
          root: config.root,
          envDir: config.envDir,
          mode: config.mode,
          define: config.define,
          resolve: { alias: config.resolve.alias },
          plugins: [react()],
          optimizeDeps: { noDiscovery: true, include: [] },
          appType: "custom",
          server: { middlewareMode: true, hmr: false, watch: null },
        });
        try {
          const { renderPublicLobby } = await renderer.ssrLoadModule("/entry-server.tsx");
          const rendered = await renderPublicLobby();
          return html.replace(marker, () => rendered);
        } finally {
          if (!context.server) await renderer.close();
        }
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), publicLobby()],
  root: "src/client",
  build: {
    outDir: "../../dist",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/client"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:8787",
      "/compare": "http://localhost:8787",
      "/voice": "http://localhost:8787",
      "/nodeagents": "http://localhost:8787",
      "/health": "http://localhost:8787",
      // Only proxy the live API sub-paths — NOT a blanket "/live", which would
      // also swallow client module requests for src/client/live/*.tsx in dev.
      "^/live/(rooms|audio)": { target: "http://localhost:8787", changeOrigin: true },
    },
  },
});
