"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "players",
      [
        {
          name: "Djimo",
          email: "djimo@djimo.com",
          password: bcrypt.hashSync("q", SALT_ROUNDS),
          inGame: true,
          img: null,
          build: null,
          ability: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          gameId: 1,
        },
        {
          name: "Jan",
          email: "jan@jan.com",
          password: bcrypt.hashSync("q", SALT_ROUNDS),
          inGame: true,
          img: null,
          build: null,
          ability: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          gameId: 1,
        },
        {
          name: "Jochem",
          email: "jochem@jochem.com",
          password: bcrypt.hashSync("q", SALT_ROUNDS),
          inGame: true,
          img: null,
          build: null,
          ability: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          gameId: 1,
        },
        {
          name: "Joep",
          email: "joep@joep.com",
          password: bcrypt.hashSync("q", SALT_ROUNDS),
          inGame: false,
          img: null,
          build: null,
          ability: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          gameId: null,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("games", null, {});
  },
};
