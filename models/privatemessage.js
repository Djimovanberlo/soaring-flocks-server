"use strict";
module.exports = (sequelize, DataTypes) => {
  const privateMessage = sequelize.define(
    "privateMessage",
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  privateMessage.associate = function (models) {
    privateMessage.belongsTo(models.player, {
      as: "playerSender",
    });
    privateMessage.belongsTo(models.player, {
      as: "playerReceiver",
    });
  };
  return privateMessage;
};

// trade.belongsTo(models.player, {
//   as: "playerSender",
// });
// trade.belongsTo(models.player, {
//   as: "playerReceiver",
// });
