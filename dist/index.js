"use strict";

var _express = _interopRequireDefault(require("express"));

var _test = _interopRequireDefault(require("./utils/test"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.get("/", function (req, res) {
  res.send({
    hi: "world"
  });
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("App is listening on port: ".concat(PORT));
}); //"build": "npm run clean && babel -d ./dist ./ -s --ignore 'node_modules'",