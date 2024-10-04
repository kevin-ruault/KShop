const UserModel = require("../models/user.model");
const CartModel = require("../models/cart.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.getUsers = async (req, res) => {
  const users = await UserModel.find();
  res.status(200).json(users);
};

module.exports.getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.setUser = async (req, res) => {
  try {
    console.log(req.body);
    let hashedpassword = await bcrypt.hash(
      req.body.password,
      await bcrypt.genSalt(10)
    );

    const user = await UserModel.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedpassword,
    });

    const cart = await CartModel.create({
      user_id: user._id,
      products: [],
      total_price: 0,
    });

    res.status(200).json({ user, cart });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }

    console.error(err.message);
    return res
      .status(500)
      .json({ message: "An error occurred while creating the user or cart" });
  }
};

module.exports.editUser = async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    res.status(400).json({ message: "User not found" });
  }

  if (req.body.password) {
    req.body.password = await bcrypt.hash(
      req.body.password,
      await bcrypt.genSalt(10)
    );
  }

  const updateuser = await UserModel.findByIdAndUpdate(user, req.body, {
    new: true,
  });

  res.status(200).json(updateuser);
};

module.exports.deleteUser = async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    res.status(400).json({ message: "User not found" });
  }

  await user.deleteOne();

  res
    .status(200)
    .json({ message: "User " + req.params.id + " has been deleted" });
};

module.exports.loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Email or password provided is incorrect" });
    }

    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!comparePassword) {
      return res
        .status(400)
        .json({ message: "Email or password provided is incorrect" });
    }

    return res.status(200).json({
      userId: user._id,
      token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
        expiresIn: "24h",
      }),
      admin: user.admin,
      message: "Login successful!",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
