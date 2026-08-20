import { test } from "@playwright/test";

test("seed", async ({ page }) => {
	await page.goto("./");
	await page
		.getByRole("heading", {
			name: "Nintendo Switch 2 - Bundle Mario Kart World",
		})
		.waitFor();
});
