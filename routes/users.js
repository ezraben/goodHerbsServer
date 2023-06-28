const e = require("express");
const express = require("express");
const router = express.Router();

const BaseMsg = require("../classes/baseMsg");
const usersModule = require("../models/usersModel");
const productsModel = require("../models/productsModel");
const userValidation = require("../validation/userValidation");
const { emit } = require("nodemon");
const { default: axios } = require("axios");
const { object } = require("joi");

router.get("/", async (req, res) => {
  try {
    const allUsers = await usersModule.getAllUsers();
    res.json(allUsers);
  } catch (err) {
    console.log("erre", err);
    res.json(err);
  }
});

router.put("/editUser", async (req, res) => {
  try {
    const id = req.query.id;
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const email = req.query.email;
    const isAdmin = req.query.isAdmin;

    const validateData = await userValidation.validateEditUserSchema({
      firstName,
      lastName,
      email,
      isAdmin,
    });

    if (validateData) {
      const dataToEdit = await usersModule.editUser(
        id,
        firstName,
        lastName,
        email,
        isAdmin
      );

      res.json(new BaseMsg(BaseMsg.STATUSES.Success, "user upDated"));
    }
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});

router.put("/addIdOfPruductByUserCreator", async (rea, res) => {
  try {
    console.log("hahha");
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.delete("/removeUser", async (req, res) => {
  try {
    const id = req.query.id;

    const userToRemove = await usersModule.deleteUser(id);
    if (userToRemove) {
      res.json(new BaseMsg(BaseMsg.STATUSES.Success, "users removed"));
    } else {
      res.json(new BaseMsg(BaseMsg.STATUSES.Failed, "didnt find id "));
    }
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});

router.delete("/removeUserByMail", async (req, res) => {
  try {
    const email = req.query.email;
    const findIdOfEmail = await usersModule.selectUserByMail(email);

    if (findIdOfEmail) {
      const id = findIdOfEmail[0]._id;
      const userToRemove = await usersModule.deleteUser(id);
      if (userToRemove) {
        res.json(new BaseMsg(BaseMsg.STATUSES.Success, "users removed"));
      } else {
        res.json(new BaseMsg(BaseMsg.STATUSES.Failed, "didnt find id "));
      }
    }
  } catch (err) {
    console.log("err", err);
  }
});

router.get("/showLikedProductsByUser", async (req, res) => {
  try {
    const loggedInUser = req.query.email;
    const likedProducts = await usersModule.selectUserByMail(loggedInUser);
    const arrOfLikedProducts = likedProducts[0].likedProducts;
    res.json(arrOfLikedProducts.map((arr) => arr.productId));
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});
router.get("/getLikedProductsArrByUser", async (req, res) => {
  try {
    const email = req.query.email;
    const user = await usersModule.selectUserByMail(email);
    const likeIdsArrByUser = user[0].likedProducts;
    console.log("likeIdsArrByUser", likeIdsArrByUser);
    if (likeIdsArrByUser) {
      const getLIkeProductsById = await productsModel.getProductsByArrOfId(
        likeIdsArrByUser
      );

      let IdToGet = [];

      for (let i = 0; i < getLIkeProductsById.length; i++) {
        for (let x = 0; x < likeIdsArrByUser.length; x++) {
          if (getLIkeProductsById[i]._id == likeIdsArrByUser[x]) {
            console.log("getLIkeProductsById[i", getLIkeProductsById[i]);
            IdToGet.push(getLIkeProductsById[i]);
          }
        }
      }
      res.json(IdToGet);
    }
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});

module.exports = router;
