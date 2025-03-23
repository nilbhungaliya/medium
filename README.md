# Blog Website

A full-stack blog website built using **Hono** for the backend, **React** for the frontend, and **Zod** for shared validation logic. The project follows a monorepo structure with three main folders: `backend`, `frontend`, and `common`.

## Features

- **Backend:** Built with Hono and deployed using Cloudflare Workers
- **Frontend:** React with React Router and Vite
- **Validation:** Centralized Zod validation logic in the `common` package
- **Database:** Prisma ORM with Accelerate extension
- **Authentication:** Secure password hashing using Bcrypt
- **API Calls:** Handled with Axios

## Tech Stack

### Backend
- Hono (Cloudflare Workers framework)
- Prisma ORM
- Bcrypt for password hashing
- Wrangler for deployment

### Frontend
- React 18 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests

### Common (Shared Logic)
- Zod for validation

## Folder Structure

```
blog-website/
├── backend/           # Hono backend (Cloudflare Workers)
│   ├── prisma/       # Prisma schema
│   ├── src/          # Backend source code
│   ├── dist/         # Compiled output
│   ├── package.json  # Backend dependencies
│   ├── wrangler.toml # Cloudflare Workers config
├── frontend/         # React frontend
│   ├── src/          # React components and pages
│   ├── public/       # Static assets
│   ├── package.json  # Frontend dependencies
│   ├── vite.config.js # Vite configuration
├── common/           # Shared utilities and validation
│   ├── src/          # Zod validation schemas
│   ├── dist/         # Compiled output
│   ├── package.json  # Common dependencies
└── README.md         # Project documentation
```

## Installation

### 1. Clone the repository
```sh
git clone https://github.com/your-username/blog-website.git
cd blog-website
```

### 2. Install dependencies for all packages
```sh
cd backend && npm install
cd ../frontend && npm install
cd ../common && npm install
```

### 3. Set up the database
```sh
npx prisma migrate dev
```

### 4. Start the backend server
```sh
cd backend
npm run dev
```

### 5. Start the frontend server
```sh
cd frontend
npm run dev
```

### 6. Open in browser
Navigate to `http://localhost:5173/`

## Deployment

### Backend (Cloudflare Workers)
```sh
npm run deploy
```

### Frontend (Vercel)
```sh
vercel
```

## API Routes

- **`POST /auth/register`** - Register a new user
- **`POST /auth/login`** - User authentication
- **`GET /posts`** - Fetch all blog posts
- **`POST /posts`** - Create a new blog post


