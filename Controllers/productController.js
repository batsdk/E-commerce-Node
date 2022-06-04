const { StatusCodes } = require("http-status-codes");
const Product = require("../Models/Product");
const Errors = require("../errors");
const path = require("path");

//* Create Product
const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product, msg: "Working" });
};

//* Get All Products
const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

//* Get Single Product
const getSingleProduct = async (req, res) => {
  const product = await Product.find({ _id: req.params.id });

  if (!product) {
    throw new Errors.BadRequestError("Can not find Product");
  }

  res.status(StatusCodes.OK).json({ product });
};

//* Update Product
const updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { runValidators: true, newTrues: true }
  );

  if (!product) {
    throw new Errors.BadRequestError("Can not find Product");
  }

  res.status(StatusCodes.OK).json({ product });
};

// *Delete Product
const deleteProduct = async (req, res) => {
  const product = await Product.findOneAndRemove({ _id: req.params.id });

  if (!product) {
    throw new Errors.BadRequestError("Can not find Product");
  }

  res.status(StatusCodes.OK).end();
};

//* Upload Image
const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new Errors.BadRequestError("No files uploaded ");
  }

  const image = req.files.image;

  if (!image.mimetype.startsWith("image")) {
    throw new Errors.BadRequestError("Please provide an Image");
  }

  const maxSize = 1024 * 1024;

  if (image.size > maxSize) {
    throw new Errors.BadRequestError("Image size im too large");
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${image.name}`
  );

  await image.mv(imagePath);

  res.status(StatusCodes.CREATED).json({ image: `/uploads/${image.name}` });
};

module.exports = {
  createProduct,
  getSingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  uploadImage,
};
