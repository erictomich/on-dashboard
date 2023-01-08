const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// Lê os dados de configuração do arquivo config.json
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Obtém os dados de configuração para o ambiente atual (development, test ou production)
const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];

// Cria uma instância do sequelize com os dados de configuração
const sequelize = new Sequelize(envConfig.database, envConfig.username, envConfig.password, {
    host: envConfig.host,
    dialect: envConfig.dialect,
    storage: envConfig.storage,
  });

module.exports = sequelize;