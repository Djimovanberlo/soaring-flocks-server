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
      console.log(models.privateMessage);
      return models.privateMessage.findAll({
        where: {
          playerSenderId: playerSenderId,
          playerReceiverId: playerReceiverId,
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
      return privateMessage.getPlayer();
    },
    async playerReceiverId(privateMessage) {
      return privateMessage.getPlayer();
    },
  },
};

module.exports = resolvers;
