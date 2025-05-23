import { createServer } from 'node:http'
import { createYoga, createSchema, createPubSub } from 'graphql-yoga'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { Query } from './resolvers/Query.js'
import { db } from './db/db.js'
import { CV } from './resolvers/CV.js'
import { Mutation } from './resolvers/Mutation.js'
import { Subscription } from './resolvers/Subscription.js';
import { pubSub } from './pubSub.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const typeDefs = readFileSync(join(__dirname, '/schema/schema.graphql'), 'utf-8')

const resolvers = {
  Query,
  CV,
  Mutation,
  Subscription
};

const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
  context: { db, pubSub }
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log('🚀 Server ready at http://localhost:4000/graphql');
});
