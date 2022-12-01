const {
  User,
  Cart,
  Order,
  Product,
  ProductInCart,
  ProductInOrder,
} = require("./index");

const initModels = () => {
  //user-products
  Product.belongsTo(User, { as: "buyer", foreignKey: "user_id" });
  User.hasMany(Product, { as: "product", foreignKey: "user_id" });

  //user-cart
  Cart.belongsTo(User, { as: "buyer", foreignKey: "user_id" });
  User.hasOne(Cart, { ass: "purchase", foreignKey: "user_id" });

  //user-order
  Order.belongsTo(User, { as: "buyer", foreignKey: "user_id" });
  User.hasMany(Order, { as: "order", foreignKey: "user_id" });

  //product-productincart
  Product.belongsTo(ProductInCart, { foreignKey: "product_id" });
  ProductInCart.hasOne(Product, { foreignKey: "product_id" });

  //productincart-cart
  ProductInOrder.belongsTo(Cart, { foreignKey: "cart_id" });
  Cart.hasMany(ProductInCart, { foreignKey: "cart_id" });

  //product-order
  Product.belongsTo(ProductInOrder, { foreignKey: "product_id" });
  ProductInOrder.hasOne(Product, { foreignKey: "product_id" });

  //productinorder-order
  ProductInOrder.belongsTo(Order, { foreignKey: "order_id" });
  Order.hasMany(ProductInOrder, { foreignKey: "order_id" });
};

module.exports = initModels;
