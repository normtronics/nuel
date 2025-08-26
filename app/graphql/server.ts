import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';

export async function createGraphQLServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });

  await server.start();

  const app = express();
  server.applyMiddleware({ app, path: '/graphql' });

  return { app, server };
}

// Standalone server for development
export async function startStandaloneServer() {
  const { app } = await createGraphQLServer();
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
  });
}