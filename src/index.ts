import { createServer } from 'node:http';
import { createYoga, createSchema } from 'graphql-yoga';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Query } from './resolvers/Query.js';
import { CV } from './resolvers/CV.js';
import { Mutation } from './resolvers/Mutation.js';
import { Subscription } from './resolvers/subscription.js';
import { createContext } from './context.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typeDefs = readFileSync(join(__dirname, '/schema/schema.graphql'), 'utf-8');

const resolvers = {
  Query,
  Mutation,
  Subscription,
  CV
};

const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
  context: createContext,
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log('🚀 Server ready at http://localhost:4000/graphql');
});