// export const pubsub = new PubSub();
const bcrypt = require("bcryptjs");
// const subhub = require("subhub");
const { checkForResolveTypeResolver, PubSub } = require("apollo-server");
const { Connection } = require("pg");
// import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();
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
      try {
        return models.trade.findOne({
          where: {
            playerSenderId,
            playerReceiverId,
            closed: false,
          },
        });
      } catch (e) {
        return e;
      }
    },
  },

  Mutation: {
    async createPlayer(root, { name, email, password, inGame }, { models }) {
      return models.player.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        inGame: false,
      });
    },

    async createMarket(root, { playerId, market, cashMoney }, { models }) {
      const player = await models.player.findByPk(playerId);
      // reduce resources
      if (market === "Money Market") {
        player.update({
          mMarket: player.mMarket + 1,
          cashMoney: player.cashMoney - cashMoney,
          egg: player.egg - 1,
          feather: player.feather - 1,
          bug: player.bug - 1,
        });
      } else if (market === "Rare Market") {
        player.update({
          rMarket: player.rMarket + 1,
          cashMoney: player.cashMoney - cashMoney,
          egg: player.egg - 1,
          feather: player.feather - 1,
          bug: player.bug - 1,
        });
      } else if (market === "Victory Market") {
        player.update({
          vMarket: player.vMarket + 1,
          cashMoney: player.cashMoney - cashMoney,
          egg: player.egg - 1,
          feather: player.feather - 1,
          bug: player.bug - 1,
        });
      }
    },

    async createAttack(root, { playerId, ability }, { models }) {
      const attacker = await models.player.findByPk(playerId);
      const victim = await models.player.findOne({
        where: { name: ability },
      });
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      const resource = getRandomInt(5);
      console.log("HELAAS", victim, "DADER", attacker, "DOEI", resource);
      await attacker.update({
        moneyCash: attacker.moneyCash - 1,
      });
      if (resource === 0) {
        await victim.update({
          moneyCash: victim.moneyCash - 1,
        });
      } else if (resource === 1) {
        await victim.update({
          egg: victim.egg - 1,
        });
      } else if (resource === 2) {
        await victim.update({
          feather: victim.feather - 1,
        });
      } else if (resource === 3) {
        await victim.update({
          bug: victim.bug - 1,
        });
      } else if (resource === 1) {
        await victim.update({
          vPoint: victim.vPoint - 1,
        });
      }
    },

    async createPublicMessage(root, { playerId, content }, { models, pubsub }) {
      const newMessage = await models.publicMessage.create({
        playerId,
        content,
      });
      // const allMessages = await models.publicMessage.findAll();
      // console.log("HALLOO DAAR", allMessages);
      pubsub.publish("MESSAGE_ADDED", {
        messageAdded: newMessage,
      });
    },

    async suggestTrade(
      root,
      {
        playerSenderId,
        playerReceiverId,
        moneyCashSender,
        moneyCashReceiver,
        eggSender,
        eggReceiver,
        featherSender,
        featherReceiver,
        bugSender,
        bugReceiver,
      },
      { models }
    ) {
      const existingTrade = await models.trade.findOne({
        where: { playerSenderId, playerReceiverId },
      });
      // if (existingTrade) {
      //   console.log("ALREADY EXISTBOY");
      // } else {
      await models.trade.create({
        playerSenderId,
        playerReceiverId,
        moneyCashSender,
        moneyCashReceiver,
        eggSender,
        eggReceiver,
        featherSender,
        featherReceiver,
        bugSender,
        bugReceiver,
        closed: false,
      });
      // }
    },

    async addBuild(root, { id, build }, { models }) {
      return models.player.findByPk(id);
    },

    async closeTrade(root, { id, closed }, { models }) {
      const trade = await models.trade.findByPk(id);
      console.log("OH HALLO", trade);
      await trade.update({ closed });
      return trade;
    },

    async acceptTrade(
      root,
      {
        id,
        playerSenderId,
        playerReceiverId,
        moneyCashSender,
        moneyCashReceiver,
        eggSender,
        eggReceiver,
        featherSender,
        featherReceiver,
        bugSender,
        bugReceiver,
      },
      { models }
    ) {
      console.log(
        "LEES DEES",
        id,
        playerSenderId,
        playerReceiverId,
        moneyCashSender,
        moneyCashReceiver,
        eggSender,
        eggReceiver,
        featherSender,
        featherReceiver,
        bugSender,
        bugReceiver
      );
      const playerSender = await models.player.findOne({
        where: {
          id: playerSenderId,
        },
      });
      console.log("PLAYERSENDER", playerSender);
      const playerReceiver = await models.player.findOne({
        where: {
          id: playerReceiverId,
        },
      });
      console.log("playerReceiver", playerReceiver);
      const trade = await models.trade.findOne({
        where: {
          id,
        },
      });
      console.log("trade", trade);
      await playerSender.update({
        moneyCash:
          playerSender.moneyCash + (moneyCashReceiver - moneyCashSender),
        egg: playerSender.egg + (eggReceiver - eggSender),
        feather: playerSender.feather + (featherReceiver - featherSender),
        bug: playerSender.bug + (bugReceiver - bugSender),
      });
      await playerReceiver.update({
        moneyCash:
          playerReceiver.moneyCash + (moneyCashSender - moneyCashReceiver),
        egg: playerReceiver.egg + (eggSender - eggReceiver),
        feather: playerSender.feather + (featherSender - featherReceiver),
        bug: playerReceiver.bug + (bugSender - bugReceiver),
      });
      await trade.update({
        closed: true,
      });
      console.log("LAS DAS", playerSender, playerReceiver, trade);
    },
  },

  // https://www.youtube.com/watch?v=_r2ooFgBdoc&list=PLN3n1USn4xln0j_NN9k4j5hS1thsGibKi&index=4
  Subscription: {
    messageAdded: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("MESSAGE_ADDED"),
    },
  },

  // Subscription: {
  //   async getAllPublicMessages(root, { content, playerId }, { models }) {
  //     return models.publicMessage.findAll();
  //   },
  // },

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
