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
    await queryInterface.addColumn("messages", "playerId", {
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
    await queryInterface.addColumn("tradeResources", "tradeId", {
      type: Sequelize.INTEGER,
      references: {
        model: "trades",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("tradeResources", "resourceSentId", {
      type: Sequelize.INTEGER,
      references: {
        model: "resources",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("tradeResources", "resourceReceivedId", {
      type: Sequelize.INTEGER,
      references: {
        model: "resources",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("playerResources", "playerId", {
      type: Sequelize.INTEGER,
      references: {
        model: "players",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("playerResources", "resourceId", {
      type: Sequelize.INTEGER,
      references: {
        model: "resources",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("players", "gameId");
    await queryInterface.removeColumn("messages", "playerId");
    await queryInterface.removeColumn("trades", "playerSenderId");
    await queryInterface.removeColumn("trades", "playerReceiverId");
    await queryInterface.removeColumn("tradeResources", "tradeId");
    await queryInterface.removeColumn("tradeResources", "resourceSentId");
    await queryInterface.removeColumn("tradeResources", "resourceReceivedId");
    await queryInterface.removeColumn("playerResources", "playerId");
    await queryInterface.removeColumn("playerResources", "resourceId");
  },
};
