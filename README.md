# Shell (host) MFE

Host application: layout, breadcrumb, header, footer. Loads federated remotes at runtime. Vite `base` is `/mba-mfe-shell/` (GitHub Pages).

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
| `npm run dev` | Dev server (port 5000); localhost remotes; requires remotes on preview. Open [http://localhost:5000/mba-mfe-shell/](http://localhost:5000/mba-mfe-shell/) |
| `npm run build` | Type-check + production build (GitHub Pages remotes) |
| `npm run build:local` | Production build with localhost remotes (for local preview workflow) |
| `npm run preview` | Serve `dist/` (port 5000) at `/mba-mfe-shell/` |
| `npm run test` | Shell unit tests (Vitest; federation remotes stubbed) |
| `npm run test:e2e` | Playwright integration tests (live GitHub Pages remotes) |
| `npm run format-and-lint` | Biome check |
| `npm run report-build-artifacts` | CI build size summary |
| `npm run changeset` | Add a changeset (semver bump + notes) |
| `npm run version-packages` | Apply pending changesets (used by Release CI) |
| `npm run release` | Create GitHub tag/release `vX.Y.Z` (used by Release CI) |

## Local development

See `../README.md` for the full workflow (build + preview all remotes first).

Use `npm run dev` (localhost remotes) or `npm run build:local && npm run preview` to test a production bundle against local previews.

**Unit tests** (`npm test`) stub federation imports via `src/test/remotes/` (shell-only assertions).

**Integration tests** (`npm run test:e2e`) use a production build with GitHub Pages remotes and real deployed `remoteEntry.js` bundles. Run `npm run build && npm run preview` before E2E locally (or use the CI artifact flow).

## CI

[GitHub Actions](https://docs.github.com/en/actions) ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) runs on push to `main`, on pull request open/sync, and on demand via **Run workflow** (`workflow_dispatch`).

| Job | What runs |
|-----|-----------|
| **Build and Quality** | lint → build (`VITE_MFE_REMOTES=pages`) → artifact report → upload `shell-dist` → type-check → test-coverage |
| **E2E Tests** | `needs: build` → download `shell-dist` → verify live `remoteEntry.js` → Playwright |
| **Lighthouse CI** | `needs: build` → download `shell-dist` → preview at `/mba-mfe-shell/` |

E2E requires remotes to be **deployed** on GitHub Pages.

## Release

Versions are managed with [Changesets](https://github.com/changesets/changesets). Include a changeset in any PR that should bump the version:

```sh
npm run changeset
```

### What happens on `main`

1. Merge the feature PR (with changesets) to `main`.
2. **CI** runs. Only if it succeeds does **Release** ([`.github/workflows/release.yml`](.github/workflows/release.yml)) start.
3. Release opens or updates a **Version Packages** PR.
4. Review and merge that PR when you want to cut a version.
5. CI runs again. On success, Release runs `npm run release`: if the version is not `0.0.0` and `v{version}` does not exist yet, it creates that GitHub tag and Release from `CHANGELOG.md`.
6. **CD** ([`.github/workflows/cd.yml`](.github/workflows/cd.yml)) starts after Release succeeds. If a `v*` tag points at that commit, it reuses the CI `shell-dist` artifact and deploys to GitHub Pages.

Live site: [https://trevelint.github.io/mba-mfe-shell/](https://trevelint.github.io/mba-mfe-shell/).

**One-time repo setting:** Settings → Pages → Build and deployment → Source = **GitHub Actions** (not a branch).
