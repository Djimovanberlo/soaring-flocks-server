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
    privateMessage.belongsTo(models.player);
  };
  return privateMessage;
};
