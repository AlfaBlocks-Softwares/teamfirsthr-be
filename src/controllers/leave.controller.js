const catchAsync = require("../utils/catchAsync");
const { LeaveService } = require("../services");
const HttpResponse = require("../utils/modules/Response/HttpResponse");
const BadRequest = require("../utils/modules/Errors/BadRequest");
const NotFound = require("../utils/modules/Errors/NotFound");
const InternalServerError = require("../utils/modules/Errors/InternalServer");
const { getToken, debugLog1, debugLog2 } = require("../utils/commonFunctions");

class LeaveController {
  static async getAllLeavesOfUser(req, res) {
    const userId = req.tokenData.id;
    const leaves = await LeaveService.getAllLeavesOfUser(userId);
    if (leaves.length) return res.json(HttpResponse.get(leaves));
    return res.json(new NotFound("Leaves could not be found"));
  }

  static async getUsersUnapprovedLeaves(req, res) {
    const userId = req.tokenData.id;
    const leaves = await LeaveService.getUsersUnapprovedLeaves(userId);
    return res.json(HttpResponse.get(leaves));
  }

  static async getUsersApprovedLeaves(req, res) {
    const userId = req.tokenData.id;
    const { start_date, end_date } = req.query;
    const leaves = await LeaveService.getUsersApprovedLeaves(
      userId,
      start_date,
      end_date
    );
    return res.json(HttpResponse.get(leaves));
  }

  static async getAllOnLeaceUsers(req, res) {
    const users = await LeaveService.getAllOnLeaveUsers();
    return res.json(HttpResponse.get(users));
  }

  static async applyForLeave(req, res) {
    const userId = req.tokenData.id;
    const { start_date, end_date } = req.body;
    const leave = await LeaveService.applyForLeave(
      userId,
      start_date,
      end_date
    );
    return res.json(HttpResponse.created(leave));
  }

  static async deleteAppliedLeave(req, res) {
    const { leaveId } = req.body;
    const result = await LeaveService.deleteAppliedLeave(leaveId);
    return res.json(HttpResponse.deleted(result));
  }

  static async updateAppliedLeave(req, res) {
    const { leaveId, role, approval } = req.body;
    const updated = await LeaveService.updateLeaveApproval(
      leaveId,
      role,
      approval
    );
    return res.json(HttpResponse.get(updated));
  }
}

module.exports = LeaveController;
