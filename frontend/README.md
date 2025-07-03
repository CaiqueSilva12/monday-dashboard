# Monday Dashboard Frontend

This is the frontend for the Monday Dashboard application, built with Next.js, React, Ant Design, React Query, Tailwind CSS, and TypeScript.

---

## 1. Prerequisites
- Node.js (v18 recommended)
- npm or yarn
- The backend API running (see backend/README.md for setup)

---

## 2. Install Dependencies
```sh
cd frontend
npm install
# or
# yarn install
```

---

## 3. Configure Environment Variables
Create a `.env.local` file in the `frontend` directory:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```
- Set this to your backend API URL (use your ngrok URL if running OAuth locally with ngrok).
- Example for ngrok:
  ```
  NEXT_PUBLIC_BACKEND_URL=https://abcd1234.ngrok.io
  ```

---

## 4. Run the Frontend
```sh
npm run dev
# or
# yarn dev
```
- The app will be available at `http://localhost:3000` by default.

---

## 5. Project Structure
```
frontend/
  app/
    login/
      page.tsx        # Login page with Monday.com OAuth button
    dashboard/
      page.tsx        # Dashboard page (requires login)
    projects/
      page.tsx        # Projects list page (requires login)
      create/
        page.tsx      # Create project page
      [id]/
        page.tsx      # Project detail page
    layout.tsx        # Main layout (conditionally renders Navigation)
    globals.css       # Global styles
  components/
    Navigation.tsx    # Top navigation bar (hidden on login page)
  services/
    authService.ts    # Auth/login logic
    projectService.ts # Project API logic
  hooks/
    useProjects.ts    # React Query hooks for projects
  types/
    project.ts        # TypeScript types for projects
  public/             # Static assets
  ...
```

---

## 6. Authentication Flow
- The login page (`/login`) features a "Login with Monday.com" button styled to match Monday's brand.
- After login, the backend issues a JWT token and redirects to `/dashboard?token=...`.
- The dashboard page saves the token to localStorage and uses it for all API requests.
- If any API request returns 401, the user is redirected to `/login`.
- Logout removes the token and redirects to `/login`.

---

## 7. Notes
- Make sure your backend is running and accessible at the URL set in `NEXT_PUBLIC_BACKEND_URL`.
- If using ngrok for OAuth, update the env variable accordingly.
- The Navigation bar is hidden on the login page for a clean login experience.

---

## 8. Useful Commands
- Start dev server: `npm run dev`
- Build for production: `npm run build`
- Lint: `npm run lint`

---

## Security Note
- Never commit your `.env.local` file or secrets to version control.

## Features

- **Dashboard**: View project statistics and charts
- **Projects List**: View all projects with CRUD operations
- **Create Project**: Add new projects
- **Project Details**: View individual project information
- **Edit/Delete**: Manage existing projects

## Tech Stack

- **Next.js 14** with App Router
- **React Query** for data fetching and caching
- **Ant Design** for UI components
- **Tailwind CSS** for styling
- **TypeScript** for type safety
- **Recharts** for data visualization

## Getting Started

### Prerequisites

- Node.js 18+ 
- Your Laravel backend running on `http://localhost:8000`

## API Endpoints

The frontend expects the following Laravel API endpoints:

- `GET /api/projects` - List all projects
- `GET /api/projects/{id}` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project
- `GET /api/dashboard/stats` - Get dashboard statistics

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Development

The application uses:
- **React Query** for server state management
- **Ant Design** components for consistent UI
- **Tailwind CSS** for responsive styling
- **TypeScript** for type safety

All pages are client-side rendered with proper loading states and error handling.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
