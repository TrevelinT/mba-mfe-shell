import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		federation({
			name: "shell",
			remotes: {
				product: "http://localhost:5001/assets/remoteEntry.js",
				buyBox: "http://localhost:5002/assets/remoteEntry.js",
				cart: "http://localhost:5003/assets/remoteEntry.js",
			},
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
});
