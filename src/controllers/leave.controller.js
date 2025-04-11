const catchAsync = require("../utils/catchAsync");
const { LeaveService } = require("../services");
const HttpResponse = require("../utils/modules/Response/HttpResponse");
const BadRequest = require("../utils/modules/Errors/BadRequest");
const NotFound = require("../utils/modules/Errors/NotFound");
const InternalServerError = require("../utils/modules/Errors/InternalServer");
const { getToken, debugLog1, debugLog2 } = require("../utils/commonFunctions");

class LeaveController {
  static async getAllLeavesOfUser(req, res) {
    debugLog1("In function LeaveController.getAllLeavesOfUser");

    const tokenData = req.tokenData;
    debugLog2("tokenData ===> ", tokenData);

    const allLeaves = await LeaveService.getAllLeavesOfUser(tokenData.id);
    debugLog2("allLeaves ===> ", allLeaves);

    if (allLeaves?.length > 0) {
      res.json(HttpResponse.get(allLeaves));
    } else {
      res.json(new NotFound("Leaves could not be found"));
    }
  }

  static async getUsersUnapprovedLeaves(req, res) {
    debugLog1("In function LeaveController.getUsersUnapprovedLeaves");

    const tokenData = req.tokenData;
    debugLog2("tokenData ===> ", tokenData);

    const leaves = await LeaveService.getUsersUnapprovedLeaves(tokenData.id);
    debugLog2("leaves ===> ", leaves);

    res.json(HttpResponse.get(leaves));
  }

  static async getUsersApprovedLeaves(req, res) {
    debugLog1("In function LeaveController.getUsersApprovedLeaves");

    const tokenData = req.tokenData;
    debugLog2("tokenData ===> ", tokenData);

    const queryParams = req.query;
    debugLog2("queryParams ===> ", queryParams);

    const { start_date, end_date } = queryParams;

    const leaves = await LeaveService.getUsersApprovedLeaves(
      tokenData.id,
      start_date,
      end_date
    );
    debugLog2("leaves ===> ", leaves);

    res.json(HttpResponse.get(leaves));
  }

  static async getAllOnLeaceUsers(req, res) {
    debugLog1("In function LeaveController.getAllOnLeaceUsers");

    const tokenData = req.tokenData;
    debugLog2("tokenData ===> ", tokenData);

    const users = await LeaveService.getAllOnLeaveUsers();
    debugLog2("users ===> ", users);

    res.json(HttpResponse.get(users));
  }

  static async applyForLeave(req, res) {
    debugLog1("In function LeaveController.applyForLeave");

    const tokenData = req.tokenData;
    debugLog2("tokenData ===> ", tokenData);

    const bodyParams = req.body;
    debugLog2("bodyParams ===> ", bodyParams);

    const { start_date, end_date } = bodyParams;

    const leave = await LeaveService.applyForLeave(
      tokenData.id,
      start_date,
      end_date
    );
    debugLog2("leave ===> ", leave);

    res.json(HttpResponse.created(leave));
  }

  static async deleteAppliedLeave(req, res) {
    debugLog1("In function LeaveController.deleteAppliedLeave");

    const tokenData = req.tokenData;
    debugLog2("tokenData ===> ", tokenData);

    const bodyParams = req.body;
    debugLog2("bodyParams ===> ", bodyParams);

    const { leaveId } = bodyParams;

    const result = await LeaveService.deleteAppliedLeave(leaveId);
    debugLog2("deleted result ===> ", result);

    res.json(HttpResponse.deleted(result));
  }

  static async updateAppliedLeave(req, res) {
    debugLog1("In function LeaveController.updateAppliedLeave");

    const tokenData = req.tokenData;
    debugLog2("tokenData ===> ", tokenData);

    const bodyParams = req.body;
    debugLog2("bodyParams ===> ", bodyParams);

    const { leaveId, approval } = bodyParams;

    const role = tokenData.role;

    const updated = await LeaveService.updateLeaveApproval(
      leaveId,
      role,
      approval
    );
    debugLog2("updated leave ===> ", updated);

    res.json(HttpResponse.updated(updated));
  }
}

module.exports = LeaveController;
