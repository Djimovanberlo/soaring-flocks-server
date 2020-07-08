"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "publicMessages",
      [
        {
          content: "Hi do you want to play?",
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 1,
        },
        {
          content: "Sure let's play.",
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 2,
        },
        {
          content: "I want to make a trade",
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 3,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("publicMessages", null, {});
  },
};
