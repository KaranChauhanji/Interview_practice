const express = require("express");
const userRegister = require("../controllers/UserReq/register.controller");
const login = require("../controllers/UserReq/login.controller");
const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", login );

module.exports = userRouter;
