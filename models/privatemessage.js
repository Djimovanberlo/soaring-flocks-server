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
    message.belongsTo(models.player);
  };
  return privateMessage;
};
