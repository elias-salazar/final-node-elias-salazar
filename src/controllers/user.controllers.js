const { UserServices } = require("../services");
const transporter = require("../utils/mailer");
const userRegister = async (req, res, next) => {
  try {
    const newUser = req.body;
    console.log(newUser);
    const result = await UserServices.create(newUser);
    res.status(201).json(result);
    await transporter.sendMail({
      from: "<eliotssalazaresc@gmail.com>",
      to: result.email,
      subject: "registro de usuario exitoso",
      text: `Hello ${result.username} bienvenido a la mejor tienda online`,
      html: `<h1>Hello ${result.username}</h1>  bienvenido a la mejor tienda online`,
    });
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: "faltan datos",
    });
  }
};
const getAllUser = async (req, res, next) => {
  try {
    const offset = req.query.offset ?? 0;
    const limit = req.query.limit ?? 10;
    const users = await UserServices.getAll(offset, limit);
    res.json(users);
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: "Algo salio mal",
    });
  }
};
module.exports = {
  userRegister,
  getAllUser,
};
