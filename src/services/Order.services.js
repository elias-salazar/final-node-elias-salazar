const { Order } = require("../models");

class OrderServices {
  static async getAll(userId) {
    try {
      const result = await Order.findAll({
        where: { userId },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = OrderServices;
