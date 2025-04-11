const httpStatus = require("http-status");
const { LeaveModel } = require("../models");
const ApiError = require("../utils/ApiError");
const { debugLog1 } = require("../utils/commonFunctions");

const getAllLeavesOfUser = async (userId) => {
  debugLog1("In function LeaveService.getAllLeavesOfUser");
  return await LeaveModel.find({ user: userId });
};

const getUsersUnapprovedLeaves = async (userId) => {
  debugLog1("In function LeaveService.getUsersUnapprovedLeaves");
  return await LeaveModel.find({
    user: userId,
    manager_approval: false,
    hr_approval: false,
  }).sort({ createdAt: -1 });
};

const getUsersApprovedLeaves = async (userId, startDate, endDate) => {
  debugLog1("In function LeaveService.getUsersApprovedLeaves");
  return await LeaveModel.find({
    user: userId,
    manager_approval: true,
    hr_approval: true,
    start_date: { $gte: new Date(startDate) },
    end_date: { $lte: new Date(endDate) },
  });
};

const getAllOnLeaveUsers = async () => {
  debugLog1("In function LeaveService.getAllOnLeaveUsers");
  const now = new Date();
  return await LeaveModel.find({
    start_date: { $lte: now },
    end_date: { $gte: now },
    manager_approval: true,
    hr_approval: true,
  }).populate("user");
};

const applyForLeave = async (userId, start_date, end_date) => {
  debugLog1("In function LeaveService.applyForLeave");
  return await LeaveModel.create({
    user: userId,
    start_date,
    end_date,
    manager_approval: false,
    hr_approval: false,
  });
};

const deleteAppliedLeave = async (leaveId) => {
  debugLog1("In function LeaveService.deleteAppliedLeave");
  return await LeaveModel.findByIdAndDelete(leaveId);
};

const updateLeaveApproval = async (leaveId, role, approval) => {
  debugLog1("In function LeaveService.updateLeaveApproval");
  const update =
    role === "manager"
      ? { manager_approval: approval }
      : { hr_approval: approval };

  return await LeaveModel.findByIdAndUpdate(leaveId, update, { new: true });
};

module.exports = {
  getAllLeavesOfUser,
  getUsersUnapprovedLeaves,
  getUsersApprovedLeaves,
  getAllOnLeaveUsers,
  applyForLeave,
  deleteAppliedLeave,
  updateLeaveApproval,
};
