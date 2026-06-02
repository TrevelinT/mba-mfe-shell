import React, { Suspense } from "react";

const Cart = React.lazy(() => import("cart/Cart"));

function Header() {
	return (
		<header className="bg-surface dark:bg-surface-container-low border-b border-outline-variant dark:border-outline fixed top-0 w-full z-50">
			<div className="flex items-center max-w-max-width mx-auto px-margin-mobile md:px-gutter h-16 justify-between">
				<a aria-label="Go to homepage" className="block h-10" href="/">
					<img
						alt=""
						className="h-full w-auto object-contain"
						src="https://lh3.googleusercontent.com/aida/ADBb0uh0UlXzXVmqfMLCkM7XgIHRoQwajV079egsJO6q1_yYOOQ5oaGTlPv2EkbgMF50KCql8w7ulShh-B_mCz-_FLV67hKCXpiwTnN1Nq9DwqRxPJdIj0EfoihzQU16C_0aIKN2nW3736OcQ-0rDp7AGPXPz1FpqkDpzWEZsa1fvaHk6U3a1flUOjAEELUJ44OtiZ7vOrxssJ-5PlpWpaMz8YwjNVSH8eYWND7dyZrCYUNp2PCapxWdOGo_ZRDX"
					/>
				</a>
				<Suspense fallback={null}>
					<Cart />
				</Suspense>
			</div>
		</header>
	);
}

export { Header };
