const { userRegister, getAllUser } = require("./user.controllers");
const { login } = require("./auth.controllers");
const { getAllProductsInCart, toBuyCart } = require("./cart.controllers");
const { getAllOrders } = require("./order.controllers");
const {
  getAllProducts,
  addProduct,
  addProductToCart,
} = require("./product.controllers");
module.exports = {
  userRegister,
  getAllOrders,
  getAllUser,
  login,
  getAllProducts,
  addProduct,
  addProductToCart,
  getAllProductsInCart,
  toBuyCart,
};
