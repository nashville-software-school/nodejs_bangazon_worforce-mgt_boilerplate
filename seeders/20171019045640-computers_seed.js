'use strict';

const { computers } = require('./data/computers');
console.log('computers', computers );


module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('computers', computers, {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('computers', null, {});
  }
};
