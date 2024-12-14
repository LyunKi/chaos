import path from "node:path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

const globals = {
	"react-dom": "ReactDom",
	react: "React",
};

export default defineConfig({
	plugins: [react()],
	build: {
		lib: {
			name: "CloudDesignComponents",
			entry: "./src/index.ts",
			fileName: "index",
		},
		rollupOptions: {
			output: {
				globals,
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		open: "/demo/index.html",
	},
});
