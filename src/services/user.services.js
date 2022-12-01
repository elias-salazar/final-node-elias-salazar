const { User } = require("../models");

class UserServices {
  static async create(user) {
    try {
      const result = await User.create(user);

      return result;
    } catch (error) {
      throw error;
    }
  }
  static async findUser(id) {
    try {
      const result = await User.findOne({
        where: { id },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserServices;
