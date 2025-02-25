const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService } = require("../services");
const HttpResponse = require("../utils/modules/Response/HttpResponse");
const BadRequest = require("../utils/modules/Errors/BadRequest");
const NotFound = require("../utils/modules/Errors/NotFound");
const InternalServerError = require("../utils/modules/Errors/InternalServer");
const { getToken, debugLog1, debugLog2 } = require("../utils/commonFunctions");
const UserService = require("../services/user.service.js");

class UserController {
  static async getUsers(req, res) {
    debugLog1("In function UserController.getUsers");

    const allUsers = await UserService.getAllUsers();

    debugLog2("allUsers ===> ", allUsers);

    if (allUsers && allUsers.length > 0) {
      const httpResponse = HttpResponse.get(allUsers);
      res.json(httpResponse);
    } else {
      res.json(new NotFound("Users could not be found"));
    }
  }
  static async addUser(req, res) {
    debugLog1("In function UserController.addUser");

    const bodyParams = req.body;
    // debugLog2("bodyParams ===> ", bodyParams);
    const tokenData = req.tokenData;
    // debugLog2("tokenData ===> ", tokenData);

    const data = {
      question: bodyParams.question,
      answer: bodyParams.answer,
    };
    const newUser = await UserService.createUser(data);

    if (newUser) {
      const httpResponse = HttpResponse.created(newUser);
      res.json(httpResponse);
    } else {
      res.json(new BadRequest("User with same details already exists"));
    }
  }
}
module.exports = UserController;
