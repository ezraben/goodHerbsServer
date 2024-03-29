const express = require("express");
const router = express.Router();

const auth = require("./auth");
const products = require("./products");
const users = require("./users");

router.use("/auth", auth);
router.use("/products", products);
router.use("/users", users);

module.exports = router;
