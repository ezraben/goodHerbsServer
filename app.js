const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

// const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/auth");

const app = express();

const apiRouter = require("./routes/api");
// const authRouter = require("./routes/auth");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// app.use("/", indexRouter);
// app.use("/", indexRouter);
// app.use("/auth", authRouter);
app.use("/api", apiRouter);

module.exports = app;
