module.exports = async (browser, context) => {
	const page = await browser.newPage();
	await page.goto(context.url, { waitUntil: "networkidle0", timeout: 30000 });

	await page.waitForFunction(
		() =>
			!document.querySelector('[aria-label="Loading product details"]') &&
			!document.querySelector('[aria-label="Loading buy box offer"]'),
		{ timeout: 15000 },
	);

	await page.waitForFunction(
		() =>
			[...document.querySelectorAll("h1")].some((el) =>
				el.textContent?.includes("Nintendo Switch 2 - Bundle Mario Kart World"),
			),
		{ timeout: 15000 },
	);

	await page.close();
};
