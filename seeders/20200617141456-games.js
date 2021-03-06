"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "games",
      [
        {
          gameTitle: "Soaring Flocks",
          gameTime: 15,
          gameTimePassed: 0,
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
