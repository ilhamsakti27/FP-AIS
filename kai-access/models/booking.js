const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const database = require('../config/database')
const db = database.db

exports.bookingModel = db.define("bookings", {
  kode_bayar: DataTypes.STRING,
  kode_booking: DataTypes.STRING,
  user_id: {
    type: DataTypes.STRING,
    primaryKey : true
  },
});