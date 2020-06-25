"use strict";
module.exports = (sequelize, DataTypes) => {
  const trade = sequelize.define(
    "trade",
    {
      moneyCashSender: DataTypes.INTEGER,
      moneyCashReceiver: DataTypes.INTEGER,
      eggSender: DataTypes.INTEGER,
      eggReceiver: DataTypes.INTEGER,
      featherSender: DataTypes.INTEGER,
      featherReceiver: DataTypes.INTEGER,
      bugSender: DataTypes.INTEGER,
      bugReceiver: DataTypes.INTEGER,
      vPointSender: DataTypes.INTEGER,
      vPointReceiver: DataTypes.INTEGER,
      closed: DataTypes.BOOLEAN,
    },
    {}
  );
  trade.associate = function (models) {
    trade.belongsTo(models.player, {
      as: "playerSender",
    });
    trade.belongsTo(models.player, {
      as: "playerReceiver",
    });
  };
  return trade;
};
