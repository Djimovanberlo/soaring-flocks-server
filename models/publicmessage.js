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
    publicMessage.belongsTo(models.player);
  };
  return publicMessage;
};
