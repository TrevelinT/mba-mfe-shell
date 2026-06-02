import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const mfeRoot = path.resolve(dirname, "..");

function resolveRemote(
	remoteModule: string,
	...relativePaths: string[]
): Record<string, string> {
	for (const relativePath of relativePaths) {
		const siblingPath = path.join(mfeRoot, relativePath);
		if (existsSync(siblingPath)) {
			return { [remoteModule]: siblingPath };
		}
		const ciPath = path.join(dirname, relativePath);
		if (existsSync(ciPath)) {
			return { [remoteModule]: ciPath };
		}
	}
	return {};
}

const federationAliases = {
	...resolveRemote(
		"product/Product",
		"product/src/components/product-container.tsx",
		"mfe-deps/product/src/components/product-container.tsx",
	),
	...resolveRemote(
		"buyBox/BuyBox",
		"buy-box/src/components/buy-box-container.tsx",
		"mfe-deps/buy-box/src/components/buy-box-container.tsx",
	),
	...resolveRemote(
		"cart/Cart",
		"cart/src/components/cart-container.tsx",
		"mfe-deps/cart/src/components/cart-container.tsx",
	),
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
