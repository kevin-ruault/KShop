const express = require("express");
const {
  getOrders,
  getOrdersByCustomer,
  setOrder,
} = require("../controllers/order.controller");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, getOrders);
router.get("/order", auth, getOrdersByCustomer);
router.post("/", auth, setOrder);

module.exports = router;
