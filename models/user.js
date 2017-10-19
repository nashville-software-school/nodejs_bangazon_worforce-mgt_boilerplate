'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.TEXT,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {timestamps: false});

  User.associate= (models) => {
    // With sync looks like we don't need to have matching association in computer model?
    User.belongsToMany(models.Computer, {
      through: 'users_computers', timestamps: false
    });
  };

  return User;
};
