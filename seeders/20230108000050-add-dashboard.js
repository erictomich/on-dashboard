'use strict';

const Dashboard = require('../models/dashboard');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Dashboard.create({
      title: 'My Dashboard 1',
      description: 'This is my dashboard',
      slug: 'dashboard-1',
      file: 'dashboard1.json',
    });
  },

  async down (queryInterface, Sequelize) {
    await Dashboard.destroy({
      where: {
        slug: 'my-dashboard',
      },
    });
  }
};
