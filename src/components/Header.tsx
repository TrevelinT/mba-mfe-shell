import React, { Suspense } from "react";

const Cart = React.lazy(() => import("cart/Cart"));

function CartRemotePlaceholder() {
	return (
		<div
			aria-busy="true"
			aria-label="Loading cart"
			className="size-10"
			role="status"
		/>
	);
}

function Header() {
	return (
		<header className="bg-surface dark:bg-surface-container-low border-b border-outline-variant dark:border-outline fixed top-0 w-full z-50">
			<div className="flex items-center max-w-max-width mx-auto px-margin-mobile md:px-gutter h-16 justify-between">
				<a
					aria-label="Go to homepage"
					className="block h-10 text-on-surface"
					href={import.meta.env.BASE_URL}
				>
					<img
						alt="Game Store"
						className="h-full w-auto object-contain"
						height={40}
						src={`${import.meta.env.BASE_URL}game-store-logo.svg`}
						width={180}
					/>
				</a>
				<Suspense fallback={<CartRemotePlaceholder />}>
					<Cart />
				</Suspense>
			</div>
		</header>
	);
}

export { Header };
