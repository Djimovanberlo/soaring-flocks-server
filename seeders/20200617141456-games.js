"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "games",
      [
        {
          gameTitle: "Soaring Stocks",
          gameTime: 20,
          gameTimePassed: 5,
          closed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("games", null, {});
  },
};
