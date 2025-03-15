"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "User",
      [
        {
          username: "John Doe1",
          email: "lo1@gmail.com",
          password: "siuuuuuu",
        },
        {
          username: "John Doe2",
          email: "lo2@gmail.com",
          password: "siuuuuuu",
        },
        {
          username: "John Doe3",
          email: "lo3@gmail.com",
          password: "siuuuuuu",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
