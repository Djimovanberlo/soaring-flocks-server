const Resource = require("../models").resource;
const Player = require("../models").player;
const PrivateMessage = require("../models").privateMessage;

// async function getPlayersWithResources() {
//   try {
//     const players = await Player.findAll({ include: [Resource] });
//     console.log("!!!PLAYERS!!!", players);
//     console.log(
//       "!!!RESOURCES!!!",
//       players.map((player) => {
//         return player.resources.map((resource) => {
//           return resource.dataValues.playerResources.dataValues;
//         });
//       })
//     );
//   } catch (e) {
//     console.log(e);
//   }
// }

// getPlayersWithResources();

async function getPrivateMessagesById(playerSenderId, playerReceiverId) {
  // console.log(models.privateMessage);
  return PrivateMessage.findAll({
    where: {
      playerSenderId: playerSenderId,
      playerReceiverId: playerReceiverId,
    },
  });
}

getPrivateMessagesById(1, 2);
