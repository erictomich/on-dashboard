const Sequelize = require('sequelize');

const sequelize = require('../config/database');


const Dashboard = sequelize.define('dashboard', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    slug: {
      type: Sequelize.STRING,
      unique: true,
    },
    file: {
      type: Sequelize.STRING,
    },
  });

module.exports = Dashboard;