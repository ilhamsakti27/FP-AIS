const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const database = require('../config/database')
const db = database.db

exports.userModel = db.define("users", {
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  user_telp: DataTypes.STRING,
  user_id: {
    type: DataTypes.STRING,
    primaryKey : true
  },
  tipe_id: DataTypes.STRING,
  tgl_lahir: DataTypes.STRING,
  jenis_kelamin: DataTypes.BOOLEAN,
  password: DataTypes.STRING,
},{timestamps:false});