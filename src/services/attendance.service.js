const httpStatus = require("http-status");
const { AttendanceModel } = require("../models");
const ApiError = require("../utils/ApiError");
const { debugLog1 } = require("../utils/commonFunctions");

const getAllAttendancesOfUser = async (userId) => {
  debugLog1("In function AttendanceService.getAllAttendancesOfUser");

  return await AttendanceModel.find({ user: userId });
};

const getUsersLatestAttendance = async (userId) => {
  debugLog1("In function AttendanceService.getUsersLatestAttendance");

  return await AttendanceModel.findOne({ user: userId }).sort({
    createdAt: -1,
  });
};

const getAllAttendancesOfDate = async (date) => {
  debugLog1("In function AttendanceService.getAllAttendancesOfDate");

  return await AttendanceModel.find({ check_in: date });
};

const getAllCheckedInUsersAttendance = async () => {
  debugLog1("In function AttendanceService.getAllCheckedInUsersAttendance");

  return await Attendance.find({ check_out: { $exists: false } });
};

const getAllCheckedOutUsersAttendance = async () => {
  debugLog1("In function AttendanceService.getAllCheckedOutUsersAttendance");

  return await Attendance.find({ check_out: { $exists: true } });
};

const markCheckIntByUserId = async (userId) => {
  debugLog1("In function AttendanceService.markCheckIntByUserId");
  return await AttendanceModel.create({ user: userId, check_in: new Date() });
};

const markCheckOutByUserId = async (userId) => {
  debugLog1("In function AttendanceService.markCheckOutByUserId");
  return await AttendanceModel.findOneAndUpdate(
    { user: userId, check_out: { $exists: false } },
    { check_out: new Date() },
    { upsert: true, new: true }
  );
};

module.exports = {
  getAllAttendancesOfUser,
  getUsersLatestAttendance,
  getAllAttendancesOfDate,
  getAllCheckedInUsersAttendance,
  getAllCheckedOutUsersAttendance,
  markCheckIntByUserId,
  markCheckOutByUserId,
};
