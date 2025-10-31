
## Project: TypeScript Express App + Frontend plan (Fullstack Open Part 9)

This file documents the current backend implementation and a concrete plan to add a TypeScript React frontend and the "Patientor / Grande Finale" features from Fullstack Open Part 9.

Repository quick summary:
- Backend: TypeScript + Express in `src/` (already present).
- Data: typed seed data in `data/entries.ts`.
- Build: `tsconfig.json` and ESLint are configured.

---

## Feasibility decision

Can the "React with types" frontend and the "Grande Finale: Patientor" features be implemented inside this repository?

- Yes — it's feasible and recommended to implement the frontend inside this repository by adding a `frontend/` subfolder (Vite + TS React) and extending the backend in `src/`.

Rationale:
- The backend is a small TypeScript Express app and is already structured to add more routes and typed data. The Patientor finale requires additional routes/types (patients, diagnoses, entries) which naturally extend this codebase.
- A Vite-based React TypeScript frontend can live in `frontend/` and call the backend API (enable CORS during development). Keeping both in the same repo simplifies local dev, testing, and sharing.

Alternative:
- If you prefer separate repositories for frontend and backend (different CI/CD), create a new repo for the frontend with `npm create vite@latest patientor-frontend -- --template react-ts` and proceed. I recommend starting inside this repo for speed.

---

## Concrete plan (implementation inside this repo)

Goal: Add `frontend/` (Vite + TS React) and extend the backend to support the Patientor exercises (patients, diagnoses, full entries, and POST endpoints). Keep everything typed and add request validation.

Step 1 — Backend prep (first sprint)
- Enable CORS for dev: install `cors` and add `app.use(cors())` in `src/index.ts` (or enable conditionally by NODE_ENV).
- Add typed seed data files to `data/`:
  - `data/patients.ts` (Patient[] seed)
  - `data/diagnoses.ts` (Diagnosis[] seed)
- Extend `src/types.ts` with Patient, Entry, Diagnosis, Gender, HealthCheckRating, etc. (use examples from the Fullstack Open pages).
- Add services and routes:
  - `src/services/patientService.ts` (getAll, findById, addPatient, addEntry)
  - `src/routes/patients.ts` (GET `/api/patients`, GET `/api/patients/:id`, POST `/api/patients`, POST `/api/patients/:id/entries`)
  - `src/routes/diagnoses.ts` (GET `/api/diagnoses`)
- Validation & parsing:
  - Implement request parsing/validation for POST endpoints. Use either manual parsers (type guards) or Zod. If Zod is preferred: `npm install zod`.
- Wire the new routers in `src/index.ts`.

Step 2 — Frontend scaffold (`frontend/`)
- Create a Vite TypeScript React app in `frontend/`:
  - `npm create vite@latest frontend -- --template react-ts`
- Install frontend deps: `axios react-router-dom@6 @mui/material @mui/icons-material` (Material UI optional).
- Add typed frontend types in `frontend/src/types.ts` matching backend types used by the UI (Patient, Entry, Diagnosis).
- Implement services (`frontend/src/services`) that call `/api/*` endpoints using `axios` with generics for typing.
- Implement components/pages: `PatientListPage`, `AddPatientModal`, `PatientPage`, entry rendering components, routing using `react-router-dom`.

Step 3 — Dev scripts & running both apps
- Add helpful scripts in root `package.json` (optional):
  - `"dev:server": "ts-node-dev src/index.ts"`
  - `"dev:client": "npm --prefix frontend run dev"`
  - `"dev": "concurrently \"npm run dev:server\" \"npm run dev:client\""` (requires `concurrently`)
- Or run separately in two terminals:
  - Terminal A: `npx ts-node-dev src/index.ts`
  - Terminal B: `cd frontend && npm run dev`

Step 4 — Production build & static serving (optional)
- Build backend: `npm run tsc` and start `node build/index.js`.
- Build frontend: `cd frontend && npm run build`.
- Optionally serve `frontend/dist` via Express (add `app.use(express.static('frontend/dist'))` and a catch-all to `index.html`). Adjust CSP headers accordingly.

Step 5 — Tests, linting, final polish
- Maintain ESLint rules for backend. Add frontend linting if desired.
- Add basic unit/integration tests later.

---

## Minimal file list to add (first sprint)
- `frontend/` (Vite React + TypeScript scaffold)
- `data/patients.ts`, `data/diagnoses.ts`
- `src/routes/patients.ts`, `src/routes/diagnoses.ts`
- `src/services/patientService.ts` (backend)
- Extend `src/types.ts` with Patient and Entry types
- Add `cors` usage to `src/index.ts`

## Quick commands (copy/paste)
From project root:

```bash
# 1) scaffold frontend
npm create vite@latest frontend -- --template react-ts

# 2) install helper packages if you want to run both sides together
npm install --save-dev concurrently

# 3) install backend CORS & optional validator libs
npm install cors
npm install zod   # optional, if using Zod

# 4) run backend in one terminal, frontend in another

# Project Compliance Checklist

- [x] All source code is in `src/`.
- [x] Routers are in `src/routes/`.
- [x] Services are in `src/services/`.

## Recommendation & next action
- Recommendation: implement inside this repo, create `frontend/` and keep backend in `src/`.
- Next action I can take for you now (pick one):
  1) Scaffold the Vite frontend into `frontend/` (I can run the create command and install deps).
  2) Add CORS and skeleton routes/types for patients/diagnoses in the backend and a minimal `data/` seed for patients and diagnoses.
  3) Create the `src/services` and `src/routes` files for Patientor backend and wire them up, including request validation skeletons.

Tell me which next action to execute and I'll do it (I can implement the backend skeleton first, or scaffold the frontend — or both).

## Zod installation workaround (optional)

During development you may prefer Zod for schema validation. In this repo Zod previously caused an `ETARGET` install error in some environments. To keep the project runnable while still providing Zod schemas, I added an optional file `src/optional/zod-utils.ts` with Zod schemas and parsers.

If you want to enable Zod validation locally, do either of the following depending on your environment:

1) Preferred: install Zod from the official registry

```bash
npm set registry https://registry.npmjs.org/
npm install zod
```

2) If your environment blocks access to that registry or the exact version, install an available version (check `npm view zod versions`), for example:

```bash
npm install zod@4.20.0
```

3) After installing, import the Zod parsers by replacing the manual parsers in `src/utils.ts` with the optional Zod implementations:

```ts
// in src/utils.ts (replace or delegate)
import { parseNewPatientWithZod, parseNewEntryWithZod } from './optional/zod-utils';

export const parseNewPatient = parseNewPatientWithZod;
export const parseNewEntry = parseNewEntryWithZod;
```

This keeps your local dev experience using Zod while the repository stays runnable for others who cannot install Zod in their environment.


---

## Updated compliance notes
- Frontend: not present yet — plan described above.
- Backend: ready to be extended for Patientor requirements; add CORS for dev.

---

Completion summary will be provided after you pick the next action.
- [x] Types are in `src/types.ts`.
- [x] Data is in `data/entries.ts` (typed, not JSON).
- [x] TypeScript config matches recommended options.
- [x] ESLint config matches recommended options.
- [x] Scripts for dev, build, lint, and start are present.
- [x] Type guards or schema validation are used for request bodies.
- [x] Service layer separates business logic from routers.
- [x] Routers use typed request/response parameters.

## Notes
- Your project structure and code closely follow the Fullstack Open Part 9 implementation.
- You use enums for Weather and Visibility, type guards, and a service layer.
- You have the recommended scripts and ESLint setup.
- You can further improve request validation by using Zod or similar schema validation libraries.
