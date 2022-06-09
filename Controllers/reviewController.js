const Review = require("../Models/Review");
const Product = require("../Models/Product");
const { StatusCodes } = require("http-status-codes");
const User = require("../Models/User");
const Errors = require("../errors");
const { checkPermission } = require("../Utils");

// ? Create a Review
const createReview = async (req, res) => {
  const { product: productId } = req.body;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new Errors.NotFoundError("No product found");
  }

  // Checking whether the user has left a review for this specified product

  const alreadyReviewed = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });

  if (alreadyReviewed) {
    console.log(alreadyReviewed);
    throw new Errors.BadRequestError(
      "You have already added a review for this product"
    );
  }

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);

  res
    .status(StatusCodes.OK)
    .json({ msg: "Review created successfully", review });
};

// ? Get all reviews
const getAllReviews = async (req, res) => {
  const review = await Review.find({}).populate({
    path: "product",
    select: "name company price",
  });

  res
    .status(StatusCodes.OK)
    .send({ msg: "Request Successful", nbHits: review.length, review });
};

// ? Get a single review
const getSingleReview = async (req, res) => {
  const { id } = req.params;

  const review = await Review.find({ _id: id });

  if (!review) {
    throw new Errors.NotFoundError("Review not found");
  }

  res.status(StatusCodes.OK).json({ review });
};

// ? Update review
const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new Errors.NotFoundError(`No review with id ${reviewId}`);
  }

  checkPermission(req.user, review.user);

  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();
  res.status(StatusCodes.OK).json({ review });
};

// ? Delete review
const deleteReview = async (req, res) => {
  const { id } = req.params;

  const review = await Review.findOne({ _id: id });

  if (!review) {
    throw new Errors.NotFoundError("No review found");
  }

  checkPermission(req.user, review.user);
  await review.remove();
  res.status(StatusCodes.OK).json({ msg: "Review Deleted Successfully" });
};

// ? Get Single Product Reviews
const getSingleProductReview = async (req, res) => {
  const { id: productId } = req.params;

  const review = await Review.find({ product: productId });

  if (!review) {
    throw new Errors.NotFoundError("No reviews found");
  }

  res.status(StatusCodes.OK).json({ nbHits: review.length, review });
};

module.exports = {
  getSingleProductReview,
  createReview,
  updateReview,
  deleteReview,
  getSingleReview,
  getAllReviews,
};
