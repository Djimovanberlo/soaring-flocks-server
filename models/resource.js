'use strict';
module.exports = (sequelize, DataTypes) => {
  const resource = sequelize.define('resource', {
    type: DataTypes.STRING
  }, {});
  resource.associate = function(models) {
    // associations can be defined here
  };
  return resource;
};