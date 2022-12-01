const { Router } = require("express");
const authenticate = require("../middlewares/auth.middleware");
const {
  getAllProducts,
  addProduct,
  addProductToCart,
} = require("../controllers");

const router = Router();
router.post("/products/add", authenticate, addProductToCart);

router.get("/products", getAllProducts);
router.post("/products", authenticate, addProduct);

module.exports = router;
