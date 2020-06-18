"use strict";
module.exports = (sequelize, DataTypes) => {
  const resource = sequelize.define(
    "resource",
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  resource.associate = function (models) {
    resource.hasMany(models.tradeResource);
    resource.belongsToMany(models.player, {
      through: "playerResources",
      foreignKey: "resourceId",
    });
  };
  return resource;
};
