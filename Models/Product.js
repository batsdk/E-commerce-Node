const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a product name"],
      maxLength: [100, "Product name can not exceed 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a product price"],
      default: 10,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Please provide a product description"],
      maxLength: [500, "Product description can not exceed 500 characters"],
    },
    image: {
      type: String,
      default: "/uploads/example.jpeg",
    },
    category: {
      type: String,
      required: [true, "Please provide a product category"],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: [true, "Please provide a product company"],
      enum: {
        value: ["ikea", "liddy", "marcros"],
        message: "{VALUE} is not supported",
      },
    },
    colours: {
      type: [String],
      required: [true, "Please provide a product colour"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: [true, "Please provide a product inventory"],
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
