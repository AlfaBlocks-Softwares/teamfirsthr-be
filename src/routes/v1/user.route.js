const express = require("express");
const UserController = require("../../controllers/user.controller.js");
const catchAsync = require("../../utils/catchAsync");
const { accessTokenAuth } = require("../../middlewares/auth");

const router = express.Router();

router.post("/login", catchAsync(UserController.login));

router.get("/", accessTokenAuth, catchAsync(UserController.getAllUsers));

router.post("/signup", catchAsync(UserController.signUp));

router.post(
  "/add-member",
  accessTokenAuth,
  catchAsync(UserController.addMember)
);

router.put(
  "/set-password",
  accessTokenAuth,
  catchAsync(UserController.setPassword)
);
module.exports = router;
