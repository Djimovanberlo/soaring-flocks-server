"use strict";

const trade = require("./trade");

module.exports = (sequelize, DataTypes) => {
  const tradeResource = sequelize.define(
    "tradeResource",
    {
      quantitySent: DataTypes.INTEGER,
      quantityReceived: DataTypes.INTEGER,
    },
    {}
  );
  tradeResource.associate = function (models) {
    tradeResource.belongsTo(models.trade);
    tradeResource.belongsTo(models.resource);
  };
  return tradeResource;
};
