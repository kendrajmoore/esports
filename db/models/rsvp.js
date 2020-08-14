'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rsvp = sequelize.define('Rsvp', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Rsvp.associate = function(models) {
    // associations can be defined here
    models.Rsvp.belongsTo(models.Event, {
      foreignKey: 'EventId'
    });
  };
  return Rsvp;
};