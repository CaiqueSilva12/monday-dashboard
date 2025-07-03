# Monday Dashboard Frontend

A Next.js frontend application for managing projects with a Laravel backend.

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

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard page
│   ├── projects/          # Projects pages
│   │   ├── create/        # Create project page
│   │   └── [id]/          # Individual project page
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page (redirects to dashboard)
├── components/            # Reusable UI components
│   └── Navigation.tsx     # Main navigation component
├── hooks/                 # Custom React hooks
│   └── useProjects.ts     # Projects data hook
├── services/              # API service functions
│   └── projectService.ts  # Project API calls
├── types/                 # TypeScript type definitions
│   └── project.ts         # Project interface
└── utils/                 # Utility functions
```

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
