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
  // context: ({ req, res }) => {
  //   const token = req.headers.authorization || "";
  //   const user = getUser(token);

  //   if (!user) throw new AuthenticationError("you must be logged in");
  //   return { user };

  // const player = getPlayer(token);

  // if (!player) throw new AuthenticationError("You must be logged in");
  // return { player };
  // },
});

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req }) => {
//     const tokenWithBearer = req.header.authorization || "";
//     const token = tokenWithBearer.split(" ")[1];
//     const player = getPlayer(token);
//     return {
//       player,
//       models,
//       pubsub,
//     };
//   },
// });

// var corsOptions = {
//   origin: "localhost:3000/",
//   credentials: true,
// };

// server.use(cors(corsOptions));

server.listen().then(({ url }) => console.log(`🚀 Listening on port: ${url}`));
