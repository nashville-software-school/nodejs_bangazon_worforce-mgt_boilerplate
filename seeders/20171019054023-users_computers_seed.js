'use strict';

let {usersComputers} = require('./data/usersComputers');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users_computers', usersComputers, {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users_computers', null, {});
  }
};
