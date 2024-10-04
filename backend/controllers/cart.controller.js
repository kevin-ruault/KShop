const CartModel = require("../models/cart.model");
const ProductModel = require("../models/product.model");

module.exports.getCarts = async (req, res) => {
  const carts = await CartModel.find();
  res.status(200).json(carts);
};

module.exports.getCart = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const cart = await CartModel.findOne({ user_id: userId });

    if (!cart) {
      return res
        .status(404)
        .json({ message: "Panier introuvable pour cet utilisateur" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du panier" });
  }
};

module.exports.addProductToCart = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { productId } = req.body;

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Produit introuvable" });
    }

    let cart = await CartModel.findOne({ user_id: userId });

    if (!cart) {
      cart = await CartModel.create({
        user_id: userId,
        products: [],
        total_price: 0,
      });
    }

    const productInCart = cart.products.find(
      (p) => p.product_id.toString() === productId
    );

    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.products.push({ product_id: product._id, quantity: 1 });
    }

    cart.total_price += product.price;

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout du produit au panier" });
  }
};

module.exports.removeProductFromCart = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { productId } = req.body;

    let cart = await CartModel.findOne({ user_id: userId });

    if (!cart) {
      return res.status(404).json({ message: "Panier introuvable" });
    }

    const productInCart = cart.products.find(
      (p) => p.product_id.toString() === productId
    );

    if (!productInCart) {
      return res
        .status(404)
        .json({ message: "Produit introuvable dans le panier" });
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Produit introuvable" });
    }

    if (productInCart.quantity > 1) {
      productInCart.quantity -= 1;
    } else {
      cart.products = cart.products.filter(
        (p) => p.product_id.toString() !== productId
      );
    }

    cart.total_price -= product.price;

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du produit du panier" });
  }
};
