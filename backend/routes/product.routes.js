const express = require("express");
const upload = require("../middleware/upload");

const {
  setProduct,
  getProducts,
  editProduct,
  deleteProduct,
  getProduct,
} = require("../controllers/product.controller");
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", upload.single("image"), setProduct);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
