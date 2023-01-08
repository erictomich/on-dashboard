const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Criptografa a senha usando o bcrypt
    const hashedPassword = await bcrypt.hash('123', 10);

    // Insere o usuário na tabela
    return queryInterface.bulkInsert('Users', [{
      username: 'eric',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    // Exclui o usuário da tabela
    return queryInterface.bulkDelete('Users', null, {});
  },
};