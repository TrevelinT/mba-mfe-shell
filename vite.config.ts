import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { resolveFederationRemotes } from "./vite.config.remotes";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const remotes = resolveFederationRemotes(mode, env);

	return {
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
		],
		build: {
			target: "esnext",
		},
		server: {
			port: 5000,
			strictPort: true,
			cors: true,
		},
		preview: {
			port: 5000,
			strictPort: true,
			cors: true,
		},
	};
});
