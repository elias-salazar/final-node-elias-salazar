const { AuthServices } = require("../services");

const login = async (req, res, next) => {
  try {
    const cred = req.body;
    const result = await AuthServices.authenticate(cred);
    if (result) {
      const { username, email, id } = result.result;
      const user = { username, email, id };
      const token = AuthServices.genToken(user);
      user.token = token;
      res.json({ ...user });
    } else {
      res.status(400).json({ message: "informacion invalida" });
    }
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: "email o contraseña invalida",
    });
  }
};
module.exports = {
  login,
};
