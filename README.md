# Robotic Arm Dashboard

A full-stack monorepo for monitoring and managing an automated waste segregation robotic arm. This system provides a web-based administration dashboard and an API for hardware telemetry, computer vision processing, and motor control synchronization.

## 🏗 Project Structure

This project is structured as a monorepo containing two main packages managed by Bun Workspaces:

- **`/packages/api`**: The backend service powered by Cloudflare Workers (`wrangler`). It handles hardware controllers, routing, database interactions, and telemetry logs.
- **`/packages/client`**: The frontend administration dashboard built with React and Vite.

### Directory Tree Overview

```text
ROBOTIC-ARM-DASHBOARD/
├── packages/
│   ├── api/                  # Backend API (Cloudflare Workers)
│   │   ├── src/
│   │   │   ├── controllers/  # Hardware-specific controller logic (e.g., waste.ts)
│   │   │   ├── db/           # Database migrations, config, and schemas
│   │   │   ├── factory/      # Service factory patterns
│   │   │   ├── lib/          # Shared backend utilities
│   │   │   ├── model/        # Data models
│   │   │   └── types/        # TypeScript type definitions
│   │   ├── .dev.vars         # Local environment variables (Git ignored)
│   │   └── wrangler.toml     # Cloudflare Worker configuration
│   │
│   └── client/               # Frontend Dashboard (React + Vite)
│       ├── public/           # Static assets
│       └── src/
│           ├── assets/       # Global styles, images, and visual assets
│           ├── components/   # Reusable UI primitives (Buttons, Inputs)
│           ├── lib/          # Frontend utility functions (e.g., cx, cn)
│           ├── Pages/        # Main application layout views
│           ├── ProtectedRoute/ # Auth wrapper components
│           ├── App.tsx       # Main React router application wrapper
│           └── main.tsx      # DOM injection entry point
```

## Getting Started

### Prerequisites

Make sure you have <ins>Bun</ins> installed globally on your system.

### Installation

Clone the repository and navigate into the project directory:

### Bash

```
cd ROBOTIC-ARM-DASHBOARD
```

Install dependencies for all workspace modules in one command:

```
bun install
```

Configure local environment details inside `packages/api/.dev.vars` (e.g., local database setup, API tokens, local host server connection details).

### Running Locally

To start the API service and the React client dashboard concurrently, run the workspace script from the root directory:

```
bun run dev
```

The API layer will fire up on its local Wrangler binding (usually http://localhost:8787).

The Client dashboard application will launch via Vite (usually http://localhost:5173).

### 🛠 Tech Stack

> Frontend: React, Vite, TypeScript, Tailwind CSS

> Backend: Cloudflare Workers, Wrangler, TypeScript

> Runtime & Package Manager: Bun
