const { Product, User, Cart } = require("../models");

class ProductServices {
  static async getProducts() {
    try {
      const result = await Product.findAll({
        include: {
          model: User,
          as: "buyer",
          attributes: ["username"],
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async add(data) {
    try {
      const result = await Product.create(data);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getPrice(id) {
    try {
      const result = await Product.findOne({
        where: { id },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductServices;
