const { ApolloServer, AuthenticationError } = require("apollo-server");
const express = require("express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const models = require("../models");
const corsMiddleWare = require("cors");
const { PORT } = require("../config/constants");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models },
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

// var corsOptions = {
//   origin: "localhost:3000/",
//   credentials: true,
// };

// server.use(cors(corsOptions));

server.listen().then(({ url }) => console.log(`🚀 Listening on port: ${url}`));
