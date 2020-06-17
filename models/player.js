'use strict';
module.exports = (sequelize, DataTypes) => {
  const player = sequelize.define('player', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    inGame: DataTypes.BOOLEAN,
    img: DataTypes.STRING,
    build: DataTypes.JSON,
    ability: DataTypes.JSON
  }, {});
  player.associate = function(models) {
    // associations can be defined here
  };
  return player;
};