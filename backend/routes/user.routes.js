const express = require("express");
const {
  getUser,
  getUsers,
  setUser,
  deleteUser,
  editUser,
  loginUser,
} = require("../controllers/user.controller");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, getUsers);
router.get("/:id", auth, getUser);
router.post("/", setUser);
router.put("/:id", auth, editUser);
router.delete("/:id", auth, deleteUser);
router.post("/login", loginUser);

module.exports = router;
