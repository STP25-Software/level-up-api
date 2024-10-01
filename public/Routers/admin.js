"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const adminContoller_1 = require("../controllers/adminContoller");
exports.adminRouter = (0, express_1.Router)();
exports.adminRouter.get("/", adminContoller_1.adminController.loginAdmin, adminContoller_1.adminController.get);
exports.adminRouter.get("/:index", adminContoller_1.adminController.loginAdmin, adminContoller_1.adminController.getbyid);
exports.adminRouter.delete("/:index", adminContoller_1.adminController.loginAdmin, adminContoller_1.adminController.deleteRegister);
