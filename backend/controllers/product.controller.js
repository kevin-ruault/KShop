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
  if (!req.body.title) {
    res.status(400).json({ message: "Need to add a title" });
  } else if (!req.body.description) {
    res.status(400).json({ message: "Need to add a description" });
  } else if (!req.body.price) {
    res.status(400).json({ message: "Need to add a price" });
  } else if (!req.body.stock) {
    res.status(400).json({ message: "Need to add a stock" });
  }

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
  res.status(200).json(product);
};

module.exports.editProduct = async (req, res) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    res.status(400).json({ message: "Product not found" });
  }

  const updateProduct = await ProductModel.findByIdAndUpdate(
    product,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updateProduct);
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
