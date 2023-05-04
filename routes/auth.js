const express = require("express");
const router = express.Router();

const BaseMsg = require("../classes/baseMsg");

const usersModule = require("../models/usersModel");
const userValidation = require("../validation/userValidation");
const bcrypt = require("../config/bcrypt");
const jwt = require("../config/jwt");

router.post("/signUp", async (req, res) => {
  try {
    const validateValue = await userValidation.validateSignUpSchema(req.body);
    const userData = await usersModule.selectUserByMail(validateValue.email);
    if (userData.length > 0) {
      throw new BaseMsg(BaseMsg.STATUSES.Failed, "email already exist");
    }

    const hashedPassword = await bcrypt.createHash(validateValue.password);

    const user = await usersModule.insertsUser(
      validateValue.firstName,
      validateValue.lastName,
      validateValue.email,
      hashedPassword,
      validateValue.isAdmin
    );

    if (user) {
      const getToken = await jwt.createToken(validateValue.email);
    }

    res.json(new BaseMsg(BaseMsg.STATUSES.Success, "new user created"));
  } catch (err) {
    console.log("err", err);
    res.json(err);
  }
});

router.post("/login", async (req, res) => {
  // console.log("error in the server");

  try {
    // const reqBody = req.body;
    const validateValue = await userValidation.validateLoginSchema(req.body);
    // if (reqBody) {
    if (validateValue) {
      const userData = await usersModule.selectUserByMail(req.body.email);
      if (userData <= 0) {
        throw new BaseMsg(BaseMsg.STATUSES.Failed, "email or password invalid");
      }

      const hashedPassword = userData[0].password;

      const compareHash = await bcrypt.compareHash(
        req.body.password,
        hashedPassword
      );
      const email = req.body.email;

      if (compareHash) {
        const getToken = await jwt.createToken(email);
        const admin = userData[0].isAdmin;
        // console.log("userData", userData[0].isAdmin);

        res.json(new BaseMsg(BaseMsg.STATUSES.Success, getToken, admin));
      }
      // if (compareHash) {
      //   const getToken = await jwt.createToken(email);

      //   res.json(new BaseMsg(BaseMsg.STATUSES.Success, getToken));
      // }
      if (!compareHash) {
        throw new BaseMsg(BaseMsg.STATUSES.Failed, "email or password invalid");
      }
    } else {
      throw new BaseMsg(BaseMsg.STATUSES.Failed, "email or password invalid");
    }
  } catch (err) {
    ////////////////////////
    //befor valifate value
    // try {
    //   const validateValue = await userValidation.validateLoginSchema(req.body);
    //   if (validateValue) {
    //   }
    //   const userEmail = await usersModule.selectUserByMail(req.body.email);

    //   if (userEmail.length <= 0) {
    //     throw new BaseMsg(BaseMsg.STATUSES.Failed, "email or password invalid");
    //   }

    //   const hashedPassword = userEmail[0].password;

    //   const compareHash = await bcrypt.compareHash(
    //     req.body.password,
    //     hashedPassword
    //   );
    //   const email = req.body.email;
    //   if (compareHash) {
    //     const getToken = await jwt.createToken(email);

    //     // res.json({ token: getToken });
    //     res.json(new BaseMsg(BaseMsg.STATUSES.Success, getToken));
    //   } else {
    //     throw new BaseMsg(BaseMsg.STATUSES.Failed, "email or password invalid");
    //   }
    // }

    console.log("err", err);
    res.json(err);
  }
});

module.exports = router;
