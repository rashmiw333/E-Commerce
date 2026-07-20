const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    originalPrice: {
      type: Number,
    },

    rating: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
