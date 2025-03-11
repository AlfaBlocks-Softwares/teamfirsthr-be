const httpStatus = require("http-status");
const { UserModel } = require("../models");
const ApiError = require("../utils/ApiError");
const { debugLog1 } = require("../utils/commonFunctions");

const getUserByEmail = async (email) => {
  debugLog1("In function UserService.getUserByEmail");
  return await UserModel.findOne({ email });
};

const getAllUsers = async () => {
  debugLog1("In function UserService.getAllUsers");
  return await UserModel.find({ is_active: true }).select("-hashed_password");
};

const getUserById = async (userId) => {
  debugLog1("In function UserService.getUserById");
  return await UserModel.findById(userId).select("-hashed_password");
};

const getUsersByManagerId = async (managerId) => {
  debugLog1("In function UserService.getUsersByManagerId");
  return await UserModel.find({ manager: managerId }).select(
    "-hashed_password"
  );
};

const getAllUsersOfRole = async (role) => {
  debugLog1("In function UserService.getAllUsersOfRole");
  return await UserModel.find({ role }).select("-hashed_password");
};

const getAllUsersOfDepartment = async (department) => {
  debugLog1("In function UserService.getAllUsersOfDepartment");
  return await UserModel.find({ department }).select("-hashed_password");
};

const updateUserById = async (userId, updateData) => {
  debugLog1("In function UserService.updateUserById");
  return await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
};

const updateUserByEmail = async (email, updateData) => {
  debugLog1("In function UserService.updateUserByEmail");
  return await UserModel.findOneAndUpdate({ email }, updateData, { new: true });
};

const updateUsersByManagerId = async (managerId, updateData) => {
  debugLog1("In function UserService.updateUsersByManagerId");
  return await UserModel.updateMany({ manager: managerId }, updateData);
};

const updateUsersByRole = async (role, updateData) => {
  debugLog1("In function UserService.updateUsersByRole");
  return await UserModel.updateMany({ role }, updateData);
};

const updateUsersByDepartment = async (department, updateData) => {
  debugLog1("In function UserService.updateUsersByDepartment");
  return await UserModel.updateMany({ department }, updateData);
};

const deactivateUserById = async (userId) => {
  debugLog1("In function UserService.deactivateUserById");
  return await UserModel.findByIdAndUpdate(
    userId,
    { is_active: false },
    { new: true }
  );
};

const activateUserById = async (userId) => {
  debugLog1("In function UserService.activateUserById");
  return await UserModel.findByIdAndUpdate(
    userId,
    { is_active: true },
    { new: true }
  );
};

const createUser = async (data) => {
  debugLog1("In function UserService.createUser");
  return await UserModel.create(data);
};

const deleteUserById = async (userId) => {
  debugLog1("In function UserService.deleteUserById");
  return await UserModel.findByIdAndDelete(userId);
};

const deleteUserByEmail = async (email) => {
  debugLog1("In function UserService.deleteUserByEmail");
  return await UserModel.findOneAndDelete({ email });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUsersByManagerId,
  getAllUsersOfRole,
  getAllUsersOfDepartment,
  updateUserById,
  updateUserByEmail,
  updateUsersByManagerId,
  updateUsersByRole,
  updateUsersByDepartment,
  deactivateUserById,
  activateUserById,
  deleteUserById,
  deleteUserByEmail,
};
