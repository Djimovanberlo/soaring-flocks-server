"use strict";
module.exports = (sequelize, DataTypes) => {
  const game = sequelize.define(
    "game",
    {
      gameTitle: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      gameTime: DataTypes.INTEGER,
      gameTimePassed: DataTypes.INTEGER,
      closed: DataTypes.BOOLEAN,
    },
    {}
  );
  game.associate = function (models) {
    // associations can be defined here
  };
  return game;
};
