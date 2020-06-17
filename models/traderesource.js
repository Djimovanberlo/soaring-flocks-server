'use strict';
module.exports = (sequelize, DataTypes) => {
  const tradeResource = sequelize.define('tradeResource', {
    quantitySent: DataTypes.INTEGER,
    quantityReceived: DataTypes.INTEGER
  }, {});
  tradeResource.associate = function(models) {
    // associations can be defined here
  };
  return tradeResource;
};