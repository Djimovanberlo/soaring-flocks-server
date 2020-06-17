"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "trades",
      [
        {
          closed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerSenderId: 1,
          playerReceiverId: 2,
        },
        {
          closed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerSenderId: 1,
          playerReceiverId: 3,
        },
        {
          closed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerSenderId: 2,
          playerReceiverId: 3,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("trades", null, {});
  },
};
