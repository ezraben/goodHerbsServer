const express = require("express");
const BaseMsg = require("../classes/baseMsg");
const router = express.Router();

const productsModel = require("../models/productsModel");
const productsValidation = require("../validation/productValidation");

const usersModel = require("../models/usersModel");

router.get("/", async (req, res) => {
  try {
    const allProducts = await productsModel.getAllProducts();
    res.json(allProducts);
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});
router.get("/findProductById", async (req, res) => {
  try {
    const id = req.query.id;
    console.log("id", id);

    const product = await productsModel.getProductById(id);
    res.json(product);
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});

router.get("/allProductsByUser", async (req, res) => {
  try {
    const email = req.query;
    // console.log("email", email);
    const productsByUser = await productsModel.getAllProductsByUser(email);
    console.log("productsByUser", productsByUser);

    res.json(productsByUser);
  } catch (err) {
    console.log("err from axios", err);
    res.json(err);
  }
});

router.delete("/deleteProductsByUserForDelete", async (req, res) => {
  try {
    const email = req.query;

    const productsByUser = await productsModel.getAllProductsByUser(email);

    for (let i = 0; i < productsByUser.length; i++) {
      const idsToDelete = await productsModel.deleteProductsByUser(
        productsByUser[i]._id
      );
    }

    res.json(productsByUser);
  } catch (err) {
    console.log("err from axios", err);
    res.json(err);
  }
});

///////////////////////////////
//befor chnge when you add product to add also email  of user created to array in useres modol
router.post("/addProduct", async (req, res) => {
  try {
    const validatedValue = await productsValidation.validateProductSchema(
      req.body
    );
    if (validatedValue) {
      const addProduct = await productsModel.insertProduct(
        validatedValue.productName,
        validatedValue.productPrice,
        validatedValue.productQuantity,
        validatedValue.email
      );

      const user = await usersModel.addProductToUsersArr(
        // validatedValue.email,
        validatedValue
      );

      console.log("products", user);

      res.json(new BaseMsg(BaseMsg.STATUSES.Success, "product add"));
    }
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});

router.put("/decreaseProductQuantity", async (req, res) => {
  try {
    const id = req.query.id;
    const productById = await productsModel.getProductById(id);

    if (productById.productQuantity > 0) {
      const newProductQuantity = productById.productQuantity - 1;

      const changeProductQuantity = async () => {
        const upDatedProduct = await productsModel.decreaseProductQuantity(
          id,
          newProductQuantity
        );
        res.json(productById);
      };
      changeProductQuantity();
    }
    if (productById.productQuantity <= 0) {
      res.json(new BaseMsg(BaseMsg.STATUSES.Failed, "Product out stock"));
    }
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});

router.delete("/removeProduct", async (req, res) => {
  try {
    const id = req.query.id;

    const idToDelete = await productsModel.removeProduct(id);

    if (idToDelete) {
      res.json(new BaseMsg(BaseMsg.STATUSES.Success, "product deleted"));
    } else {
      res.json(
        new BaseMsg(BaseMsg.STATUSES.Failed, " did not find the id to delete")
      );
    }
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});

router.put("/editProduct", async (req, res) => {
  try {
    const id = req.query.id;
    const productName = req.query.productName;
    const productPrice = req.query.productPrice;
    const productQuantity = req.query.productQuantity;
    const email = req.query.email;

    console.log("req.parms", req.query);
    const validatedValue = await productsValidation.validateProductSchema({
      productName,
      productPrice,
      productQuantity,
      email,
    });
    if (validatedValue) {
      const upDatedProduct = await productsModel.editProduct(
        id,
        productName,
        productPrice,
        productQuantity,
        email
      );
      res.json(new BaseMsg(BaseMsg.STATUSES.Success, "product updated"));
    }
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});

router.post("/filterProductByMaxPrice", async (req, res) => {
  try {
    const priceToFilter = req.body.price;
    const productsFiltered = await productsModel.filterProductByMaxPrice(
      priceToFilter
    );
    res.json(productsFiltered);
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});

router.post("/filterProductByMinPrice", async (req, res) => {
  try {
    const priceToFilter = req.body.price;
    const productByMinPrice = await productsModel.filteredProductsByMinPrice(
      priceToFilter
    );
    res.json(productByMinPrice);
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});

router.post("/searchProductByName", async (req, res) => {
  try {
    const productToSearch = req.body.productName;
    const products = await productsModel.searchProductByName(productToSearch);
    console.log("productToSearch.length", products.length);
    res.json(products);
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});

router.put(`/addLikedPropertyByUser`, async (req, res) => {
  try {
    const userEmail = req.query.email;
    const productId = req.query.id;
    let idExsist;

    const checkIfAlreadyLike = await usersModel.selectUserByMail(userEmail);
    const likeIdsArrByUser = checkIfAlreadyLike[0].likedProducts;

    const idMap = likeIdsArrByUser.map((arr) => {
      if (arr == productId) {
        idExsist = "productLikedAlready";
      }
    });

    if (!idExsist) {
      const addProduct = await usersModel.addLickedProductToUsersArr(
        userEmail,
        productId
      );
      res.json(addProduct);
    }
    if (idExsist) {
      res.json("you already liked this product");
    }
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});

router.put(`/removeLikedProductByUser`, async (req, res) => {
  try {
    const userEmail = req.query.email;
    const productId = req.query.id;
    const addProduct = await usersModel.removeLickedProductFromUsersArr(
      userEmail,
      productId
    );
    console.log("addProduct", addProduct);
    res.json(addProduct);
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});
module.exports = router;
