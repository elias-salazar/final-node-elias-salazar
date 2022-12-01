const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

class AuthServices {
  static async authenticate(cred) {
    try {
      const { email, password } = cred;
      const result = await User.findOne({
        where: { email },
      });
      if (result) {
        const isValid = bcrypt.compareSync(password, result.password);
        return isValid ? { isValid, result } : isValid;
      } else {
        return result;
      }
    } catch (error) {
      throw console.error();
    }
  }
  static genToken(data) {
    try {
      const token = jwt.sign(data, process.env.SECRET, {
        expiresIn: "5h",
        algorithm: "HS512",
      });
      return token;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthServices;
