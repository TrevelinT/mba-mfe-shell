import { test as baseTest } from "@playwright/test";

export { expect } from "@playwright/test";

export const test = baseTest.extend({
	page: async ({ page }, use) => {
		await page.goto("http://localhost:5000/");
		await page
			.getByRole("heading", {
				name: "Nintendo Switch 2 - Bundle Mario Kart World",
			})
			.waitFor();
		await page.evaluate(() => window.scrollTo(0, 0));
		await use(page);
	},
});
