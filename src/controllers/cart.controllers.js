const {
  CartServices,
  ProductInCartServices,
  UserServices,
} = require("../services");
const transporter = require("../utils/mailer");
const getAllProductsInCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await CartServices.findCart(id);
    const productsIncart = await ProductInCartServices.productsInCart(cart.id);
    let totalPrices = 0;
    productsIncart.forEach(
      (product) => (totalPrices += product.price * product.quantity)
    );
    await CartServices.updateTotalPrice(cart.id, totalPrices);
    await CartServices.updateTotalPriceO(cart.id, totalPrices);
    const result = await CartServices.getAll(cart.id);
    res.json(result);
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: "carrito vacio",
    });
  }
};
const toBuyCart = async (req, res, next) => {
  try {
    const userId = req.params;
    const user = await UserServices.findUser(userId.id);

    const { id } = await CartServices.findCart(userId.id);

    const result = await CartServices.toBuy(id);
    await CartServices.updateStatus(id);
    res.status(200).json(result);
    await transporter.sendMail({
      from: "<eliotssalazaresc@gmail.com>",
      to: user.email,
      subject: "compra exitosa",
      text: `Hello ${user.username} gracias por comprar en la mejor tienda online`,
      html: `<h1>Hello ${user.username}</h1>  gracias por comprar en la mejor tienda online`,
    });
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: "algo salio mal",
    });
  }
};
module.exports = {
  getAllProductsInCart,
  toBuyCart,
};
