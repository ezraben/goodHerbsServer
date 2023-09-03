const productsModel = require("../models/productsModel");

const getWhoLikedProductByUser = async (email) => {
  const productsByUser = await productsModel.getAllProductsByUser({ email });
  let pName;
  let whoLiked;
  let objToShowAdmin;
  const productNameAndWhoLiked = productsByUser.map(
    (arr) => (
      (pName = arr.productName),
      (whoLiked = arr.whoLikedProduct),
      (objToShowAdmin = { productName: pName, likedByArr: whoLiked })
    )
  );

  console.log("productsByUser", productsByUser);
  console.log("productNameAndWhoLiked", productNameAndWhoLiked);
  return productNameAndWhoLiked;
};

module.exports = { getWhoLikedProductByUser };
