const { ApolloServer } = require("apollo-server");
const { PubSub } = require("apollo-server");
const cron = require("node-cron");

const typeDefs = require("./src/schema");
const resolvers = require("./src/resolvers");
const models = require("./models");
// const bigFunction = require("./src/bigFunction");
const pubsub = new PubSub();

cron.schedule("* * * * *", () => {
  console.log("CRONNING1");
  // bigFunction();
});

cron.schedule("* * * * *", () => {
  console.log("CRONNING2");
  // bigFunction();
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models, pubsub },
});

server.listen().then(({ url }) => console.log(`🚀 Listening on port: ${url}`));
