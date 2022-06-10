const Order = require("../Models/Order");
const Product = require("../Models/Product");

const User = require("../Models/User");
const Errors = require("../errors");

const { checkPermission } = require("../Utils");
const { StatusCodes } = require("http-status-codes");

//! Create Order
const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new Errors.BadRequestError("No cart items provided.");
  }

  if (!tax || !shippingFee) {
    throw new Errors.BadRequestError("Please provide shipping fee and tax ");
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new Errors.NotFoundError("There is no product");
    }
    const { name, price, image, _id } = dbProduct;
  }

  res.send("Create");
};
const getAllOrders = async (req, res) => {
  console.log("executed");
  res.send("Get all Orders");
};
const getCurrentUserOrders = async (req, res) => {
  res.send("getCurrentUserOrders");
};

const getSingleOrder = async (req, res) => {
  res.send("get single orders");
};

const updateOrder = async (req, res) => {
  res.send("Update order");
};

module.exports = {
  getSingleOrder,
  getAllOrders,
  createOrder,
  getCurrentUserOrders,
  updateOrder,
};
