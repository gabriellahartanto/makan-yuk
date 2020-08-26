'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // return queryInterface.bulkInsert('Students', [{
    //   first_name: 'Sam',
    //   last_name: 'Lee',
    //   username: 'samlee',
    //   age: 16,
    //   password: 'what',
    // }], {});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // return queryInterface.bulkDelete('Students', null, {});
  }
};
