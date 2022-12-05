const { Router } = require("express");
const authenticate = require("../middlewares/auth.middleware");
const {
  getAllProducts,
  addProduct,
  addProductToCart,
} = require("../controllers");
/**
 * @openapi
 * /api/v1/products:
 *   get:
 *     summary: "get all products"
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/products"
 */

const router = Router();
router.post("/products/:id/add", authenticate, addProductToCart);

router.get("/products", getAllProducts);
router.post("/products", authenticate, addProduct);

module.exports = router;
