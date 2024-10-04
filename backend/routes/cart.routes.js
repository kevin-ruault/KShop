const express = require("express");
const {
  getCarts,
  getCart,
  addProductToCart,
  removeProductFromCart,
} = require("../controllers/cart.controller");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/cart", auth, getCart);
router.get("/", getCarts);
router.put("/add", auth, addProductToCart);
router.put("/remove", auth, removeProductFromCart);

module.exports = router;
