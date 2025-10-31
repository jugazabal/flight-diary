# Flight Diary (Patientor-style)

This repository contains a TypeScript Express backend and a Vite + React TypeScript frontend.

Quick commands

# Install dependencies (root and client)
# from project root
npm install
npm --prefix frontend install

# Run backend in dev
npm run dev

# Run frontend in dev (in another terminal)
npm --prefix frontend run dev

# Run both together (requires concurrently)
npm run dev:all

# Build frontend and server for production
npm run build:client
npm run tsc

# Start production server (after building server)
npm run start

Notes
- The backend serves static files from `frontend/dist` when present. The SPA fallback is enabled so client-side routes work on refresh.
- Validation uses built-in parsers by default; an optional Zod-based module is available at `src/optional/zod-utils.ts` and can be enabled by installing Zod and delegating parse functions in `src/utils.ts`.

- Lint & type-check (CI):

```bash
npm run lint:ci
```

- ESLint uses the flat config file `eslint.config.cjs`. The root `lint` script uses the flat config by default.
