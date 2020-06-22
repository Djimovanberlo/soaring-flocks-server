const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const models = require("../models");
const corsMiddleWare = require("cors");
const { PORT } = require("../config/constants");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models },
});

server.listen().then(({ url }) => console.log(`🚀 Listening on port: ${url}`));
