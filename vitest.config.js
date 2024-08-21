export default defineConfig({
	test: {
		setupFiles: "./setupTest.js",
		global: true,
		environment: "jsdom",
	},
});
