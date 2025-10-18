1) Quick analysis & decisions (summary)

Primary goal: Full CRUD product app in Next.js (App Router) + Redux Toolkit + Tailwind; polished UI/UX and deployed publicly (Vercel URL provided).

Auth flow: POST /auth with job-app email (set as env var) → store JWT in Redux, attach Authorization: Bearer <token> to all product/category requests.

API shape: Products endpoints support pagination (offset, limit), search (/products/search?searchedText=), single product by slug, create (POST), update (PUT /:id), delete (DELETE /:id). Categories endpoint for categories list + search.

UX focus: Responsive layout, clear states (loading, errors), inline validation, confirmation dialogs, smooth micro-interactions (toasts, spinners, button disabled states), accessible forms.

Caching strategy: Client-side cache with Redux Toolkit Query (RTK Query) preferred for built-in caching + invalidation (supports optimistic updates and automated cache invalidation after create/edit/delete).

Pagination & search: Server-side pagination; search should be realtime with debounce (300ms). When searching, reset pagination to page 1. Support filtering by category (bonus).

Deployment: Vercel recommended (project already live). CI: GitHub Actions to run lint, typecheck, tests, then auto-deploy on push to main (optional).

Env variables: NEXT_PUBLIC_API_BASE=https://api.bitechx.com and AUTH_EMAIL=<email-used-in-application> (example: madhnagar@gmail.com).

# Project Context — Product Management App (Next.js App Router)

## Project summary
Build a responsive Product Management web app with Next.js (App Router), React, Redux Toolkit (RTK + RTK Query), and Tailwind CSS. The app allows browsing, creating, editing, viewing, searching, filtering, paginating, and deleting products using the exposed API at https://api.bitechx.com. Must be visually polished, accessible, have strong client validation and error handling, and deployed publicly (Vercel). Provide a public GitHub repository and the live URL.

## Color palette (use for primary UI)
- Rich-black: #0D1821
- Anti-flash white: #EFF1F3
- Hooker's green: #4E6E5D
- Lion: #AD8A64
- Chestnut: #A44A3F

## Tech stack & libs
- Framework: Next.js (App Router)
- UI: React
- State & Data fetching: Redux Toolkit + RTK Query
- Styling: Tailwind CSS
- Form validation: react-hook-form + zod (or yup)
- Notifications: a lightweight toast library (e.g., react-hot-toast) or custom
- Icons: lucide-react (or heroicons)
- Testing: Jest + React Testing Library
- Linting: ESLint + Prettier + TypeScript (if using TS) - **use TypeScript** for better code quality
- Deployment: Vercel (primary), GitHub for repo

## Environment variables (.env.local)
- NEXT_PUBLIC_API_BASE=https://api.bitechx.com
- AUTH_EMAIL=<use the email used in your job application; example: madhnagar@gmail.com>
- NEXT_PUBLIC_SITE_NAME="Product Manager"
- (Vercel secrets: set same keys in Vercel dashboard)

## API integration (core endpoints)
Base: `${NEXT_PUBLIC_API_BASE}`

- POST `/auth`  
  Body: `{ "email": AUTH_EMAIL }`  
  Response: `{ "token": "<jwt>" }`  
  -> store token in Redux (persist small TTL or in memory) and attach as `Authorization: Bearer <token>` to every request.

- GET `/products?offset=<n>&limit=<m>&categoryId=<id>`  
- GET `/products` (all or with pagination)
- GET `/products/:slug`
- GET `/products/search?searchedText=<query>`
- POST `/products` (create)
  Body: `{ categoryId, description, images: [string], name, price }`
- PUT `/products/:id` (update)
- DELETE `/products/:id` (simulate delete; API returns 200 with id)
- GET `/categories` and `/categories/search?searchedText=<query>`

## Global app behavior & UX rules
- All requests must include Authorization header with JWT.
- Show global loading indicator or per-component skeletons while fetching.
- Show inline field validation on blur and real-time for key fields (name, price).
- Price must be numeric > 0.
- Images is array of strings (URLs); validate URL format.
- On Create/Edit success: show success toast, update cache (RTK Query invalidation), and redirect to details or products list.
- On Delete: show confirmation modal; on confirm, show loading state on modal and optimistic UI removal followed by RTK cache invalidation.
- Search: debounce 300ms; searching resets pagination to page 1.
- Pagination UI: show current page, total items (if available), prev/next and page size control (limit), accessible controls.
- Accessibility: use semantic HTML, correct labels, role attributes for modal, focus trap on modals, keyboard navigation.

## Data & caching strategy
Use RTK Query to:
- fetch products (with offset/limit/categoryId),
- fetch single product by slug,
- search products,
- get categories.
For mutations (create, update, delete): use `invalidatesTags` to refresh product list or update individual product caches. Use optimistic update on delete for instant UX (rollback on failure).

## Folder structure (recommended)

src/
│
├── app/                            # Next.js App Router directory
│   ├── (routes)/                   # Optional: group routes (auth, dashboard, etc.)
│   │   ├── (public)/               # Public routes (e.g., home, about)
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── ...
│   │   └── (protected)/            # Protected routes (dashboard, profile, etc.)
│   │       ├── dashboard/
│   │       │   ├── page.tsx
│   │       │   ├── loading.tsx
│   │       │   └── error.tsx
│   │       └── profile/
│   │           ├── page.tsx
│   │           └── ...
│   │
│   ├── api/                        # Route handlers (server-side API routes)
│   │   ├── users/
│   │   │   └── route.ts
│   │   └── auth/
│   │       └── route.ts
│   │
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Root page (homepage)
│   ├── globals.css                 # Tailwind's global styles
│   └── error.tsx                   # Global error boundary
│
├── components/                     # Reusable UI components (buttons, modals, forms, etc.)
│   ├── ui/                         # Atomic or base components
│   ├── layout/                     # Header, Footer, Sidebar, etc.
│   ├── forms/                      # Input, Select, TextArea, etc.
│   └── shared/                     # Shared complex components
│
├── features/                       # Feature-specific modules (auth, user, dashboard, etc.)
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types.ts
│   │   └── index.ts
│   ├── dashboard/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   └── ...
│
├── hooks/                          # Global React hooks (useAuth, useTheme, etc.)
│
├── lib/                            # Utilities, API clients, constants, config, etc.
│   ├── api-client.ts
│   ├── constants.ts
│   ├── utils.ts
│   ├── validation.ts
│   ├── prisma/                     # (if using Prisma)
│   └── ...
│
├── providers/                      # Context providers (ThemeProvider, AuthProvider, etc.)
│   ├── ThemeProvider.tsx
│   ├── AuthProvider.tsx
│   └── ...
│
├── types/                          # Global TypeScript type definitions
│   ├── next-env.d.ts
│   ├── global.d.ts
│   └── ...
│
├── styles/                         # Tailwind or SCSS config files
│   ├── globals.css
│   ├── tailwind.css
│   └── animations.css
│
├── utils/                          # Helper functions (formatDate, classNames, etc.)
│   └── classNames.ts
│
├── middleware.ts                   # Next.js middleware (auth checks, redirects)
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
└── next.config.js




## Routes & pages mapping
- `/login` — Login page (email only). POST /auth → store token. Redirect to `/products`.
- `/logout` — Action to clear token & redirect to login.
- `/products` — List with search, category filter, pagination, create button.
- `/products/create` — Create product form.
- `/products/[slug]` — Product detail with Edit/Delete actions.
- `/products/[slug]/edit` — Edit form (prefilled).
- (Bonus) `/categories` — Category management or filter UI.

## Components (high level)
- `AuthForm` (email) — validation: required + email format.
- `Header` — brand, logout, small search (optional).
- `ProductCard` — image, name, price, short desc, actions (view, edit, delete).
- `ProductsTable` / `ProductGrid` — responsive list view.
- `ProductForm` — create/edit form (uses react-hook-form + zod)
  Fields: name (string, required), price (number, >0), description (string), images (array of URLs), categoryId (select)
- `ModalConfirm` — accessible confirm modal
- `Pagination` — accessible component
- `Toast` — global notifications
- `Skeleton` — loading placeholders

## Form validation rules (zod)
- name: string().min(2).max(150)
- price: number().positive()
- description: string().max(2000).optional()
- images: array(string().url()).min(1)
- categoryId: string().uuid() (or required id)

## UX micro-interactions
- Button states: idle, loading, success.
- Show inline errors under inputs with subtle slide/fade animations.
- Optimistic removal on delete + toast with Undo (optional).
- Soft confirmation after create (toast) and auto-redirect after 1.2s.
- Focus management: focus first input on create/edit; move focus into modal when opened.

## Accessibility checklist
- All form inputs have labels.
- Buttons have aria-label where necessary.
- Modal uses role="dialog", aria-modal="true", focus trap and ESC to close.
- Color contrast must meet WCAG AA (verify palette text vs backgrounds).
- Keyboard accessible list and controls.

## Testing & quality
- Unit tests: ProductForm validation, ProductsList pagination logic.
- Integration tests: create → list update; delete optimistic removal.
- Linting & TypeScript: strict mode; enforce consistent imports and formatting.
- Git commits: small steps, descriptive messages. PR template: feature/bug/unit-of-work.

## Deployment (Vercel)
1. Push repo to GitHub.
2. Connect repo to Vercel.
3. Add environment variables in Vercel dashboard:
   - NEXT_PUBLIC_API_BASE = https://api.bitechx.com
   - AUTH_EMAIL = <email-used-on-job-application (example: madhnagar@gmail.com)>
4. Auto-deploy from `main` branch. Configure preview deployments for PRs.
5. Add GitHub Action (optional) to run tests and lint on push.

## CI (recommended GitHub Actions)
- `lint` job: eslint
- `test` job: run unit/integration tests
- `build` job: `next build` to ensure production build passes

## Deliverables checklist (what will be evaluated)
- [ ] CRUD flows (create, read, update, delete)
- [ ] Search + pagination + category filter
- [ ] Inline validation + client-side rules
- [ ] Polished UI with color palette and responsive design
- [ ] RTK Query caching + invalidation
- [ ] Confirmations & loading states
- [ ] Deployed app + GitHub repo link
- [ ] Tests + lint config
- [ ] README with setup instructions & env vars
- [ ] Bonus: category filtering; optimistic updates; Undo on delete

---

# Step-by-step tasks for Trea AI IDE (scaffold + implementation instructions)

## Phase A — Scaffold & basics
1. Create Next.js app (App Router) with TypeScript:
   - `pnpm create next-app@latest --ts` (or use npm)
2. Install deps:
   - `pnpm add react-redux @reduxjs/toolkit @types/react-redux @reduxjs/toolkit-query react-hook-form zod @hookform/resolvers tailwindcss postcss autoprefixer react-hot-toast lucide-react axios`
   - Dev: `eslint prettier jest @testing-library/react @testing-library/jest-dom`
3. Init Tailwind:
   - `npx tailwindcss init -p`
   - Add Tailwind directives to `globals.css`.
   - Configure theme colors with the provided palette.

## Phase B — Auth and API layer
4. Add `lib/api.ts` wrapper using axios:
   - BaseURL from `NEXT_PUBLIC_API_BASE`
   - Request interceptor to attach `Authorization: Bearer ${token}` from Redux store.
5. Create `features/auth/authSlice.ts`:
   - state: `{ token: string | null, status, error }`
   - actions: login (async thunk calling POST /auth), logout.
6. Create login page (`/login/page.tsx`) with react-hook-form:
   - Input: email (default to AUTH_EMAIL from env for dev if provided).
   - On submit → dispatch login thunk → store token in redux and redirect `/products`.

## Phase C — RTK Query endpoints
7. Create `features/products/productsApi.ts` using RTK Query:
   - endpoints:
     - `getProducts({ offset, limit, categoryId })` → provides tag `Products` + `Product:${id}`
     - `searchProducts({ searchedText })`
     - `getProductBySlug(slug)`
     - `createProduct` (mutation) → invalidates `Products`
     - `updateProduct` (mutation) → invalidates `Product:${id}` and `Products`
     - `deleteProduct` (mutation) → invalidates `Products` (optimistic update)
   - Use `fetchBaseQuery` or custom baseQuery with axios.

## Phase D — Products pages & forms
8. `/products/page.tsx`:
   - UI: Search input (debounced), Category filter dropdown, Products grid/list, Pagination controls, "Create Product" button.
   - Use RTK Query `getProducts` with offset/limit/categoryId.
9. `components/ProductCard.tsx` with Actions: View, Edit, Delete.
10. `components/Pagination.tsx` controlling offset & limit (page size).
11. `product form` (`components/ProductForm.tsx`) used by create and edit:
    - Use `react-hook-form` + `zodResolver`.
    - Fields: name, price, description, images (repeatable URL inputs), category select.
    - Inline validation onBlur and on submit.
12. `/products/create/page.tsx`:
    - Render `ProductForm` with empty defaults.
    - On submit → call `createProduct` mutation → show success toast → invalidate cache → navigate to details.
13. `/products/[slug]/page.tsx`:
    - Fetch product by slug → show full info and actions (Edit, Delete).
14. `/products/[slug]/edit/page.tsx`:
    - Prefill `ProductForm` with product data → call `updateProduct(id)` mutation.

## Phase E — Delete flow
15. `ModalConfirm` component:
    - Accessible modal, focus trap, confirm/cancel buttons.
16. Delete action:
    - Show modal → on confirm call `deleteProduct(id)` mutation.
    - Use optimistic removal from list; show toast “Deleted — Undo” (undo flows optional).

## Phase F — Visual polish & responsiveness
17. Implement theme tokens with Tailwind config using color palette.
18. Add consistent spacing tokens, typographic scale and small utility classes.
19. Add skeleton loaders and error states (retry button).

## Phase G — Deployment & CI
20. Create README with setup and deployment instructions.
21. Push repo to GitHub and connect to Vercel.
22. Add GitHub Action: `lint`, `test`, `build`.

## Phase H — Tests & final checks
23. Write unit tests for:
    - ProductForm validation
    - Pagination logic
24. Run `pnpm build` to ensure production build passes.

---

# Example small code snippets (to paste into IDE)

## API wrapper — `src/lib/api.ts`
```ts
import axios from 'axios';
import { store } from '@/store';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth?.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
