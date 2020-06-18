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
      gameTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gameTimePassed: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      closed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {}
  );
  game.associate = function (models) {
    game.hasMany(models.player);
  };
  return game;
};
