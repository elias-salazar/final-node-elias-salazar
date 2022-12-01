//Cart (id, userId, totalPrice)
const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Cart = db.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 00,
    field: "total_price",
  },
});
module.exports = Cart;
