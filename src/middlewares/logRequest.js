const { debugLog1, debugLog2, debugLog3 } = require("../utils/commonFunctions");

const logRequest = (req, res, next) => {
  console.log(req.method, req.url, req.body);
  next();
};

module.exports = logRequest;
