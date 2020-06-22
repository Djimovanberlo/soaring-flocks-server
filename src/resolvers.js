const bcrypt = require("bcryptjs");
const { checkForResolveTypeResolver } = require("apollo-server");
const Resource = require("../models").resource;
const Player = require("../models").player;
// import { resource } from "../models/resource";

const resolvers = {
  Query: {
    async playerById(root, { id }, { models }) {
      const playerFind = await Player.findByPk(id);
      console.log("this.player:", playerFind);
      return playerFind;
    },
    async allResources(root, args, { models }) {
      const test = await models.resource.findAll();
      const datas = test.map((resource) => resource.dataValues);
      console.log("data test:", datas);
      return test;
    },
    async getPlayersWithResources(root, { id }, { models }) {
      try {
        const players = await Player.findAll({
          include: [Resource],
          nest: true,
        });
        console.log("!!!PLAYERS!!!", players);
        console.log(
          "!!!RESOURCES!!!",
          players.map((player) => {
            return player.resources.map((resource) => {
              return resource.dataValues;
            });
          })
        );
        return players;
      } catch (e) {
        console.log(e);
      }
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
    async playerResources(resource) {
      return resource.getPlayerResources();
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
