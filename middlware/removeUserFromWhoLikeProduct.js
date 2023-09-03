const productsModel = require("../models/productsModel");

const removeUserFromWhoLikeProduct = async (email, id) => {
  try {
    await productsModel.removeFromWhoLikeProduct(id, email);
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = {
  removeUserFromWhoLikeProduct,
};
