const Game = require("../models").game;
const Player = require("../models").player;
const PublicMessage = require("../models").publicMessage;
const Trade = require("../models").trade;

async function endGame() {
  // try {
  await Player.destroy({
    where: {},
  });
  await PublicMessage.destroy({
    where: {},
  });
  await Trade.destroy({
    where: {},
  });
  const allGames = await Game.findAll();
  allGames.forEach((game) => {
    game.update({
      gameTime: 15,
      gameTimePassed: 0,
    });
  });
  // } catch (err) {
  //   console.log(err);
  // }
}

module.exports.endGame = endGame;
