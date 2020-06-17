"use strict";
module.exports = (sequelize, DataTypes) => {
  const player = sequelize.define(
    "player",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      inGame: DataTypes.BOOLEAN,
      img: DataTypes.STRING,
      build: DataTypes.JSON,
      ability: DataTypes.JSON,
    },
    {}
  );
  player.associate = function (models) {
    player.belongsTo(models.game);
    player.hasMany(models.trade);
    player.hasMany(models.message);
    player.belongsToMany(models.resource, {
      through: "playerResources",
      foreignKey: "playerId",
    });
  };
  return player;
};
