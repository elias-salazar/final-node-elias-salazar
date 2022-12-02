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
 */

router.post("/users", userRegister);
router.get("/users", getAllUser);
router.get("/users/:id/cart", authenticate, getAllProductsInCart);
router.post("/users/:id/cart", authenticate, toBuyCart);
router.get("/users/:id/orders", authenticate, getAllOrders);

module.exports = router;
