const { ApolloServer } = require("apollo-server");
const { PubSub } = require("apollo-server");
const cron = require("node-cron");
const typeDefs = require("./src/schema");
const resolvers = require("./src/resolvers");
const models = require("./models");
const startGame = require("./src/startGame").startGame;
const endGame = require("./src/endGame").endGame;
const endTurn = require("./src/endTurn").endTurn;
const pubsub = new PubSub();
const PORT = require("./config/constants");

cron.schedule("0 0 * * *", () => {
  console.log("END TURN");
  endTurn();
});

cron.schedule("0 5 * */15 * *", () => {
  console.log("END GAME");
  endGame();
});

startGame();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models, pubsub },
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
