import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const remotesDir = path.join(dirname, "src/test/remotes");

const federationAliases = {
	"product/Product": path.join(remotesDir, "product.tsx"),
	"buyBox/BuyBox": path.join(remotesDir, "buy-box.tsx"),
	"cart/Cart": path.join(remotesDir, "cart.tsx"),
};

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		dedupe: ["react", "react-dom"],
		alias: {
			react: path.join(dirname, "node_modules/react"),
			"react-dom": path.join(dirname, "node_modules/react-dom"),
			...federationAliases,
		},
	},
	test: {
		environment: "jsdom",
		setupFiles: [path.join(dirname, "vitest.setup.ts")],
		include: ["src/**/*.{test,spec}.{ts,tsx}"],
		exclude: ["tests/**", "**/node_modules/**", "**/dist/**"],
		coverage: {
			provider: "v8",
			reporter: ["json", "text"],
			reportsDirectory: "./coverage",
		},
	},
});
