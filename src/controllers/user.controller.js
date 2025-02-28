const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService } = require("../services");
const HttpResponse = require("../utils/modules/Response/HttpResponse");
const BadRequest = require("../utils/modules/Errors/BadRequest");
const NotFound = require("../utils/modules/Errors/NotFound");
const InternalServerError = require("../utils/modules/Errors/InternalServer");
const {
  getToken,
  debugLog1,
  debugLog2,
  debugLog3,
  removeUndefinedOrNullValues,
} = require("../utils/commonFunctions");
const UserService = require("../services/user.service.js");
const bcrypt = require("bcryptjs");
const { generateAuthTokens } = require("../services/token.service");
const { first } = require("lodash");

class UserController {
  static async login(req, res) {
    debugLog1("In function UserController.login");

    const bodyParams = req.body;

    const data = {
      email: bodyParams.email,
      password: bodyParams.password,
    };
    let user = await UserService.getUserByEmail(data.email);

    if (!user) {
      return res.json(new BadRequest("Incorrect Email or Password"));
    }

    const isMatch = await bcrypt.compare(
      data.password,
      user.hashed_password || ""
    );

    if (isMatch) {
      user.hashed_password = undefined;
      let token = await generateAuthTokens(user);

      debugLog3("token ===> ", token);

      const httpResponse = HttpResponse.get({ ...user.dataValues, token });
      return res.json(httpResponse);
    } else {
      return res.json(new BadRequest("Incorrect Email or Password"));
    }
  }

  static async getUser(req, res) {
    debugLog1("In function UserController.getUser");

    const tokenData = req.tokenData;
    debugLog2("tokenData ===> ", tokenData);

    const user = await UserService.getUserById(tokenData._id);
    if (user) {
      user.hashed_password = undefined;
      const httpResponse = HttpResponse.get(user);
      res.json(httpResponse);
    } else {
      res.json(new NotFound("User could not be found"));
    }
  }

  static async signUp(req, res) {
    debugLog1("In function UserController.signUp");

    const bodyParams = req.body;
    // debugLog2("bodyParams ===> ", bodyParams);

    const data = {
      first_name: bodyParams.first_name,
      last_name: bodyParams.last_name,
      email: bodyParams.email,
      position: bodyParams.position,
      department: bodyParams.department,
      role: bodyParams.role,
      gender: bodyParams.gender,
      marital_status: bodyParams.marital_status,
      date_of_birth: bodyParams.date_of_birth,
      phone_number: bodyParams.phone_number,
      salary: bodyParams.salary,
      address: bodyParams.address,
      profile_picture: bodyParams.profile_picture,
      employment_status: bodyParams.employment_status,
      date_joined: bodyParams.date_joined,
      date_terminated: bodyParams.date_terminated,
      manager: bodyParams.manager,
      emergency_contact: bodyParams.emergency_contact,
    };

    const newUser = await UserService.createUser(data);

    if (newUser) {
      const httpResponse = HttpResponse.created(newUser);
      res.json(httpResponse);
    } else {
      res.json(new BadRequest("User with same details already exists"));
    }
  }

  static async addMember(req, res) {
    debugLog1("In function UserController.addMember");

    const bodyParams = req.body;
    // debugLog2("bodyParams ===> ", bodyParams);

    const tokenData = req.tokenData;
    // debugLog2("tokenData ===> ", tokenData);

    const data = {
      first_name: bodyParams.first_name,
      last_name: bodyParams.last_name,
      email: bodyParams.email,
      position: bodyParams.position,
      department: bodyParams.department,
      role: bodyParams.role,
      gender: bodyParams.gender,
      marital_status: bodyParams.marital_status,
      date_of_birth: bodyParams.date_of_birth,
      phone_number: bodyParams.phone_number,
      salary: bodyParams.salary,
      address: bodyParams.address,
      profile_picture: bodyParams.profile_picture,
      employment_status: bodyParams.employment_status,
      date_joined: bodyParams.date_joined,
      date_terminated: bodyParams.date_terminated,
      manager: bodyParams.manager,
      emergency_contact: bodyParams.emergency_contact,
      company: tokenData.company,
    };

    const newUser = await UserService.createUser(data);

    if (newUser) {
      const httpResponse = HttpResponse.created(newUser);
      res.json(httpResponse);
    } else {
      res.json(new BadRequest("User with same details already exists"));
    }
  }

  static async setPassword(req, res) {
    debugLog1("In function UserController.setPassword");

    const bodyParams = req.body;
    debugLog2("bodyParams ===> ", bodyParams);

    let tokenData = req.tokenData;
    debugLog2("tokenData ===> ", tokenData);

    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds

    let hashedPassword = await bcrypt.hash(bodyParams.password, salt); // Hash the password
    const data = {
      hashed_password: hashedPassword,
    };

    const user = await UserService.updateUserById(tokenData._id, data);
    if (user) {
      user.hashed_password = undefined;
      const httpResponse = HttpResponse.updated(user);
      res.json(httpResponse);
    } else {
      res.json(new BadRequest("User password could not be updated"));
    }
  }
}
module.exports = UserController;
