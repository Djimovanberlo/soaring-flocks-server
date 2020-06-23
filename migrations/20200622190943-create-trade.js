"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("trades", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      moneyCashSender: {
        type: Sequelize.INTEGER,
      },
      moneyCashReceiver: {
        type: Sequelize.INTEGER,
      },
      eggSender: {
        type: Sequelize.INTEGER,
      },
      eggReceiver: {
        type: Sequelize.INTEGER,
      },
      featherSender: {
        type: Sequelize.INTEGER,
      },
      featherReceiver: {
        type: Sequelize.INTEGER,
      },
      bugSender: {
        type: Sequelize.INTEGER,
      },
      bugReceiver: {
        type: Sequelize.INTEGER,
      },
      vPointSender: {
        type: Sequelize.INTEGER,
      },
      vPointReceiver: {
        type: Sequelize.INTEGER,
      },
      closed: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("trades");
  },
};
