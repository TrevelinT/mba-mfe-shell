# Shell (host) MFE

Host application: layout, breadcrumb, header, footer. Loads federated remotes at runtime.

## Federation remotes

Remote URLs are resolved in [`vite.config.remotes.ts`](vite.config.remotes.ts) from environment (see [`.env.example`](.env.example)).

| Remote | Local (`dev`, `build:local`) | Production build (`npm run build`) |
|--------|------------------------------|-------------------------------------|
| `product/Product` | `http://localhost:5001/assets/remoteEntry.js` | `https://trevelint.github.io/mba-mfe-product/assets/remoteEntry.js` |
| `buyBox/BuyBox` | `http://localhost:5002/assets/remoteEntry.js` | `https://trevelint.github.io/mba-mfe-buy-box/assets/remoteEntry.js` |
| `cart/Cart` | `http://localhost:5003/assets/remoteEntry.js` | `https://trevelint.github.io/mba-mfe-cart/assets/remoteEntry.js` |

Type declarations: `src/remotes.d.ts`.

Override strategy with `VITE_MFE_REMOTES=local|pages`, or set full URLs via `VITE_REMOTE_*_URL`. Copy [`.env.example`](.env.example) to `.env.development` or `.env.production` (gitignored) if you need local overrides; otherwise mode defaults apply (`dev` → local, `build` → pages).

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Dev server (port 5000); localhost remotes; requires remotes on preview |
| `npm run build` | Type-check + production build (GitHub Pages remotes) |
| `npm run build:local` | Production build with localhost remotes (for local preview workflow) |
| `npm run preview` | Serve `dist/` (port 5000) |
| `npm run test` | Shell unit tests (Vitest; federation remotes stubbed) |
| `npm run test:e2e` | Playwright integration tests (live GitHub Pages remotes) |
| `npm run format-and-lint` | Biome check |
| `npm run report-build-artifacts` | CI build size summary |

## Local development

See `../README.md` for the full workflow (build + preview all remotes first).

Use `npm run dev` (localhost remotes) or `npm run build:local && npm run preview` to test a production bundle against local previews.

**Unit tests** (`npm test`) stub federation imports via `src/test/remotes/` (shell-only assertions).

**Integration tests** (`npm run test:e2e`) use a production build with GitHub Pages remotes and real deployed `remoteEntry.js` bundles. Run `npm run build && npm run preview` before E2E locally (or use the CI artifact flow).

## CI

- **Build job:** lint, build with GitHub Pages remotes (`VITE_MFE_REMOTES=pages`), artifact upload (`shell-dist`), type-check, unit tests (stubbed remotes).
- **E2E job:** downloads `shell-dist`, verifies deployed `remoteEntry.js` URLs on GitHub Pages, runs Playwright against `vite preview` (cross-MFE integration).

E2E requires remotes to be **deployed** on GitHub Pages.
