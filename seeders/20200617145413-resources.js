"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "resources",
      [
        {
          type: "moneyCash",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "egg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "feather",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "bug",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "vPoint",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "mMarket",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "rMarket",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "vMarket",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("resources", null, {});
  },
};
