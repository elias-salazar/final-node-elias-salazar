const {
  Cart,
  ProductInCart,
  Product,
  ProductInOrder,
  Order,
} = require("../models");

class CartServices {
  static async create(userId, totalPrice) {
    try {
      const result = await Cart.create({ userId, totalPrice });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async findCart(id) {
    try {
      const result = await Cart.findOne({
        where: {
          userId: id,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getAll(id) {
    try {
      const result = await Cart.findOne({
        where: { id },
        attributes: ["id", "totalPrice"],
        include: {
          model: ProductInCart,

          attributes: ["id", "quantity", "price"],
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async updateTotalPrice(id, data) {
    const result = await Cart.update(
      { totalPrice: data },
      {
        where: { id },
      }
    );

    return result;
  }
  static async findOrder(id) {
    try {
      const result = await Order.findOne({
        where: {
          userId: id,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async createOrder(userId, totalPrice) {
    try {
      const result = await Order.create({ userId, totalPrice });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async addProductInOrder(data) {
    try {
      const { userId, quantity, productId, orderId } = data;

      const { price, status } = await Product.findOne({
        where: {
          id: productId,
        },
      });

      const product = {
        userId,
        quantity,
        productId,
        status,
        price,
        orderId,
      };
      const addProduct = await ProductInOrder.create(product);

      return addProduct;
    } catch (error) {
      throw error;
    }
  }
  static async updateTotalPriceO(id, data) {
    const result = await Order.update(
      { totalPrice: data },
      {
        where: { id },
      }
    );
  }
  static async toBuy(id) {
    try {
      const result = await Cart.destroy({
        where: { id },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async updateStatus(id) {
    const result = await Order.update(
      { status: "purchases" },
      {
        where: { id },
      }
    );
  }
}

module.exports = CartServices;
