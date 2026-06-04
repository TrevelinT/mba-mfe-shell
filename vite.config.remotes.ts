export type MfeRemotesStrategy = "local" | "pages";

export type MfeRemotesEnv = {
	VITE_MFE_REMOTES?: string;
	VITE_PAGES_ORIGIN?: string;
	VITE_REMOTE_PRODUCT_URL?: string;
	VITE_REMOTE_BUY_BOX_URL?: string;
	VITE_REMOTE_CART_URL?: string;
};

const DEFAULT_PAGES_ORIGIN = "https://trevelint.github.io";

const PAGES_BASES = {
	product: "/mba-mfe-product/",
	buyBox: "/mba-mfe-buy-box/",
	cart: "/mba-mfe-cart/",
} as const;

const LOCAL_PORTS = {
	product: 5001,
	buyBox: 5002,
	cart: 5003,
} as const;

function normalizeOrigin(origin: string): string {
	return origin.replace(/\/$/, "");
}

function pagesRemoteEntry(origin: string, base: string): string {
	const normalizedBase = base.startsWith("/") ? base : `/${base}`;
	const withTrailingSlash = normalizedBase.endsWith("/")
		? normalizedBase
		: `${normalizedBase}/`;
	return `${normalizeOrigin(origin)}${withTrailingSlash}assets/remoteEntry.js`;
}

function localRemoteEntry(port: number): string {
	return `http://localhost:${port}/assets/remoteEntry.js`;
}

function resolveStrategy(
	mode: string,
	env: MfeRemotesEnv,
): MfeRemotesStrategy {
	const explicit = env.VITE_MFE_REMOTES;
	if (explicit === "local" || explicit === "pages") {
		return explicit;
	}
	return mode === "development" ? "local" : "pages";
}

function resolveRemoteUrl(
	override: string | undefined,
	strategy: MfeRemotesStrategy,
	pagesOrigin: string,
	pagesBase: string,
	localPort: number,
): string {
	if (override) {
		return override;
	}
	return strategy === "local"
		? localRemoteEntry(localPort)
		: pagesRemoteEntry(pagesOrigin, pagesBase);
}

export function resolveFederationRemotes(
	mode: string,
	env: MfeRemotesEnv,
): Record<string, string> {
	const strategy = resolveStrategy(mode, env);
	const pagesOrigin = env.VITE_PAGES_ORIGIN ?? DEFAULT_PAGES_ORIGIN;

	return {
		product: resolveRemoteUrl(
			env.VITE_REMOTE_PRODUCT_URL,
			strategy,
			pagesOrigin,
			PAGES_BASES.product,
			LOCAL_PORTS.product,
		),
		buyBox: resolveRemoteUrl(
			env.VITE_REMOTE_BUY_BOX_URL,
			strategy,
			pagesOrigin,
			PAGES_BASES.buyBox,
			LOCAL_PORTS.buyBox,
		),
		cart: resolveRemoteUrl(
			env.VITE_REMOTE_CART_URL,
			strategy,
			pagesOrigin,
			PAGES_BASES.cart,
			LOCAL_PORTS.cart,
		),
	};
}
