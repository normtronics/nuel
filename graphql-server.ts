#!/usr/bin/env node
import { startStandaloneServer } from './app/graphql/server.js';

// Start the GraphQL server
startStandaloneServer().catch(console.error);