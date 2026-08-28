import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";
import { defineConfig, loadEnv } from "vite";
import {
	resolveFederationRemotes,
	resolveRemoteAssetProxy,
} from "./vite.config.remotes";

const CRITICAL_JS_ASSET = /\/assets\/(?:index|vendor)-[^"']+\.js$/;

function criticalPathPreloadHints(): Plugin {
	return {
		name: "critical-path-preload-hints",
		apply: "build",
		transformIndexHtml: {
			order: "post",
			handler(html) {
				const stylesheetMatch = html.match(
					/<link rel="stylesheet" crossorigin href="([^"]+)">/,
				);

				const scriptMatch = html.match(
					/<script type="module" crossorigin src="([^"]+)"><\/script>/,
				);

				const criticalJsHrefs = new Set<string>();

				if (scriptMatch?.[1] && CRITICAL_JS_ASSET.test(scriptMatch[1])) {
					criticalJsHrefs.add(scriptMatch[1]);
				}

				for (const match of html.matchAll(
					/(?:href|src)="([^"]*\/assets\/(?:index|vendor)-[^"]+\.js)"/g,
				)) {
					criticalJsHrefs.add(match[1]);
				}

				let nextHtml = html;

				nextHtml = nextHtml.replace(
					/<link rel="modulepreload"[^>]*href="[^"]*\/assets\/(?:index|vendor)-[^"]+\.js"[^>]*>\n?\s*/g,
					"",
				);

				if (scriptMatch && criticalJsHrefs.size > 0) {
					const modulePreloads = [...criticalJsHrefs]
						.map(
							(href) => `<link rel="modulepreload" crossorigin href="${href}">`,
						)
						.join("\n  ");
					const scriptTag =
						/<script type="module" crossorigin src="([^"]+)"><\/script>/.exec(
							nextHtml,
						)?.[0];
					if (scriptTag) {
						nextHtml = nextHtml.replace(
							scriptTag,
							`${modulePreloads}\n  ${scriptTag}`,
						);
					}
				}

				if (stylesheetMatch) {
					const stylesheetHref = stylesheetMatch[1];
					const asyncStylesheet = `<link rel="preload" as="style" crossorigin href="${stylesheetHref}" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" crossorigin href="${stylesheetHref}"></noscript>`;
					nextHtml = nextHtml.replace(stylesheetMatch[0], asyncStylesheet);
				}

				return nextHtml;
			},
		},
	};
}

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const remotes = resolveFederationRemotes(mode, env);
	const remoteAssetProxy = resolveRemoteAssetProxy(mode, env);

	return {
		base: process.env.VITE_BASE ?? "/mba-mfe-shell/",
		plugins: [
			react(),
			tailwindcss(),
			federation({
				name: "shell",
				remotes,
				shared: {
					react: { singleton: true },
					"react-dom": { singleton: true },
				},
			}),
			criticalPathPreloadHints(),
		],
		build: {
			target: "esnext",
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (
							id.includes("node_modules/react/") ||
							id.includes("node_modules/react-dom/") ||
							id.includes("node_modules/scheduler/")
						) {
							return "vendor";
						}
					},
				},
			},
		},
		server: {
			port: 5000,
			strictPort: true,
			cors: true,
			proxy: remoteAssetProxy,
		},
		preview: {
			port: 5000,
			strictPort: true,
			cors: true,
			proxy: remoteAssetProxy,
		},
	};
});
