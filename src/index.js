const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const models = require("../models");
const { PubSub } = require("apollo-server");
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models, pubsub },
});

server.listen().then(({ url }) => console.log(`🚀 Listening on port: ${url}`));
