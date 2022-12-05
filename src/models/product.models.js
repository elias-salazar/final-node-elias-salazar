//Product (id, name, price, availableQty, status, userId)
const db = require("../utils/database");
const { DataTypes } = require("sequelize");

/**
 * @openapi
 * components:
 *   schemas:
 *     products:
 *       type: object
 *       properties:
 *         id:
 *            type: INTEGER
 *            example: 1
 *         name:
 *           type: string
 *           example: phone
 *         price:
 *           type: real
 *           example: 12
 *         availableQty:
 *           type: integer
 *           example: 10
 *         status:
 *           type: boolean
 *           example: false
 *         userId:
 *           type: integer
 *           example: 1
 */
const Product = db.define("product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.REAL,
    allowNull: false,
  },
  availableQty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
  },
});

module.exports = Product;
