const { Sequelize } = require('sequelize');

const _DB_Name = "db_kai"
const _DB_Uname = "root"
const _DB_Pass = ""

exports.db = new Sequelize(_DB_Name, _DB_Uname, _DB_Pass, {
    host: 'localhost',
    dialect: 'mysql'
});