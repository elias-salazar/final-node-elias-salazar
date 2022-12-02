//Order (id, totalPrice, userId, status) // si completada pendiente
const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Order = db.define("order", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  totalPrice: {
    type: DataTypes.REAL,
    allowNull: false,
    field: "total_price",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
    allowNull: false,
  },
});

module.exports = Order;
