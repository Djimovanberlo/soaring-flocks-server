"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "playerResources",
      [
        {
          quantity: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 1,
          resourceId: 1,
        },
        {
          quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 1,
          resourceId: 2,
        },
        {
          quantity: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 1,
          resourceId: 3,
        },
        {
          quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 1,
          resourceId: 4,
        },
        {
          quantity: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 1,
          resourceId: 5,
        },
        {
          quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 1,
          resourceId: 6,
        },
        {
          quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 1,
          resourceId: 7,
        },
        {
          quantity: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 1,
          resourceId: 8,
        },
        {
          quantity: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 2,
          resourceId: 1,
        },
        {
          quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 2,
          resourceId: 2,
        },
        {
          quantity: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 2,
          resourceId: 3,
        },
        {
          quantity: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 2,
          resourceId: 4,
        },
        {
          quantity: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 2,
          resourceId: 5,
        },
        {
          quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 2,
          resourceId: 6,
        },
        {
          quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 2,
          resourceId: 7,
        },
        {
          quantity: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 2,
          resourceId: 8,
        },
        {
          quantity: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 3,
          resourceId: 1,
        },
        {
          quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 3,
          resourceId: 2,
        },
        {
          quantity: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 3,
          resourceId: 3,
        },
        {
          quantity: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 3,
          resourceId: 4,
        },
        {
          quantity: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 3,
          resourceId: 5,
        },
        {
          quantity: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 3,
          resourceId: 6,
        },
        {
          quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 3,
          resourceId: 7,
        },
        {
          quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerId: 3,
          resourceId: 8,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("playerResources", null, {});
  },
};
