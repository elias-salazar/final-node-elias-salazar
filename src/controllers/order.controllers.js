const { OrderServices } = require("../services");

const getAllOrders = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await OrderServices.getAll(id);
    res.json(result);
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: "Algo salio mal",
    });
  }
};
module.exports = {
  getAllOrders,
};
