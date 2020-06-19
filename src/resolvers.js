const bcrypt = require("bcryptjs");
// import { resource } from "../models/resource";

const resolvers = {
  Query: {
    async player(root, { id }, { models }) {
      return models.player.findByPk(id);
    },

    async allPlayersInGame(root, args, { models }) {
      const players = await models.player.findAll({
        where: {
          inGame: args.inGame,
        },
        include: [models.resource],
      });

      console.log("DIE", models.resource);
      // www
      console.log(
        "DEEZ",
        players.map((player) => {
          return JSON.stringify(player.resources);
        })
      );
      return players;
    },

    async allResources(root, args, { models }) {
      const test = await models.resource.findAll();
      const datas = test.map((resource) => resource.dataValues);
      console.log("data test:", datas);
      return test;
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
    async resources(player) {
      return player.getResources();
    },
    async playerResources(player) {
      return player.getPlayerResources();
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
    // async playerResources(resource) {
    //   return resource.getPlayerResources();
    // },
  },

  TradeResource: {
    async trade(tradeResource) {
      return tradeResource.getTrade();
    },
    async resource(tradeResource) {
      return tradeResource.getResource();
    },
  },

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
