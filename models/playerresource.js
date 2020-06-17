"use strict";
module.exports = (sequelize, DataTypes) => {
  const playerResource = sequelize.define(
    "playerResource",
    {
      quantity: DataTypes.INTEGER,
    },
    {}
  );
  playerResource.associate = function (models) {
    playerResource.belongsTo(models.player);
    playerResource.belongsTo(models.resource);
  };
  return playerResource;
};
