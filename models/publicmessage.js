"use strict";
module.exports = (sequelize, DataTypes) => {
  const publicMessage = sequelize.define(
    "publicMessage",
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  publicMessage.associate = function (models) {
    message.belongsTo(models.player);
  };
  return publicMessage;
};
