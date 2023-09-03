const mongoose = require("mongoose");

const usersModole = require("../models/usersModel");

const Schema = mongoose.Schema;
const productsSchema = new Schema({
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productQuantity: { type: Number, required: true },
  email: { type: String, required: true },
  whoLikedProduct: { type: Array, required: true },
});

const Products = mongoose.model("Products", productsSchema);

const getAllProducts = () => {
  const allProducts = Products.find();
  return allProducts;
};
const deleteProductsByUser = (_id) => {
  const productsByUser = Products.findByIdAndDelete(_id);

  return productsByUser;
};

const getProductById = (id) => {
  const product = Products.findById(id);
  return product;
};
const getProductsByArrOfId = (arrId) => {
  const product = Products.find({ arrId });
  return product;
};

const getAllProductsByUser = (email) => {
  const productsByUser = Products.find(email);
  return productsByUser;
};

const decreaseProductQuantity = (id, productQuantity) => {
  const product = Products.findByIdAndUpdate(id, { productQuantity });

  return product;
};

const insertProduct = (productName, productPrice, productQuantity, email) => {
  const product = new Products({
    productName,
    productPrice,
    productQuantity,
    email,
  });

  return product.save();
};

const removeProduct = (_id) => {
  const product = Products.findByIdAndDelete(_id);

  return product;
};

const editProduct = (_id, productName, productPrice, productQuantity) => {
  const product = Products.findByIdAndUpdate(_id, {
    productName,
    productPrice,
    productQuantity,
  });
  return product;
};

const filterProductByMaxPrice = (priceToFilter) => {
  const products = Products.find({
    productPrice: { $lte: priceToFilter },
  });
  return products;
};

const filteredProductsByMinPrice = (priceToFilter) => {
  const products = Products.find({
    productPrice: { $gte: priceToFilter },
  });
  return products;
};

const searchProductByName = (productToSearch, i) => {
  const product = Products.find({
    productName: {
      $eq: productToSearch,
    },
  }).collation({ locale: "en", strength: 2 });
  return product;
};

const pushToWhoLikeProduct = async (productId, whoLiked) => {
  return Products.updateOne(
    { _id: productId },
    { $push: { whoLikedProduct: { email: whoLiked } } }
  );
};
const removeFromWhoLikeProduct = async (productId, whoLiked) => {
  return Products.updateOne(
    { _id: productId },
    { $pull: { whoLikedProduct: { email: whoLiked } } }
  );
};

const removeAllLikesByUser = async (userEmail) => {
  return Products.updateMany({
    $pull: { whoLikedProduct: { email: userEmail } },
  });
};

module.exports = {
  insertProduct,
  removeProduct,
  editProduct,
  getAllProducts,
  getProductById,
  getAllProductsByUser,
  filterProductByMaxPrice,
  filteredProductsByMinPrice,
  searchProductByName,
  deleteProductsByUser,
  decreaseProductQuantity,
  getProductsByArrOfId,
  pushToWhoLikeProduct,
  removeFromWhoLikeProduct,
  removeAllLikesByUser,
};
