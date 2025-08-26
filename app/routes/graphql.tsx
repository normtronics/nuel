import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { createGraphQLServer } from '../graphql/server.js';

let serverPromise: Promise<any> | null = null;

async function getGraphQLServer() {
  if (!serverPromise) {
    serverPromise = createGraphQLServer();
  }
  return serverPromise;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { app } = await getGraphQLServer();
  
  return new Response(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const { app } = await getGraphQLServer();
  
  return new Response(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export default function GraphQLRoute() {
  return (
    <div>
      <h1>GraphQL Endpoint</h1>
      <p>GraphQL server is running at <a href="/graphql">/graphql</a></p>
      <p>Visit <a href="/graphql">GraphQL Playground</a> to test queries</p>
    </div>
  );
}