const { Router } = require("express");
const express = require("express");
const { authMiddleware } = require("../middleware/authentication");

const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../Controllers/reviewController");

const router = Router();

router.route("/").post(authMiddleware, createReview).get(getAllReviews);

router
  .route("/:id")
  .get(getSingleReview)
  .patch(authMiddleware, updateReview)
  .delete(authMiddleware, deleteReview);

module.exports = router;
