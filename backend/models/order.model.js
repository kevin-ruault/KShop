const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        product_name: { type: String },
        product_price: { type: String },
        product_image: { type: String },
        quantity: { type: Number, required: true },
      },
    ],
    total_price: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);
