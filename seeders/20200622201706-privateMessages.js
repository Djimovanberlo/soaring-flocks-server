"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "privateMessages",
      [
        {
          content: "send msg",
          createdAt: new Date(),
          updatedAt: new Date(),
          playerSenderId: 1,
          playerReceiverId: 2,
        },
        {
          content: "send msg2",
          createdAt: new Date(),
          updatedAt: new Date(),
          playerSenderId: 2,
          playerReceiverId: 1,
        },
        {
          content: "send msg3",
          createdAt: new Date(),
          updatedAt: new Date(),
          playerSenderId: 3,
          playerReceiverId: 1,
        },
        {
          content: "send msg4",
          createdAt: new Date(),
          updatedAt: new Date(),
          playerSenderId: 1,
          playerReceiverId: 3,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("privateMessages", null, {});
  },
};
