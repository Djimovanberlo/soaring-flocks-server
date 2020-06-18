"use strict";
module.exports = (sequelize, DataTypes) => {
  const trade = sequelize.define(
    "trade",
    {
      closed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {}
  );
  trade.associate = function (models) {
    trade.belongsTo(models.player);
    trade.hasMany(models.playerResource);
  };
  return trade;
};
