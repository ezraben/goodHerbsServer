const { trusted } = require("mongoose");
const productsModel = require("../models/productsModel");

const addUserToWhoLikedProject = async (productId, userEmail, product) => {
  let msgFromMiddleware;

  const checkOfAlreadyLiked = product.whoLikedProduct.filter((arr) => {
    if (arr.email === userEmail) {
      return userEmail;
    }
  });
  if (checkOfAlreadyLiked.length > 0) {
    msgFromMiddleware = { msg: userEmail + " already liked product" };
    return msgFromMiddleware;
  }
  if (checkOfAlreadyLiked.length === 0) {
    const addInDataBase = await productsModel.pushToWhoLikeProduct(
      productId,
      userEmail
    );
    msgFromMiddleware = { msg: userEmail + "  added to liked array" };

    return msgFromMiddleware;
  }

  return msgFromMiddleware;
};

module.exports = { addUserToWhoLikedProject };
