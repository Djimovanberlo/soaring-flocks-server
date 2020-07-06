// const { Game } = require("./resolvers");

const Resource = require("../models").resource;
const Player = require("../models").player;
const Game = require("../models").game;
const PrivateMessage = require("../models").privateMessage;

// async function getPrivateMessagesById(playerSenderId, playerReceiverId) {
//   // console.log(models.privateMessage);
//   return PrivateMessage.findAll({
//     where: {
//       playerSenderId: playerSenderId,
//       playerReceiverId: playerReceiverId,
//     },
//   });
// }

// getPrivateMessagesById(1, 2);

async function bigFunction() {
  const activePlayers = await Player.findAll({
    where: {
      inGame: true,
    },
  });
  // console.log("WWWWW", activePlayers);
  // console.log(
  //   "#1",
  //   activePlayers.map((player) => {
  //     return player.dataValues;
  //   })
  // );
  activePlayers.forEach((player) => {
    // console.log("!!!!!!!!", player);
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

    // console.log(
    //   "---",
    //   moneyCash,
    //   egg,
    //   feather,
    //   bug,
    //   vPoint,
    //   mMarket,
    //   rMarket,
    //   vMarket,
    //   "---"
    // );
    for (let i = 0; i < rMarket; i++) {
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      const resource = getRandomInt(3);
      // console.log("WOWOW", resource);
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
    // console.log(
    //   "#2",
    //   activePlayers.map((player) => {
    //     return player.dataValues;
    //   })
    // );
  });
  const allGames = await Game.findAll();
  allGames.forEach((game) => {
    console.log(game);
    game.update({
      gameTime: game.gameTime - 1,
      gameTimePassed: game.gameTimePassed + 1,
    });
  });
  // console.log(allGames);
}

bigFunction();
