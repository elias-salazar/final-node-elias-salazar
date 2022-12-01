const UserServices = require("./user.services");
const AuthServices = require("./auth.services");
const ProductServices = require("./product.services");
const ProductInCartServices = require("./productInCart.services");
const CartServices = require("./cart.services");
const OrderServices = require("./Order.services");

module.exports = {
  UserServices,
  OrderServices,
  AuthServices,
  ProductServices,
  ProductInCartServices,
  CartServices,
};
