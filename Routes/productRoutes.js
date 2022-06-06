const express = require("express");
const router = express.Router();

const {
  createProduct,
  getSingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../Controllers/productController");

const { getSingleProductReview } = require("../Controllers/reviewController");

// Auth middleware
const {
  authMiddleware,
  authorizePermissions,
} = require("../middleware/authentication");

router
  .route("/")
  .post(authMiddleware, authorizePermissions("admin"), createProduct)
  .get(getAllProducts);

router
  .route("/uploadImage")
  .post(authMiddleware, authorizePermissions("admin"), uploadImage);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(authMiddleware, authorizePermissions("admin"), updateProduct)
  .delete(authMiddleware, authorizePermissions("admin"), deleteProduct);

router.route("/:id/reviews").get(getSingleProductReview);

module.exports = router;
