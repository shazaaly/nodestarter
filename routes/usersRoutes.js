const express = require("express");
/* user express Routers : */
const router = express.Router();


const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 200,
    data: {
      users,
    },
  });
};

const getUser = (req, res) => {
  console.log("get user by id");
};

const createUser = (req, res) => {
  res.status(200).json({
    status: 200,
    data: {
      _id: "124578HandMade",
      name: "Shaza Ali",
      email: "admin@test.io",
    },
  });
};

const updateUser = (req, res) => {
  console.log("update user");
};

const deleteUser = (req, res) => {
  console.log("delete user");
};

// USER ROUTES :
router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports =router