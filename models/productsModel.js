const mongoose = require("mongoose");

const usersModole = require("../models/usersModel");

const Schema = mongoose.Schema;
const productsSchema = new Schema({
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  email: { type: String, required: true },
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

const getAllProductsByUser = (email) => {
  const productsByUser = Products.find(email);
  return productsByUser;
};

///////////////////////////////
//befor chnge when you add product to add also email  of user created to array in useres modol
const insertProduct = (productName, productPrice, email) => {
  const product = new Products({ productName, productPrice, email });
  // console.log("produuuuct", product._id);
  // const sendIdToUsersMOdole = usersModole.addProductIdToUser(
  //   product._id,
  //   email
  // );

  return product.save();
};

// const insertProduct = (productName, productPrice, email) => {
//   const product = new Products({ productName, productPrice, email });
//   return product.save();
// };
///////////////////////////////
//befor chnge when you add product to add also email  of user created to array in useres modol

const removeProduct = (_id) => {
  // const product = Products.findById(_id);
  const product = Products.findByIdAndDelete(_id);

  return product;
};

const editProduct = (_id, productName, productPrice) => {
  const product = Products.findByIdAndUpdate(_id, {
    productName,
    productPrice,
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
      // .productName,
    },
  }).collation({ locale: "en", strength: 2 });
  return product;
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
};
