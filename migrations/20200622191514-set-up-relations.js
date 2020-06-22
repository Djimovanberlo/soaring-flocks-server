"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("players", "gameId", {
      type: Sequelize.INTEGER,
      references: {
        model: "games",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("publicMessages", "playerId", {
      type: Sequelize.INTEGER,
      references: {
        model: "players",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("privateMessages", "playerSenderId", {
      type: Sequelize.INTEGER,
      references: {
        model: "players",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("privateMessages", "playerReceiverId", {
      type: Sequelize.INTEGER,
      references: {
        model: "players",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("trades", "playerSenderId", {
      type: Sequelize.INTEGER,
      references: {
        model: "players",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("trades", "playerReceiverId", {
      type: Sequelize.INTEGER,
      references: {
        model: "players",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("players", "gameId");
    await queryInterface.removeColumn("publicMessages", "playerId");
    await queryInterface.removeColumn("privateMessages", "playerSenderId");
    await queryInterface.removeColumn("privateMessages", "playerReceiverId");
    await queryInterface.removeColumn("trades", "playerSenderId");
    await queryInterface.removeColumn("trades", "playerReceiverId");
  },
};
