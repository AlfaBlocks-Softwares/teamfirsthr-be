const express = require("express");
const UserController = require("../../controllers/user.controller.js");
const catchAsync = require("../../utils/catchAsync");

const router = express.Router();

router.get("/", catchAsync(UserController.getUsers));
router.post("/", catchAsync(UserController.addUser));

module.exports = router;
