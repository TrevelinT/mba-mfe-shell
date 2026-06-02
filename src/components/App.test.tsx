import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
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

	it("adds item to cart when add to cart is clicked", async () => {
		renderApp();

		await waitFor(() => {
			expect(
				screen.getByRole("button", { name: "Carrinho de compras, vazio" }),
			).toBeInTheDocument();
		});

		fireEvent.click(
			await screen.findByRole("button", { name: "Adicionar ao carrinho" }),
		);

		expect(
			await screen.findByRole("button", {
				name: "Carrinho de compras, 1 item",
			}),
		).toBeInTheDocument();
	});
});
