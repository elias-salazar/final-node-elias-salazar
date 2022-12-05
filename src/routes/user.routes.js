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
 *     summary: "register a new user into the app"
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schemas:
 *              $ref: "#/components/schemas/register"
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
 *                     $ref: "#/components/schemas/user"
 * /api/v1/users/{id}/cart:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all product in cart
 *     tags: [cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: user Id
 *     responses:
 *       200:
 *         description: OK
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
 *                   items: {}
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: buy cart
 *     tags: [cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: user Id
 *     responses:
 *       200:
 *         description: OK
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
 *                   items: {}
 * /api/v1/users/{id}/orders:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all orders
 *     tags: [cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: user Id
 *     responses:
 *       200:
 *         description: OK
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
 *                   items: {}
 *
 */

router.post("/users", userRegister);
router.get("/users", getAllUser);
router.get("/users/:id/cart", authenticate, getAllProductsInCart);
router.post("/users/:id/cart", authenticate, toBuyCart);
router.get("/users/:id/orders", authenticate, getAllOrders);

module.exports = router;
