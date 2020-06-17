'use strict';
module.exports = (sequelize, DataTypes) => {
  const playerResource = sequelize.define('playerResource', {
    quantity: DataTypes.INTEGER
  }, {});
  playerResource.associate = function(models) {
    // associations can be defined here
  };
  return playerResource;
};