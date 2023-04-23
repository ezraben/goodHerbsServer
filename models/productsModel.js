const mongoose = require("mongoose");

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

const getProductById = (id) => {
  const product = Products.findById(id);
  return product;
};

const getAllProductsByUser = (email) => {
  const productsByUser = Products.find(email);
  return productsByUser;
};

const insertProduct = (productName, productPrice, email) => {
  const product = new Products({ productName, productPrice, email });
  return product.save();
};

////////////////////////////
//before adding email of user to data base to get product by user for dashBord
// const insertProduct = (productName, productPrice) => {
//   const product = new Products({ productName, productPrice });
//   return product.save();
// };
////////////////////////////
// until here before adding email of user to data base to get product by user for dashBord

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
};
