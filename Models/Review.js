const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "Must rate"],
      min: 1,
      max: 10,
    },
    title: {
      type: String,
      trim: true,
      maxLength: 110,
      required: [true, "Must provide a title"],
    },
    comment: {
      trim: true,
      maxLength: 250,
      required: [true, "Must provide a title"],
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Must provide a user"],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Must provide a user"],
    },
  },
  { timestamps: true }
);

// User can only leave on review per product
// an index entails multiple fields

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Reviews", ReviewSchema);
