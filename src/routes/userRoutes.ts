import express from "express"
import {User} from "../model/user"
import * as core from 'express-serve-static-core';
import mongoose from "mongoose";
import UserController from "../controller/userConttoller";

let userRouter:core.Router = express.Router();
/* USER 라우터
-------------------------------------------------------------------------------- */
userRouter.get("/", UserController.all);
userRouter.get("/:userId", UserController.findByUserId);
userRouter.delete("/:userId", UserController.delete);
userRouter.put("/:userId", UserController.update);
userRouter.post("/", UserController.create);

export default userRouter