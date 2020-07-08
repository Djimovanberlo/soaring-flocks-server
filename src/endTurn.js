const cron = require("node-cron");
const { defaultFieldResolver } = require("graphql");
const Player = require("../models").player;
const Game = require("../models").game;

async function endTurn() {
  try {
    const activePlayers = await Player.findAll({
      where: {
        inGame: true,
      },
    });
    console.log(
      "ACTIVE PLAYERS:",
      activePlayers.map((player) => {
        return player.dataValues;
      })
    );

    activePlayers.forEach((player) => {
      const {
        moneyCash,
        egg,
        feather,
        bug,
        vPoint,
        mMarket,
        rMarket,
        vMarket,
      } = player.dataValues;

      for (let i = 0; i < rMarket; i++) {
        function getRandomInt(max) {
          return Math.floor(Math.random() * Math.floor(max));
        }
        const resource = getRandomInt(3);
        if (resource === 0) {
          player.update({
            egg: player.egg + 1,
          });
        } else if (resource === 1) {
          player.update({
            feather: player.feather + 1,
          });
        } else if (resource === 2) {
          player.update({
            bug: player.bug + 1,
          });
        }
      }
      player.update({
        moneyCash: player.moneyCash + mMarket * 2,
      });
    });
    const allGames = await Game.findAll();
    console.log(
      "ALL GAMES:",
      allGames.map((game) => {
        return game.dataValues;
      })
    );
    allGames.forEach((game) => {
      console.log(game);
      game.update({
        gameTime: game.gameTime - 1,
        gameTimePassed: game.gameTimePassed + 1,
      });
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports.endTurn = endTurn;
