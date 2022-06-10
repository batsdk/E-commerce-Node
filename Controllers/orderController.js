const createOrder = async (req, res) => {
  res.end("Create");
};
const getAllOrders = async (req, res) => {
  res.end("Get all users");
};
const getCurrentUserOrders = async (req, res) => {
  res.end("getCurrentUserOrders");
};

const getSingleOrder = async (req, res) => {
  res.sedn("get single orders");
};

const updateOrder = async (req, res) => {
  res.end("Update order");
};

module.exports = {
  getSingleOrder,
  getAllOrders,
  createOrder,
  getCurrentUserOrders,
  updateOrder,
};
