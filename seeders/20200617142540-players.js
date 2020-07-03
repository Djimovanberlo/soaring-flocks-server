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
          img: "ebert",
          build: null,
          ability: null,
          moneyCash: 5,
          egg: 1,
          feather: 1,
          bug: 2,
          vPoint: 0,
          mMarket: 1,
          rMarket: 3,
          vMarket: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          gameId: 1,
        },
        {
          name: "Rein",
          email: "rein@rein.com",
          password: bcrypt.hashSync("q", SALT_ROUNDS),
          inGame: true,
          img: "cornelius",
          build: null,
          ability: null,
          moneyCash: 7,
          egg: 4,
          feather: 1,
          bug: 2,
          vPoint: 4,
          mMarket: 1,
          rMarket: 1,
          vMarket: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          gameId: 1,
        },
        {
          name: "Matias",
          email: "matias@matias.com",
          password: bcrypt.hashSync("q", SALT_ROUNDS),
          inGame: true,
          img: "frankie",
          build: null,
          ability: null,
          moneyCash: 2,
          egg: 1,
          feather: 1,
          bug: 2,
          vPoint: 3,
          mMarket: 1,
          rMarket: 3,
          vMarket: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          gameId: 1,
        },
        {
          name: "David",
          email: "david@david.com",
          password: bcrypt.hashSync("q", SALT_ROUNDS),
          inGame: true,
          img: "rick",
          build: null,
          ability: null,
          moneyCash: 2,
          egg: 1,
          feather: 1,
          bug: 2,
          vPoint: 1,
          mMarket: 1,
          rMarket: 3,
          vMarket: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          gameId: 1,
        },
        {
          name: "Kelley",
          email: "kelley@kelley.com",
          password: bcrypt.hashSync("q", SALT_ROUNDS),
          inGame: true,
          img: "archibald",
          build: null,
          ability: null,
          moneyCash: 2,
          egg: 1,
          feather: 1,
          bug: 2,
          vPoint: 5,
          mMarket: 1,
          rMarket: 3,
          vMarket: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          gameId: 1,
        },
        {
          name: "Jeroen B",
          email: "jeroen@jeroen.com",
          password: bcrypt.hashSync("q", SALT_ROUNDS),
          inGame: false,
          img: null,
          build: null,
          ability: null,
          moneyCash: null,
          egg: null,
          feather: null,
          bug: null,
          vPoint: null,
          mMarket: null,
          rMarket: null,
          vMarket: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          gameId: null,
        },
        {
          name: "Jeroen H",
          email: "jeroen@jeroen.com",
          password: bcrypt.hashSync("q", SALT_ROUNDS),
          inGame: false,
          img: null,
          build: null,
          ability: null,
          moneyCash: null,
          egg: null,
          feather: null,
          bug: null,
          vPoint: null,
          mMarket: null,
          rMarket: null,
          vMarket: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          gameId: null,
        },
        {
          name: "another Jeroen",
          email: "jeroen@jeroen.com",
          password: bcrypt.hashSync("q", SALT_ROUNDS),
          inGame: false,
          img: null,
          build: null,
          ability: null,
          moneyCash: null,
          egg: null,
          feather: null,
          bug: null,
          vPoint: null,
          mMarket: null,
          rMarket: null,
          vMarket: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          gameId: null,
        },
        {
          name: "yet another jeroen",
          email: "jeroen@jeroen.com",
          password: bcrypt.hashSync("q", SALT_ROUNDS),
          inGame: false,
          img: null,
          build: null,
          ability: null,
          moneyCash: null,
          egg: null,
          feather: null,
          bug: null,
          vPoint: null,
          mMarket: null,
          rMarket: null,
          vMarket: null,
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
