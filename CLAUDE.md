# ContractOS

Contract lifecycle management platform with template library, clause builder, e-signature flow, expiration tracking, and renewal alerts.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite 8 |
| Styling | CSS custom properties |
| Deploy | Cloudflare Pages via GitHub Actions |
| Testing | Vitest + React Testing Library |
| Tooling | pnpm (package manager), mise (runtime versions) |

## Dev Commands

```bash
pnpm dev           # Start dev server
pnpm build         # TypeScript check + Vite production build
pnpm lint          # ESLint
pnpm preview       # Preview production build
```

## Conventions

- Use **pnpm** as package manager (never npm or yarn)
- Use **mise** for runtime versions (see `.mise.toml`)
- CSS custom properties for theming
- React.lazy + Suspense for route-level code splitting
- Tests live next to source files (`Component.test.tsx`)

## Project Structure

```
src/
  pages/           Route-level components
  components/
    ui/            Reusable UI components
    sections/      Page sections
  hooks/           Custom React hooks
  lib/             Utilities
docs/
  vision.md        North-star vision and design principles
  prd.md           Product requirements document
.claude/
  agents/          Agent definitions
```

## Documentation Hierarchy

```
CLAUDE.md              (this file -- root authority)
  docs/vision.md       (north-star vision and design principles)
  docs/prd.md          (product requirements)
  .claude/agents/      (agent definitions)
```

## Agent Team

| Agent | Role | Scope | Writes Code |
|-------|------|-------|-------------|
| `frontend-dev` | React, CSS, components, pages | `src/` | Yes |
| `qa` | Testing, accessibility, performance | Tests + read-only | Yes (tests) |
