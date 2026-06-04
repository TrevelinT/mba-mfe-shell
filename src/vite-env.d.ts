/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_MFE_REMOTES?: "local" | "pages";
	readonly VITE_PAGES_ORIGIN?: string;
	readonly VITE_REMOTE_PRODUCT_URL?: string;
	readonly VITE_REMOTE_BUY_BOX_URL?: string;
	readonly VITE_REMOTE_CART_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
