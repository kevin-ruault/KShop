const ProductModel = require("../models/product.model");
const CartModel = require("../models/cart.model");
const fs = require("fs");
const path = require("path");

module.exports.getProducts = async (req, res) => {
  const products = await ProductModel.find();
  res.status(200).json(products);
};

module.exports.getProduct = async (req, res) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    res.status(400).json({ message: "Product not found" });
  }

  res.status(200).json(product);
};

module.exports.setProduct = async (req, res) => {
  try {
    const imagePath = req.file
      ? req.file.path.split("\\").slice(1).join("\\")
      : null;

    const product = await ProductModel.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      imagePath: imagePath,
    });

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "An error occurred", error });
  }
};

module.exports.editProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let imagePath = product.imagePath;

    if (req.file) {
      if (product.imagePath) {
        const oldImagePath = path.join(__dirname, "../", product.imagePath);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      imagePath = req.file.path.split("\\").slice(1).join("\\");
    }

    product.title = req.body.title || product.title;
    product.description = req.body.description || product.description;
    const newPrice =
      req.body.price !== undefined ? req.body.price : product.price;
    const oldPrice = product.price;
    product.price = newPrice;
    product.stock =
      req.body.stock !== undefined ? req.body.stock : product.stock;
    product.imagePath = imagePath;

    await product.save();

    const productId = product._id;
    const carts = await CartModel.find({ "products.product_id": productId });

    for (const cart of carts) {
      for (const item of cart.products) {
        if (item.product_id.toString() === productId.toString()) {
          const currentProduct = await ProductModel.findById(item.product_id);
          if (currentProduct) {
            cart.total_price -= oldPrice * item.quantity;
            cart.total_price += newPrice * item.quantity;
          }
        }
      }

      await cart.save();
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error editing product:", error);
    return res.status(500).json({ message: "An error occurred", error });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Produit introuvable" });
    }

    await ProductModel.findByIdAndDelete(productId);

    // Trouver tous les paniers contenant ce produit
    const carts = await CartModel.find({ "products.product_id": productId });

    for (const cart of carts) {
      // Filtrer les produits qui ne sont pas le produit supprimé
      const previousProducts = cart.products.filter(
        (item) => item.product_id.toString() === productId
      );

      // Si le produit supprimé était présent, on calcule son prix
      const productPrice = previousProducts.reduce(
        (total, item) => total + item.quantity * product.price,
        0
      );

      // Filtrer les produits restants dans le panier
      cart.products = cart.products.filter(
        (item) => item.product_id.toString() !== productId
      );

      // Recalculer le prix total du panier
      cart.total_price = cart.products.reduce((total, item) => {
        return total + item.price * item.quantity; // Assurez-vous que le prix est accessible ici
      }, 0);

      // Si le produit supprimé était dans le panier, retirer son prix du total
      cart.total_price -= productPrice;

      await cart.save(); // Sauvegarde les modifications du panier
    }

    res.status(200).json({ message: "Produit et paniers mis à jour" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du produit" });
  }
};
