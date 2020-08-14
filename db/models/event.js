'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    eventName: DataTypes.STRING,
    desc: DataTypes.TEXT,
    game: DataTypes.STRING,
    location: DataTypes.STRING,
    imgUrl: DataTypes.STRING 
  }, {
    freezeTableName: true,
    tableName: 'Events',
  });
  Event.associate = function(models) {
    // associations can be defined here
    models.Event.hasMany(models.Rsvp);
  };
  return Event;
};