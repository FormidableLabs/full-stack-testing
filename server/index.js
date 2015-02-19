/**
 * Express web server.
 */
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

app.use("/", express.static("app/public"));
app.use("/app/js-dist", express.static("app/js-dist"));
app.use("/node_modules", express.static("node_modules"));
app.use(bodyParser());

app.listen(PORT);
