"use strict";
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define(
    "message",
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  message.associate = function (models) {
    message.belongsTo(models.player);
  };
  return message;
};
