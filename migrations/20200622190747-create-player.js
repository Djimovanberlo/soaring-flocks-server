"use strict";

const { sequelize } = require("../models");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("players", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      inGame: {
        type: Sequelize.BOOLEAN,
      },
      img: {
        type: Sequelize.STRING,
      },
      build: {
        type: Sequelize.STRING,
      },
      ability: {
        type: Sequelize.STRING,
      },
      moneyCash: {
        type: Sequelize.INTEGER,
      },
      egg: {
        type: Sequelize.INTEGER,
      },
      feather: {
        type: Sequelize.INTEGER,
      },
      bug: {
        type: Sequelize.INTEGER,
      },
      vPoint: {
        type: Sequelize.INTEGER,
      },
      mMarket: {
        type: Sequelize.INTEGER,
      },
      rMarket: {
        type: Sequelize.INTEGER,
      },
      vMarket: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable("players");
  },
};
