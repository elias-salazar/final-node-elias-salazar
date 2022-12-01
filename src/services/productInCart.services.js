const { ProductInCart, Product, ProductInOrder } = require("../models");

class ProductInCartServices {
  static async addToCart(data) {
    try {
      const { userId, quantity, productId, cartId } = data;

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
        cartId,
      };
      const addProduct = await ProductInCart.create(product);

      return addProduct;
    } catch (error) {
      throw error;
    }
  }
  static async productsInCart(id) {
    try {
      const result = await ProductInCart.findAll({
        where: { cartId: id },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = ProductInCartServices;
