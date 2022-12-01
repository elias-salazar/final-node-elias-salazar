const db = require("../utils/database");
const {
  User,
  Cart,
  Order,
  Product,
  ProductInCart,
  ProductInOrder,
} = require("../models");
const initModels = require("../models/initModels");

initModels();

const users = [
  {
    username: "María",
    email: "maria@gmail.com",
    password: "1234",
  },
  {
    username: "Germán ",
    email: "ger@hotmail.com",
    password: "123456",
  },
  {
    username: "Jose",
    email: "jose@email.com",
    password: "1234",
  },
];

const products = [
  {
    name: "pan",
    price: 2.0,
    availableQty: 20,
    status: false,
    userId: 1,
  },
  {
    name: "manzana",
    price: 1.0,
    availableQty: 5,
    userId: 2,
  },
  {
    name: "jugo",
    price: 3.0,
    availableQty: 6,
    status: true,
    userId: 3,
  },
];

db.sync({ force: true }).then(() => {
  console.log("Sincronizado");
  users.forEach(async (user) => await User.create(user));
  setTimeout(() => {
    products.forEach(async (product) => await Product.create(product));
  }, 200);
});
