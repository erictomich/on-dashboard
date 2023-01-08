const Sequelize = require('sequelize');

const sequelize = require('../config/database');

// Crie um modelo de usuário
const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;