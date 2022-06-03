const createProduct = async (req, res) => {
  res.send("create Products");
};
const getAllProducts = async (req, res) => {
  res.send("get all Products");
};
const getSingleProduct = async (req, res) => {
  res.send("get single Product");
};
const updateProduct = async (req, res) => {
  res.send("update Product");
};
const deleteProduct = async (req, res) => {
  res.send("delete Product");
};
const uploadImage = async (req, res) => {
  res.send("upload image");
};

module.exports = {
  createProduct,
  getSingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  uploadImage,
};
