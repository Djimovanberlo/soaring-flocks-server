const Game = require("../models").game;
const Player = require("../models").player;
const PublicMessage = require("../models").publicMessage;
const Trade = require("../models").trade;

async function endGame() {
  try {
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
        gameTime: 20,
        gameTimePassed: 0,
      });
    });
  } catch (err) {
    console.log(err);
  }
}

endGame();

// const allPublicMessages = await models.publicMessage.findAll();
// if (allPublicMessages.length > 100) {
//   await models.publicMessage.destroy({
//     where: {},
//   });
// }
// },
