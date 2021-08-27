require('dotenv').config();

const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const app = express();

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

db.connect(DB_HOST);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { models };
  }
});

server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(
    `GraphQL Server listening at http://localhost:${port}${server.graphqlPath}`
  )
);
