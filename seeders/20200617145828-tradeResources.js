"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "tradeResources",
      [
        {
          quantitySent: 2,
          quantityReceived: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          tradeId: 1,
          resourceSentId: 1,
          resourceReceivedId: 2,
        },
        {
          quantitySent: 1,
          quantityReceived: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          tradeId: 1,
          resourceSentId: 3,
          resourceReceivedId: 4,
        },
        {
          quantitySent: 1,
          quantityReceived: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          tradeId: 2,
          resourceSentId: 2,
          resourceReceivedId: 1,
        },
        {
          quantitySent: 6,
          quantityReceived: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          tradeId: 3,
          resourceSentId: 1,
          resourceReceivedId: 5,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("tradeResources", null, {});
  },
};
