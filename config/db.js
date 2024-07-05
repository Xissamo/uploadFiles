const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fileupload', 'fileuser', 'fileuserpassword', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = { sequelize };
