const bcrypt = require("bcryptjs");

const resolvers = {
  Query: {
    async player(root, { id }, { models }) {
      return models.player.findById(id);
    },
    async playerInGame(root, args, { id }, { models }) {
      return models.player.findAll((player) => player.inGame === args.inGame);
    },
    async allPlayers(root, args, { models }) {
      return models.player.findAll();
    },
  },
  Mutation: {
    async createPlayer(root, { name, email, password, inGame }, { models }) {
      return models.player.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        inGame,
      });
    },
    async createMessage(root, { content, playerId }, { models }) {
      return models.message.create({ content, playerId });
    },
  },
  Game: {
    async players(game) {
      return game.getPlayers();
    },
  },
  Player: {
    async game(player) {
      return player.getGame();
    },
    async messages(player) {
      return player.getMessages();
    },
    async trades(player) {
      return player.getTrades();
    },
  },
  Message: {
    async player(message) {
      return message.getPlayer();
    },
  },
  Trade: {
    async tradeResources(trade) {
      return trade.getTradeResources();
    },
  },
  Resource: {
    async tradeResources(resource) {
      return resource.getTradeResources();
    },
    async players(resource) {
      return resource.getPlayers();
    },
  },
  TradeResource: {
    async trade(tradeResource) {
      return tradeResource.getTrade();
    },
    async resource(tradeResource) {
      return tradeResource.getResource();
    },
  },
  PlayerResource: {
    async player(playerResource) {
      return playerResource.getPlayer();
    },
    async resource(playerResource) {
      return playerResource.getResource();
    },
  },
};

module.exports = resolvers;
