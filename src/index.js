const { ApolloServer, AuthenticationError } = require("apollo-server");
const express = require("express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const models = require("../models");
const jwt = require("jsonwebtoken");
const corsMiddleWare = require("cors");
const { PORT } = require("../config/constants");
const SubscriptionServer = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");
const { checkForResolveTypeResolver, PubSub } = require("apollo-server");
// const websocketServer = createServer();
const pubsub = new PubSub();

const getPlayer = (token) => {
  try {
    if (token) {
      return jwt.verify(token, "my-secret-from-env-file-in-prod");
    }
    return null;
  } catch (error) {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models, pubsub },
});

// let corsOptions = {
//   origin: "http://localhost:3000/",
//   credentials: true,
// };

// server.use(corsMiddleWare(corsOptions));
server.listen().then(({ url }) => console.log(`🚀 Listening on port: ${url}`));
