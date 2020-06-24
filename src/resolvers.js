const bcrypt = require("bcryptjs");
const { checkForResolveTypeResolver } = require("apollo-server");
const Player = require("../models").player;

const resolvers = {
  Query: {
    async getAllPublicMessages(root, { content, playerId }, { models }) {
      return models.publicMessage.findAll();
    },

    async getPlayerById(root, { id }, { models }) {
      return models.player.findByPk(id);
    },

    async getGameById(root, { id }, { models }) {
      return models.game.findByPk(id);
    },

    async getAllPlayersGameState(root, { inGame }, { models }) {
      console.log(models.playerinGame);
      return models.player.findAll({
        where: { inGame },
      });
    },

    async getPrivateMessagesById(
      root,
      { playerSenderId, playerReceiverId },
      { models }
    ) {
      return models.privateMessage.findAll({
        where: {
          playerSenderId,
          playerReceiverId,
        },
      });
    },

    async getTradesById(
      root,
      { playerSenderId, playerReceiverId },
      { models }
    ) {
      return models.trade.findAll({
        where: {
          playerSenderId,
          playerReceiverId,
          // closed: false,
        },
      });
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
    async addBuild(root, { id, build }, { models }) {
      return models.player.findByPk(id);
    },
    async closeTrade(root, { id, closed }, { models }) {
      const trade = await models.trade.findByPk(id);
      console.log("OH HALLO", trade);
      await trade.update({ closed });
    },
  },

  Subscription: {
    async getAllPublicMessages(root, { content, playerId }, { models }) {
      return models.publicMessage.findAll();
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
    async playerSenderId(trade) {
      return trade.getPlayerSender();
    },
    async playerReceiverId(trade) {
      return trade.getPlayerReceiver();
    },
    // async playerSenderId(trade) {
    //   return trade.getPlayer();
    // },
    // async playerReceiverId(trade) {
    //   return trade.getPlayer();
    // },
  },

  PublicMessage: {
    async playerId(publicMessage) {
      return publicMessage.getPlayer();
    },
  },

  PrivateMessage: {
    async playerSenderId(privateMessage) {
      return privateMessage.getPlayerSender();
    },
    async playerReceiverId(privateMessage) {
      return privateMessage.getPlayerReceiver();
    },
  },
};

module.exports = resolvers;
