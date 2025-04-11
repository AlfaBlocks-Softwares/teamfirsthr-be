const express = require("express");
const LeaveController = require("../../controllers/leave.controller.js");
const catchAsync = require("../../utils/catchAsync");
const { accessTokenAuth } = require("../../middlewares/auth");

const router = express.Router();

router.get(
  "/",
  accessTokenAuth,
  catchAsync(LeaveController.getAllLeavesOfUser)
);

router.get(
  "/latest",
  accessTokenAuth,
  catchAsync(LeaveController.getUsersUnapprovedLeaves)
);

router.get(
  "/date",
  accessTokenAuth,
  catchAsync(LeaveController.getUsersApprovedLeaves)
);

router.get(
  "/on-leave",
  accessTokenAuth,
  catchAsync(LeaveController.getAllOnLeaceUsers)
);

router.post(
  "/check-in",
  accessTokenAuth,
  catchAsync(LeaveController.applyForLeave)
);

router.delete(
  "/",
  accessTokenAuth,
  catchAsync(LeaveController.deleteAppliedLeave)
);

router.put(
  "/manager-approval",
  accessTokenAuth,
  catchAsync(LeaveController.updateAppliedLeave)
);

router.put(
  "/hr-approval",
  accessTokenAuth,
  catchAsync(LeaveController.updateAppliedLeave)
);

module.exports = router;
