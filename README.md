# SupplySight

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd nuel
npm install
```

### Development

This application requires running both the GraphQL server and the React application:

#### 1. Start the GraphQL Server

In your first terminal:

```bash
npm run graphql
```

The GraphQL server will start at `http://localhost:4000` with the playground available for API exploration.

#### 2. Start the React Application

In a second terminal:

```bash
npm run dev
```

The React application will be available at `http://localhost:5173` and will automatically redirect to the dashboard.

### Accessing the Application

- **Dashboard**: `http://localhost:5173` (main application)
- **GraphQL Playground**: `http://localhost:4000/graphql` (API exploration)

The dashboard includes:
- KPI cards showing total stock, demand, and fill rate
- Interactive stock vs demand chart
- Product table with real-time filtering and pagination
- Stock transfer and demand update functionality

## Building for Production

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

**Note**: In production, you'll need to run both the GraphQL server (`npm run graphql`) and the React application server simultaneously.

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Tech Stack

- **Frontend**: React 19, React Router v7, TypeScript
- **Styling**: Tailwind CSS  
- **State Management**: React Context API
- **Data Fetching**: Apollo Client, GraphQL
- **Backend**: Apollo Server Express (Mock GraphQL API)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite

## Project Structure

```
app/
├── components/          # Reusable UI components
├── context/            # React Context for state management  
├── graphql/            # GraphQL schema, resolvers, and data
├── lib/                # Utility functions and Apollo Client setup
├── routes/             # React Router route components
└── types/              # TypeScript type definitions
```

## Development Notes

See [NOTES.md](./NOTES.md) for detailed information about architecture decisions, code quality considerations, and future enhancements.

