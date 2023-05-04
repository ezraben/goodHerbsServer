const express = require("express");
const BaseMsg = require("../classes/baseMsg");
const router = express.Router();

const productsModel = require("../models/productsModel");
const productsValidation = require("../validation/productValidation");

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
    console.log("email", email);
    const productsByUser = await productsModel.getAllProductsByUser(email);
    res.json(productsByUser);
  } catch (err) {
    console.log("err from axios", err);
    res.json(err);
  }
});

router.post("/addProduct", async (req, res) => {
  try {
    const validatedValue = await productsValidation.validateProductSchema(
      req.body
    );
    if (validatedValue) {
      const addProduct = await productsModel.insertProduct(
        validatedValue.productName,
        validatedValue.productPrice,
        validatedValue.email
      );
      res.json(new BaseMsg(BaseMsg.STATUSES.Success, "product add"));
    }
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});

////////////////////////////
//before adding email of user to data base to get product by user for dashBord
// router.post("/addProduct", async (req, res) => {
//   try {
//     const validatedValue = await productsValidation.validateProductSchema(
//       req.body
//     );
//     if (validatedValue) {
//       const addProduct = await productsModel.insertProduct(
//         validatedValue.productName,
//         validatedValue.productPrice
//       );
//       res.json(new BaseMsg(BaseMsg.STATUSES.Success, "product add"));
//     }
//   } catch (err) {
//     console.log("err", err);
//     res.json(err);
//   }
// });

////////////////////////////
//until here before adding email of user to data base to get product by user for dashBord

router.delete("/removeProduct", async (req, res) => {
  try {
    const id = req.query.id;
    // const id = req.body.id;
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

    const validatedValue = await productsValidation.validateProductSchema({
      productName,
      productPrice,
    });
    if (validatedValue) {
      const upDatedProduct = await productsModel.editProduct(
        id,
        productName,
        productPrice
      );
      res.json(new BaseMsg(BaseMsg.STATUSES.Success, "product updated"));
    }
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});
// router.put("/editProduct", async (req, res) => {
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
module.exports = router;
