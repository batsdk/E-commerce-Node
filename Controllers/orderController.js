const Order = require("../Models/Order");
const Product = require("../Models/Product");

const User = require("../Models/User");
const Errors = require("../errors");

const { checkPermission } = require("../Utils");
const { StatusCodes } = require("http-status-codes");

// ? You must use stripe in front end to get the legit functionality
const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = "secretValue";
  return { client_secret, amount };
};

//! Create Order
const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new Errors.BadRequestError("No cart items provided.");
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const singleProduct = await Product.findOne({ _id: item.product });
    if (!singleProduct) {
      throw new Errors.NotFoundError("There is no product");
    }
    const { name, price, image, _id } = singleProduct;

    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      productId: _id,
    };

    // * Add item to order
    orderItems = [...orderItems, singleOrderItem];

    // * Calculate subtotal
    subtotal += item.amount * item.price;
  }

  // * Calculate order total
  const total = tax + shippingFee + subtotal;

  // * getClientSecret
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: "USD",
  });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};

// ! Get All Orders
const getAllOrders = async (req, res) => {
  const order = await Order.find({});

  if (!order) {
    throw new Errors.BadRequestError("Can not find orders");
  }
  res.status(StatusCodes.OK).json({ order });
};

//! Get Current User Orders
const getCurrentUserOrders = async (req, res) => {
  const order = await Order.find({ user: req.user.userId });
  if (!order) {
    throw new Errors.NotFoundError(
      "No Orders found with userId: " + req.user.userId
    );
  }

  res.status(StatusCodes.OK).json({ order });
};

// ! Get single order
const getSingleOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({ _id: id });

  if (!order) throw new Errors.NotFoundError("No order found with id: " + id);

  checkPermission(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};

// ! Update Order
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { paymentIntentId } = req.body;

  const order = await Order.findOne({ _id: id });

  if (!order) throw new Errors.NotFoundError("No order found with id: " + id);

  checkPermissions(req.user, order.user);

  order.paymentIntentId = paymentIntentId;
  order.status = "paid";

  await order.save();
  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  getSingleOrder,
  getAllOrders,
  createOrder,
  getCurrentUserOrders,
  updateOrder,
};
