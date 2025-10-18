# Product Management App (Next.js)

A Next.js 15 app for managing products with authentication, CRUD, search, pagination, and category filtering. Built with Redux Toolkit, RTK Query, Tailwind CSS, and react-hot-toast.

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Redux Toolkit + RTK Query
- Tailwind CSS
- react-hot-toast

## Prerequisites
- Node.js 18+
- npm (or yarn/pnpm/bun)

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_API_BASE=http://localhost:8000
   AUTH_EMAIL=demo@example.com
   ```
   - Point to your backend API base URL.
   - `AUTH_EMAIL` is optional and pre-fills the login form email input.
   - Authorization headers are automatically set from the Redux auth token.

3. Development server:
   ```bash
   npm run dev
   # to choose a port
   npm run dev -- -p 3002
   ```
   - App defaults to `http://localhost:3000`; examples above show using `3002`.

## Features
- Authentication: Login page with client-side validation and Redux auth state.
- Products: List, view, create, edit, delete.
- Search: Debounced search across product names/descriptions.
- Pagination: Offset/limit controls with reset behavior on changes.
- Category Filter: Filter products by category on the list page.
- Error Handling: Route-level error boundary under `/products`.
- Loading UX: Skeleton loaders for list and details.
- Performance: `next/image` used for images.

## Notes
- External images allowed via Next config:
  - `i.imgur.com`, `laravelpoint.com`
- Lint and type checks:
  ```bash
  npm run lint
  npm run typecheck
  ```

## Deploy
Refer to the Next.js deployment docs for hosting on Vercel or other platforms.
