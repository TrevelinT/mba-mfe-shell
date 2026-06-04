import { cleanup, render, screen } from "@testing-library/react";
import { Suspense } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { App } from "./App";

function renderApp() {
	return render(
		<Suspense fallback={<div data-testid="app-loading" />}>
			<App />
		</Suspense>,
	);
}

describe("App", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders footer branding", () => {
		renderApp();
		expect(screen.getByText("Game Store")).toBeInTheDocument();
	});
});
