const express = require("express");
const routers = express.Router();
const userController = require("../Controllers/userController");

const jwtVerify = require("./../Middleware/JWTVerify");

routers.post("/login", userController.login);

module.exports = routers;
