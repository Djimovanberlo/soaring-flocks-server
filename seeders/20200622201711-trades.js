"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "trades",
      [
        {
          moneyCashSender: 3,
          moneyCashReceiver: 0,
          eggSender: 1,
          eggReceiver: 0,
          featherSender: 0,
          featherReceiver: 0,
          bugSender: 1,
          bugReceiver: 0,
          vPointSender: 0,
          vPointReceiver: 0,
          closed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerSenderId: 1,
          playerReceiverId: 2,
        },
        {
          moneyCashSender: 3,
          moneyCashReceiver: 0,
          eggSender: 1,
          eggReceiver: 0,
          featherSender: 1,
          featherReceiver: 0,
          bugSender: 1,
          bugReceiver: 0,
          vPointSender: 0,
          vPointReceiver: 3,
          closed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerSenderId: 1,
          playerReceiverId: 3,
        },
        {
          moneyCashSender: 3,
          moneyCashReceiver: 2,
          eggSender: 1,
          eggReceiver: 0,
          featherSender: 1,
          featherReceiver: 3,
          bugSender: 1,
          bugReceiver: 0,
          vPointSender: 0,
          vPointReceiver: 0,
          closed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          playerSenderId: 2,
          playerReceiverId: 1,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("trades", null, {});
  },
};
