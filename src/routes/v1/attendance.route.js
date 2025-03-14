const express = require("express");
const AttendanceController = require("../../controllers/attendance.controller");
const catchAsync = require("../../utils/catchAsync");

const router = express.Router();

// Fetch all attendances of the logged-in user
router.get("/", catchAsync(AttendanceController.getAllAttendancesOfUser));

// Fetch the latest attendance record of the logged-in user
router.get(
  "/latest",
  catchAsync(AttendanceController.getUsersLatestAttendance)
);

// Fetch all attendances of a specific date (requires date query param)
router.get("/date", catchAsync(AttendanceController.getAllAttendancesOfDate));

// Fetch all users currently checked in
router.get(
  "/checked-in",
  catchAsync(AttendanceController.getAllCheckedInUsersAttendance)
);

// Fetch all users who have checked out
router.get(
  "/checked-out",
  catchAsync(AttendanceController.getAllCheckedOutUsersAttendance)
);

// Mark check-in for the logged-in user
router.post("/check-in", catchAsync(AttendanceController.markCheckIn));

// Mark check-out for the logged-in user
router.post("/check-out", catchAsync(AttendanceController.markCheckOut));

module.exports = router;
