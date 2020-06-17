'use strict';
module.exports = (sequelize, DataTypes) => {
  const trade = sequelize.define('trade', {
    closed: DataTypes.BOOLEAN
  }, {});
  trade.associate = function(models) {
    // associations can be defined here
  };
  return trade;
};