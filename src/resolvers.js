const { PubSub } = require("apollo-server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    async getAllPublicMessages(root, { args }, { models }) {
      const publicMessages = await models.publicMessage.findAll({
        limit: 10,
        order: [["createdAt", "DESC"]],
      });
      publicMessages.reverse();
      return publicMessages;
    },

    async getPlayerByToken(root, { token }, { models }) {
      const plId = jwt.verify(token, "my-secret-from-env-file-in-prod");
      const player = await models.player.findByPk(plId.id);
      if (player) {
        return { player, token };
      } else if (!player) {
        return { error: "token expired" };
      }
    },

    async getGameById(root, { id }, { models }) {
      return models.game.findByPk(id);
    },

    async getAllPlayersGameState(root, { inGame }, { models }) {
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
    // This is for additional feature: private message

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
      } catch (err) {
        return err;
      }
    },
  },

  Mutation: {
    async createPlayer(root, { name, email, password, img }, { models }) {
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
      if (allPlayers.length > 20) {
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

    async loginPlayer(root, { email, password }, { models }) {
      if (!email || !password) {
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
      if (allPublicMessages.length > 100) {
        await models.publicMessage.destroy({
          where: {},
        });
      }
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
      const allClosedTrades = await models.trade.findAll({
        where: {
          closed: true,
        },
      });
      if (allClosedTrades.length > 50) {
        await models.trade.destroy({
          where: {
            closed: true,
          },
        });
      }

      return models.trade.create({
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
    },

    async addBuild(root, { id, build }, { models }) {
      return models.player.findByPk(id);
    },

    async closeTrade(root, { id, closed }, { models }) {
      const trade = await models.trade.findByPk(id);
      await trade.update({ closed });
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
      const playerReceiver = await models.player.findOne({
        where: {
          id: playerReceiverId,
        },
      });
      const trade = await models.trade.findOne({
        where: {
          id,
        },
      });

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
      } else {
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
      }
    },
  },

  // https://www.youtube.com/watch?v=_r2ooFgBdoc&list=PLN3n1USn4xln0j_NN9k4j5hS1thsGibKi&index=4
  Subscription: {
    messageAdded: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("MESSAGE_ADDED"),
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
