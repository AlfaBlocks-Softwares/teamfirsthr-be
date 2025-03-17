const catchAsync = require("../utils/catchAsync");
const { AttendanceService } = require("../services");
const HttpResponse = require("../utils/modules/Response/HttpResponse");
const BadRequest = require("../utils/modules/Errors/BadRequest");
const NotFound = require("../utils/modules/Errors/NotFound");
const InternalServerError = require("../utils/modules/Errors/InternalServer");
const { getToken, debugLog1, debugLog2 } = require("../utils/commonFunctions");

class AttendanceController {
  static async getAllAttendancesOfUser(req, res) {
    debugLog1("In function AttendanceController.getAllAttendancesOfUser");

    const tokenData = req.tokenData;
    debugLog2("tokenData ===> ", tokenData);

    let userId = tokenData.id;

    const allAttendances = await AttendanceService.getAllAttendancesOfUser(
      userId
    );
    debugLog2("allAttendances ===> ", allAttendances);

    if (allAttendances && allAttendances.length > 0) {
      res.json(HttpResponse.get(allAttendances));
    } else {
      res.json(new NotFound("Attendances could not be found"));
    }
  }

  static async getUsersLatestAttendance(req, res) {
    debugLog1("In function AttendanceController.getUsersLatestAttendance");

    const tokenData = req.tokenData;
    debugLog2("tokenData ===> ", tokenData);

    let userId = tokenData.id;

    const latestAttendance = await AttendanceService.getUsersLatestAttendance(
      userId
    );
    debugLog2("latestAttendance ===> ", latestAttendance);

    if (latestAttendance) {
      res.json(HttpResponse.get(latestAttendance));
    } else {
      res.json(new NotFound("No recent attendance found"));
    }
  }

  static async getAllAttendancesOfDate(req, res) {
    debugLog1("In function AttendanceController.getAllAttendancesOfDate");

    const { date } = req.query;
    debugLog2("Query date ===> ", date);

    if (!date) {
      return res.json(new BadRequest("Date is required"));
    }

    const allAttendances = await AttendanceService.getAllAttendancesOfDate(
      new Date(date)
    );
    debugLog2("allAttendances ===> ", allAttendances);

    if (allAttendances.length > 0) {
      res.json(HttpResponse.get(allAttendances));
    } else {
      res.json(new NotFound("No attendance records found for this date"));
    }
  }

  static async getAllCheckedInUsersAttendance(req, res) {
    debugLog1(
      "In function AttendanceController.getAllCheckedInUsersAttendance"
    );

    const checkedInUsers =
      await AttendanceService.getAllCheckedInUsersAttendance();
    debugLog2("checkedInUsers ===> ", checkedInUsers);

    if (checkedInUsers.length > 0) {
      res.json(HttpResponse.get(checkedInUsers));
    } else {
      res.json(new NotFound("No currently checked-in users found"));
    }
  }

  static async getAllCheckedOutUsersAttendance(req, res) {
    debugLog1(
      "In function AttendanceController.getAllCheckedOutUsersAttendance"
    );

    const checkedOutUsers =
      await AttendanceService.getAllCheckedOutUsersAttendance();
    debugLog2("checkedOutUsers ===> ", checkedOutUsers);

    if (checkedOutUsers.length > 0) {
      res.json(HttpResponse.get(checkedOutUsers));
    } else {
      res.json(new NotFound("No checked-out users found"));
    }
  }

  static async markCheckIn(req, res) {
    debugLog1("In function AttendanceController.markCheckIn");

    const tokenData = req.tokenData;
    debugLog2("tokenData ===> ", tokenData);

    let userId = tokenData.id;

    const newAttendance = await AttendanceService.markCheckIntByUserId(userId);
    debugLog2("newAttendance ===> ", newAttendance);

    if (newAttendance) {
      res.json(HttpResponse.created(newAttendance));
    } else {
      res.json(new BadRequest("Failed to check in"));
    }
  }

  static async markCheckOut(req, res) {
    debugLog1("In function AttendanceController.markCheckOut");

    const tokenData = req.tokenData;
    debugLog2("tokenData ===> ", tokenData);

    let userId = tokenData.id;

    const updatedAttendance = await AttendanceService.markCheckOutByUserId(
      userId
    );
    debugLog2("updatedAttendance ===> ", updatedAttendance);

    if (updatedAttendance) {
      res.json(HttpResponse.updated(updatedAttendance));
    } else {
      res.json(new BadRequest("Failed to check out"));
    }
  }
}

module.exports = AttendanceController;
