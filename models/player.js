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
      inGame: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      img: DataTypes.STRING,
      build: DataTypes.JSON,
      ability: DataTypes.JSON,
      moneyCash: DataTypes.INTEGER,
      egg: DataTypes.INTEGER,
      feather: DataTypes.INTEGER,
      bug: DataTypes.INTEGER,
      vPoint: DataTypes.INTEGER,
      mMarket: DataTypes.INTEGER,
      rMarket: DataTypes.INTEGER,
      vMarket: DataTypes.INTEGER,
    },
    {}
  );
  player.associate = function (models) {
    player.belongsTo(models.game);
    player.belongsToMany(models.player, {
      through: "trades",
      as: "playerSender",
      foreignKey: "playerSenderId",
    });
    player.belongsToMany(models.player, {
      through: "trades",
      as: "playerReceiver",
      foreignKey: "playerReceiverId",
    });
    // player.hasMany(models.trade);
    player.hasMany(models.publicMessage);
    player.hasMany(models.privateMessage);
  };
  return player;
};
