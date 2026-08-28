import React, { Suspense } from "react";
import { Breadcrumb } from "./Breadcrumb/Breadcrumb";
import { Footer } from "./Footer";
import { Header } from "./Header";

const Product = React.lazy(() => import("product/Product"));
const BuyBox = React.lazy(() => import("buyBox/BuyBox"));

function ProductRemotePlaceholder() {
	return (
		<div
			aria-busy="true"
			aria-label="Loading product"
			className="min-h-80 md:col-span-2 lg:col-span-9"
			role="status"
		/>
	);
}

function BuyBoxRemotePlaceholder() {
	return (
		<div
			aria-busy="true"
			aria-label="Loading buy box"
			className="min-h-96 lg:col-span-3"
			role="status"
		/>
	);
}

function App() {
	return (
		<div className="lg:min-h-dvh lg:flex lg:flex-col">
			<Header />
			<main className="pt-24 pb-xl max-w-max-width mx-auto px-margin-mobile md:px-gutter lg:flex-1">
				<Breadcrumb />
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-xl">
					<Suspense fallback={<ProductRemotePlaceholder />}>
						<Product />
					</Suspense>
					<Suspense fallback={<BuyBoxRemotePlaceholder />}>
						<BuyBox />
					</Suspense>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export { App };
