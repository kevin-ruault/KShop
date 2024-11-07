const OrderModel = require("../models/order.model");
const CartModel = require("../models/cart.model");
const UserModel = require("../models/user.model");
const { getProductById } = require("./product.controller");

module.exports.getOrders = async (req, res) => {
  const user = await UserModel.findOne(req.auth.userId);

  if (!user.admin) {
    res.status(400).json({ message: "L'utilisateur n'est pas administrateur" });
  }
  const orders = await OrderModel.find();
  res.status(200).json(orders);
};

module.exports.getOrdersByCustomer = async (req, res) => {
  try {
    const userId = req.auth.userId.toString();
    const query = { user_id: userId };
    const orders = await OrderModel.find(query);

    if (!orders) {
      return res
        .status(404)
        .json({ message: "Commande(s) introuvable(s) pour cet utilisateur" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de(s) commande(s)" });
  }
};

module.exports.setOrder = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const cart = await CartModel.findOne({ user_id: userId });

    if (!cart) {
      return res.status(404).json({ message: "Panier introuvable" });
    }

    const productsForOrder = await Promise.all(
      cart.products.map(async (item) => {
        const product = await getProductById(item.product_id.toString());
        if (product.stock - item.quantity < 0) {
          return res.status(404).json({ message: "Quantité invalide" });
        }
        product.stock = product.stock - item.quantity;
        await product.save();

        return {
          product_id: item.product_id.toString(),
          product_name: product.title || "",
          product_price: product.price || 0,
          product_image: product.imagePath || "",
          quantity: item.quantity,
        };
      })
    );

    const newOrder = await OrderModel.create({
      user_id: userId,
      products: productsForOrder,
      total_price: cart.total_price,
    });

    cart.products = [];
    cart.total_price = 0;
    await cart.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la commande" });
  }
};
