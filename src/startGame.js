const Game = require("../models").game;

async function startGame() {
  try {
    const startedGame = await Game.create({
      id: 1,
      gameTitle: "Soaring Flocks",
      gameTime: 20,
      gameTimePassed: 0,
      closed: false,
    });
    console.log("CREATED GAME", startedGame);
  } catch (err) {
    console.log(err);
  }
}

module.exports.startGame = startGame;