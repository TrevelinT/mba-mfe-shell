# Shell (host) MFE

Host application: layout, breadcrumb, header, footer. Loads federated remotes at runtime.

## Federation remotes

| Remote | URL (local) |
|--------|-------------|
| `product/Product` | `http://localhost:5001/assets/remoteEntry.js` |
| `buyBox/BuyBox` | `http://localhost:5002/assets/remoteEntry.js` |
| `cart/Cart` | `http://localhost:5003/assets/remoteEntry.js` |

Type declarations: `src/remotes.d.ts`.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Dev server (port 5000); requires remotes on preview |
| `npm run build` | Type-check + production build |
| `npm run preview` | Serve `dist/` (port 5000) |
| `npm run test` | Shell unit tests (Vitest) |
| `npm run test:e2e` | Playwright E2E |
| `npm run format-and-lint` | Biome check |
| `npm run report-build-artifacts` | CI build size summary |

## Local development

See `../README.md` for the full workflow (build + preview all remotes first).

Unit tests resolve sibling remotes under `../product`, `../buy-box`, and `../cart` when present.

## CI

- **Build job:** lint, build, artifact upload (`shell-dist`), type-check, tests.
- **E2E job:** checks out remote repos (GitHub variables `MFE_*_REPO`), builds and previews them, downloads `shell-dist`, runs Playwright.

Set repository variables on this repo: `MFE_PRODUCT_REPO`, `MFE_BUY_BOX_REPO`, `MFE_CART_REPO`.
