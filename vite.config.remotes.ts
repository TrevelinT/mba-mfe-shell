import type { ProxyOptions } from "vite";

export type MfeRemotesStrategy = "local" | "pages";

export type MfeRemotesEnv = {
	VITE_MFE_REMOTES?: string;
	VITE_PAGES_ORIGIN?: string;
	VITE_REMOTE_PRODUCT_URL?: string;
	VITE_REMOTE_BUY_BOX_URL?: string;
	VITE_REMOTE_CART_URL?: string;
};

export const DEFAULT_PAGES_ORIGIN = "https://trevelint.github.io";

export const PAGES_BASES = {
	product: "/mba-mfe-product/",
	buyBox: "/mba-mfe-buy-box/",
	cart: "/mba-mfe-cart/",
} as const;

export const LOCAL_PORTS = {
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

function resolveStrategy(mode: string, env: MfeRemotesEnv): MfeRemotesStrategy {
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

function resolveRemoteOrigin(
	override: string | undefined,
	strategy: MfeRemotesStrategy,
	pagesOrigin: string,
	localPort: number,
): string {
	if (override) {
		return new URL(override).origin;
	}
	return strategy === "local"
		? `http://localhost:${localPort}`
		: pagesOrigin;
}

function remoteProxyPath(base: string): string {
	const normalizedBase = base.startsWith("/") ? base : `/${base}`;
	return normalizedBase.endsWith("/")
		? normalizedBase.slice(0, -1)
		: normalizedBase;
}

export function resolveRemoteAssetProxy(
	mode: string,
	env: MfeRemotesEnv,
): Record<string, ProxyOptions> {
	const strategy = resolveStrategy(mode, env);
	const pagesOrigin = normalizeOrigin(
		env.VITE_PAGES_ORIGIN ?? DEFAULT_PAGES_ORIGIN,
	);

	const remotes = [
		{
			base: PAGES_BASES.product,
			port: LOCAL_PORTS.product,
			override: env.VITE_REMOTE_PRODUCT_URL,
		},
		{
			base: PAGES_BASES.buyBox,
			port: LOCAL_PORTS.buyBox,
			override: env.VITE_REMOTE_BUY_BOX_URL,
		},
		{
			base: PAGES_BASES.cart,
			port: LOCAL_PORTS.cart,
			override: env.VITE_REMOTE_CART_URL,
		},
	] as const;

	const proxy: Record<string, ProxyOptions> = {};

	for (const { base, port, override } of remotes) {
		const target = resolveRemoteOrigin(
			override,
			strategy,
			pagesOrigin,
			port,
		);

		proxy[remoteProxyPath(base)] = {
			target,
			changeOrigin: true,
			secure: !target.startsWith("http://localhost"),
		};
	}

	return proxy;
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
