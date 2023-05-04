const e = require("express");
const express = require("express");
const router = express.Router();

const BaseMsg = require("../classes/baseMsg");
const usersModule = require("../models/usersModel");
const userValidation = require("../validation/userValidation");

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
    const password = req.query.password;

    const validateData = await userValidation.validateSignUpSchema({
      firstName,
      lastName,
      email,
      password,
    });

    if (validateData) {
      const dataToEdit = await usersModule.editUser(
        id,
        firstName,
        lastName,
        email
      );

      res.json(new BaseMsg(BaseMsg.STATUSES.Success, "user upDated"));
    }
  } catch (err) {
    console.log("err", err);
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

module.exports = router;
