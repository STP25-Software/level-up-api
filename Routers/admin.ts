import { Router } from "express";
import { adminController } from "../controllers/adminContoller";
export const adminRouter = Router();

adminRouter.get(
  "/get",
  adminController.loginAdmin,
  adminController.get
);
adminRouter.get(
  "/getbyid/:index",
  adminController.loginAdmin,
  adminController.getbyid
);
adminRouter.delete(
  "/delete/:index",
  adminController.loginAdmin,
  adminController.deleteRegister
);
