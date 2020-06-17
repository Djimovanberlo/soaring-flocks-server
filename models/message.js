"use strict";
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define(
    "message",
    {
      content: DataTypes.STRING,
    },
    {}
  );
  message.associate = function (models) {
    message.belongsTo(models.player);
  };
  return message;
};
