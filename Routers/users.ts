import {RequestHandler, Router} from 'express';
import {userController} from "../controllers/userController";



export const userRouter = Router();


userRouter.post("/", userController.post);
userRouter.get("/", userController.loginAdmin, userController.get);

userRouter.get("/:index", userController.loginAdmin, userController.getbyid);

userRouter.delete(
  "/:index",
  userController.loginAdmin,
  userController.deleteRegister
);




