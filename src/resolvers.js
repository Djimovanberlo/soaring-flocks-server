const bcrypt = require("bcryptjs");
const { checkForResolveTypeResolver } = require("apollo-server");
const Player = require("../models").player;

const resolvers = {
  Query: {
    async playerById(root, { id }, { models }) {
      const playerFind = await Player.findByPk(id);
      console.log("this.player:", playerFind);
      return playerFind;
    },
    async getAllPublicMessages(root, { content, playerId }, { models }) {
      return models.publicMessage.findAll();
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
    async publicMessages(player) {
      return player.getPublicMessages();
    },
    async privateMessages(player) {
      return player.getPrivateMessages();
    },
    async trades(player) {
      return player.getTrades();
    },
  },

  Trade: {
    async PlayerSenderId(trade) {
      return trade.getPlayerSenderId();
    },
    async PlayerReceiverId(trade) {
      return trade.getPlayerReceiverId();
    },
  },
  // Message: {
  //   async player(message) {
  //     return message.getPlayer();
  //   },
  // },

  // Resource: {
  //   async tradeResources(resource) {
  //     return resource.getTradeResources();
  //   },
  //   async players(resource) {
  //     return resource.getPlayers();
  //   },
  //   async playerResources(resource) {
  //     return resource.getPlayerResources();
  //   },
  // },

  // TradeResource: {
  //   async trade(tradeResource) {
  //     return tradeResource.getTrade();
  //   },
  //   async resource(tradeResource) {
  //     return tradeResource.getResource();
  //   },
  // },

  // PlayerResource: {
  //   async player(playerResource) {
  //     return playerResource.getPlayer();
  //   },
  //   async resource(playerResource) {
  //     return playerResource.getResource();
  //   },
  // },
};

module.exports = resolvers;
