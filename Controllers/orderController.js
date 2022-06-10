const createOrder = async (req, res) => {
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
