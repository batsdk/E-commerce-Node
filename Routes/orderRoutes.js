const { Router } = require("express");
const express = require("express");
const {
  authMiddleware,
  authorizePermissions,
} = require("../middleware/authentication");

const router = Router();

const {
  getSingleOrder,
  getAllOrders,
  createOrder,
  getCurrentUserOrders,
  updateOrder,
} = require("../Controllers/orderController");

router
  .route("/")
  .get(authMiddleware, authorizePermissions("admin"), getAllOrders)
  .post(authMiddleware, createOrder);

router.route("/showAllMyOrders").get(authMiddleware, getCurrentUserOrders);

router
  .route("/:id")
  .get(authMiddleware, getSingleOrder)
  .patch(authMiddleware, updateOrder);

module.exports = router;
