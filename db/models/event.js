'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    eventName: DataTypes.STRING,
    desc: DataTypes.TEXT,
    game: DataTypes.STRING,
    location: DataTypes.STRING,
    imgUrl: DataTypes.STRING 
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};