import { expect, test } from "../fixtures";

test.describe("Failure scenarios", () => {
	test("quantity does not go below 1", async ({ page }) => {
		await page.getByRole("button", { name: "Diminuir quantidade" }).click();
		await expect(page.getByRole("status")).toHaveText("1");
	});
});

test.describe("@visual Failure scenarios", () => {
	test("quantity does not go below 1", async ({ page }) => {
		await page.getByRole("button", { name: "Diminuir quantidade" }).click();
		await expect(page.getByRole("status")).toHaveText("1");
		await page.evaluate(() => document.fonts.ready);
		await expect(page).toHaveScreenshot(
			"e2e-fail-01-quantity-stays-at-minimum.png",
		);
	});
});
