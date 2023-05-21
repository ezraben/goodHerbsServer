const e = require("express");
const express = require("express");
const router = express.Router();

const BaseMsg = require("../classes/baseMsg");
const usersModule = require("../models/usersModel");
const productsModel = require("../models/productsModel");
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

/////////////////////////////////
//working but before adding admi in ui
// router.put("/editUser", async (req, res) => {
//   try {
//     const id = req.query.id;
//     const firstName = req.query.firstName;
//     const lastName = req.query.lastName;
//     const email = req.query.email;
//     // const password = req.query.password;

//     const validateData = await userValidation.validateEditUserSchema({
//       firstName,
//       lastName,
//       email,
//       // password,
//     });

//     if (validateData) {
//       const dataToEdit = await usersModule.editUser(
//         id,
//         firstName,
//         lastName,
//         email
//       );

//       res.json(new BaseMsg(BaseMsg.STATUSES.Success, "user upDated"));
//     }
//   } catch (err) {
//     console.log("err", err);
//     res.json(err);
//   }
// });

/////////////////////////////////
//until here working but before adding admi in ui

router.put("/addIdOfPruductByUserCreator", async (rea, res) => {
  try {
    console.log("hahha");
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

////////////////////////////
//befor adding delete all pruduct of user when delet user
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
    //////////////////////////////////
    //before changing function to delete by id not by mail
    // try {
    //   const email = req.query.email;
    //   const findIdOfEmail = await usersModule.selectUserByMail(email);

    //   if (findIdOfEmail) {
    //     const id = findIdOfEmail[0]._id;
    //     const userToRemove = await usersModule.deleteUser(id);
    //     if (userToRemove) {
    //       res.json(new BaseMsg(BaseMsg.STATUSES.Success, "users removed"));
    //     } else {
    //       res.json(new BaseMsg(BaseMsg.STATUSES.Failed, "didnt find id "));
    //     }
    //   }
    // }
    //////////////////////////////////
    // until here before changing function to delete by id not by mail
    console.log("err", err);
    res.json(err);
  }
});
/////////////////////////////////
//until here  befor adding delete all pruduct of user when delet user

module.exports = router;
