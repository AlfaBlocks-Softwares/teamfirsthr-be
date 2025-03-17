const express = require("express");
const AttendanceController = require("../../controllers/attendance.controller");
const catchAsync = require("../../utils/catchAsync");
const { accessTokenAuth } = require("../../middlewares/auth");

const router = express.Router();

// Fetch all attendances of the logged-in user
router.get(
  "/",
  accessTokenAuth,
  catchAsync(AttendanceController.getAllAttendancesOfUser)
);

// Fetch the latest attendance record of the logged-in user
router.get(
  "/latest",
  accessTokenAuth,
  catchAsync(AttendanceController.getUsersLatestAttendance)
);

// Fetch all attendances of a specific date (requires date query param)
router.get(
  "/date",
  accessTokenAuth,
  catchAsync(AttendanceController.getAllAttendancesOfDate)
);

// Fetch all users currently checked in
router.get(
  "/checked-in",
  accessTokenAuth,
  catchAsync(AttendanceController.getAllCheckedInUsersAttendance)
);

// Fetch all users who have checked out
router.get(
  "/checked-out",
  accessTokenAuth,
  catchAsync(AttendanceController.getAllCheckedOutUsersAttendance)
);

// Mark check-in for the logged-in user
router.post(
  "/check-in",
  accessTokenAuth,
  catchAsync(AttendanceController.markCheckIn)
);

// Mark check-out for the logged-in user
router.post(
  "/check-out",
  accessTokenAuth,
  catchAsync(AttendanceController.markCheckOut)
);

module.exports = router;
