//User (id, username, email, password)
const db = require("../utils/database");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

/**
 * @openapi
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       properties:
 *         id:
 *            type: INTEGER
 *            example: 1
 *         username:
 *           type: string
 *           example: roberto
 *         email:
 *           type: string
 *           example: robert@gmail.com
 *         password:
 *           type: string
 *           example: 1234
 *     register:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: roberto
 *         email:
 *           type: string
 *           example: robert@gmail.com
 *         password:
 *           type: string
 *           example: 1234
 
 */
const User = db.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (user) => {
        const { password } = user;
        const hash = bcrypt.hashSync(password, 8);
        user.password = hash;
      },
    },
  }
);

module.exports = User;
