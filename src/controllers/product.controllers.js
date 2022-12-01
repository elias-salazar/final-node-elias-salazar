const {
  ProductServices,
  ProductInCartServices,
  CartServices,
} = require("../services");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const getAllProducts = async (req, res, next) => {
  try {
    const result = await ProductServices.getProducts();
    const filter = result.filter((product) => product.availableQty > 0);
    res.json(filter);
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: "algo salio mal",
    });
  }
};

const addProduct = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await ProductServices.add(data);
    res.status(201).json(result);
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: "revisa los datos que estas enviando",
    });
  }
};

const addProductToCart = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split("Bearer ")[1];
    const { id } = jwt.verify(token, process.env.SECRET, "HS512");
    const data = {
      userId: id,
      quantity: req.body.quantity,
      productId: req.body.id,
    };
    const dataOrder = {
      userId: id,
      quantity: req.body.quantity,
      productId: req.body.id,
    };

    const { price } = await ProductServices.getPrice(data.productId);
    let totalPrice = data.quantity * price;

    const isCart = await CartServices.findCart(id);
    const isOrder = await CartServices.findOrder(id);

    if (!isCart) {
      const cart = await CartServices.create(id, totalPrice);
      data.cartId = cart.id;
      const order = await CartServices.createOrder(id, totalPrice);
      dataOrder.orderId = order.id;
    } else {
      data.cartId = isCart.id;
      dataOrder.orderId = isOrder.id;
    }

    await CartServices.addProductInOrder(dataOrder);
    const product = await ProductInCartServices.addToCart(data);

    res.status(200).json(product);
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: "revisa los datos que estas enviando",
    });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  addProductToCart,
};
