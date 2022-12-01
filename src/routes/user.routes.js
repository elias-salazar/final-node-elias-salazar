const { Router } = require("express");
const authenticate = require("../middlewares/auth.middleware");
const {
  userRegister,
  getAllUser,
  getAllProductsInCart,
  toBuyCart,
  getAllOrders,
} = require("../controllers");

const router = Router();

/**
 * @openapi
 * /api/v1/users:
 *   post:
 *     summary: Register a new user into the app
 *     tags: [Register]
 *     requestBody:
 *       description: To register a new user you need a username, email and password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/register"
 *     responses:
 *       201:
 *         description: created
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
 *                     $ref: "#/components/schemas/User"
 */
router.post("/users", userRegister);
router.get("/users", getAllUser);
router.get("/users/:id/cart", authenticate, getAllProductsInCart);
router.post("/users/:id/cart", authenticate, toBuyCart);
router.get("/users/:id/orders", authenticate, getAllOrders);

module.exports = router;
