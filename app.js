const { json } = require("express");
const express = require("express");
const app = express();

const fs = require("fs");
const morgan = require("morgan");

const toursRouter = require("./routes/touresRoutes");
const userRouter = require("./routes/usersRoutes");

//MIDDLEWARES:
if (process.env.NODE.ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
);

// make a middleware that manipulates the req obj//
app.use((req, res, next) => {
  req.reqTime = new Date().toISOString();
  next();
});

// 1- req send in postman =>   2- middleware will be excuted
app.use((req, res, next) => {
  // console.log("Hello from a middleware" + "😻");
  next();
});

/* add router as a middleware on associated route */
app.use("/api/v1/tours", toursRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
