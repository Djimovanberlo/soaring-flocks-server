// export const pubsub = new PubSub();
const bcrypt = require("bcryptjs");
// const subhub = require("subhub");
const { checkForResolveTypeResolver, PubSub } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { toJWT, toData } = require("../auth/jwt");
const { Connection } = require("pg");
const { GraphQLError } = require("graphql");
// import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();
const Player = require("../models").player;

const resolvers = {
  Query: {
    async getAllPublicMessages(root, { content, playerId }, { models }) {
      const publicMessages = await models.publicMessage.findAll({
        limit: 10,
        order: [["createdAt", "DESC"]],
      });
      publicMessages.reverse();
      return publicMessages;
    },

    async getPlayerByToken(root, { token }, { models }) {
      // FIND PLAYER BY TOKEN
      // console.log("TOKEN", token);
      const plId = jwt.verify(token, "my-secret-from-env-file-in-prod");
      // console.log("TOKENMEN", plId);
      const player = await models.player.findByPk(plId.id);
      console.log("PPLLAAYYEERR", player);
      // const token = jwt.sign(
      //   { id: player.id },
      //   "my-secret-from-env-file-in-prod",
      //   { expiresIn: "1h" }
      // );
      return { player, token };
    },

    async refreshPlayer(root, { token }, { models }) {
      console.log("TOKEN TIME", token);
      return { token };
    },

    async getGameById(root, { id }, { models }) {
      return models.game.findByPk(id);
    },

    async getAllPlayersGameState(root, { inGame }, { models }) {
      // console.log(models.playerinGame);
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

  // async getCurrentPlayer(root, args, { models }) {
  //   if (!player) {
  //     throw new Error("Not authenticated");
  //   }
  //   return models.player.findOne({
  //     where: {
  //       id: player.id,
  //     },
  //   });
  // },

  Mutation: {
    async createPlayer(
      root,
      { name, email, password, img, inGame },
      { models }
    ) {
      if (!email || !password || !name) {
        return {
          error: "Provide name, email and password",
        };
      }
      const existingEmail = await models.player.findOne({
        where: {
          email,
        },
      });
      if (existingEmail) {
        return {
          error: "Player with that email already exists",
        };
      }

      const existingName = await models.player.findOne({
        where: {
          name,
        },
      });
      if (existingName) {
        return {
          error: "Player with that name already exists",
        };
      }

      const allPlayers = await models.player.findAll();
      if (allPlayers.length > 25) {
        return {
          error:
            "Playerlimit reached. No more space for new players in current version",
        };
      }

      try {
        const player = await models.player.create({
          name,
          email,
          password: await bcrypt.hash(password, 10),
          img,
          inGame: true,
          gameId: 1,
          mMarket: 1,
          rMarket: 2,
          vMarket: 0,
          moneyCash: 2,
          egg: 1,
          feather: 1,
          bug: 1,
          vPoint: 0,
        });
        const token = jwt.sign(
          { id: player.id },
          "my-secret-from-env-file-in-prod",
          { expiresIn: "1h" }
        );
        return { token, player };
      } catch (err) {
        return {
          error: err,
        };
      }
    },

    // async createPlayer(
    //   root,
    //   { name, email, password, img, inGame },
    //   { models }
    // ) {
    //   return models.player.create({
    //     name,
    //     email,
    //     password: await bcrypt.hash(password, 10),
    //     img,
    //     inGame: true,
    //     gameId: 1,
    //     mMarket: 1,
    //     rMarket: 2,
    //     vMarket: 0,
    //     moneyCash: 2,
    //     egg: 1,
    //     feather: 1,
    //     bug: 1,
    //     vPoint: 0,
    //   });
    // },
    // to do? delete password before return, so you don't send the hashed pw back

    async loginPlayer(root, { name, email, password }, { models }) {
      // console.log("HELLO", email, password);
      if (!email || !password) {
        // return new GraphQLError("please provide both email and password");
        return {
          error: "Provide both email and password",
        };
      }

      try {
        const player = await models.player.findOne({ where: { email } });

        if (!player || !bcrypt.compareSync(password, player.password)) {
          return {
            error: "User with that email not found or password incorrect",
          };
        }

        const token = jwt.sign(
          { id: player.id },
          "my-secret-from-env-file-in-prod",
          { expiresIn: "1h" }
        );
        return { token, player };
      } catch (err) {
        return {
          error: err,
        };
      }
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
      // console.log("HELAAS", victim, "DADER", attacker, "DOEI", resource);
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
      if (playerId && content) {
        const newPublicMessage = await models.publicMessage.create({
          playerId,
          content,
        });
        pubsub.publish("MESSAGE_ADDED", {
          messageAdded: newPublicMessage,
        });
      }
      const allPublicMessages = await models.publicMessage.findAll();
      // console.log("AAAA", allPublicMessages);
      if (allPublicMessages.length > 10) {
        // console.log("WWWW");
        await models.publicMessage.destroy({
          where: {},
        });
      }

      // if (allClosedTrades.length > 100) {
      //   console.log("CLOSED TRADE LENGTH");
      //   await models.trade.destroy({
      //     where: {
      //       closed: true,
      //     },
      //   });
      // }
      // console.log("HALLOO DAAR", allMessages);
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
      // const existingTrade = await models.trade.findOne({
      //   where: { playerSenderId, playerReceiverId },
      // });
      // if (existingTrade) {
      //   console.log("ALREADY EXISTBOY");
      // } else {
      const allClosedTrades = await models.trade.findAll({
        where: {
          closed: true,
        },
      });
      console.log("CLOSED TRADES", allClosedTrades);
      if (allClosedTrades.length > 100) {
        console.log("CLOSED TRADE LENGTH");
        await models.trade.destroy({
          where: {
            closed: true,
          },
        });
      }

      const newTrade = await models.trade.create({
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
      // console.log(newTrade);
      // }
    },

    async addBuild(root, { id, build }, { models }) {
      return models.player.findByPk(id);
    },

    async closeTrade(root, { id, closed }, { models }) {
      const trade = await models.trade.findByPk(id);
      // console.log("OH HALLO", trade);
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
      // update for returning errors when written as subscription instead of mutation + force refresh
      const playerSender = await models.player.findOne({
        where: {
          id: playerSenderId,
        },
      });
      // console.log("PLAYERSENDER", playerSender);
      const playerReceiver = await models.player.findOne({
        where: {
          id: playerReceiverId,
        },
      });

      // console.log("playerReceiver", playerReceiver);
      const trade = await models.trade.findOne({
        where: {
          id,
        },
      });
      // console.log("trade", trade);

      if (
        moneyCashSender > playerSender.moneyCash ||
        moneyCashReceiver > playerReceiver.moneyCash ||
        eggSender > playerSender.egg ||
        eggReceiver > playerReceiver.egg ||
        featherSender > playerSender.feather ||
        featherReceiver > playerReceiver.feather ||
        bugSender > playerSender.bug ||
        bugReceiver > playerReceiver.bug
      ) {
        await trade.update({
          closed: true,
        });
      }

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
