const ProductModel = require("../models/product.model");
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
    console.log(req.params);
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
    product.price =
      req.body.price !== undefined ? req.body.price : product.price;
    product.stock =
      req.body.stock !== undefined ? req.body.stock : product.stock;
    product.imagePath = imagePath;

    await product.save();

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error editing product:", error);
    return res.status(500).json({ message: "An error occurred", error });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      res.status(400).json({ message: "Product not found" });
    }

    const imagePath = path.join(__dirname, "../", product.imagePath);

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Failed to delete image: ", err);
      } else {
        console.log("Image deleted: ", imagePath);
      }
    });

    await product.deleteOne();

    res
      .status(200)
      .json({ message: "Product " + req.params.id + " has been deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};
