import express from "express";
import userController from "../controllers/userController.js";
const router = express.Router();
router.get("/getmenu", userController.getMenu);
router.post("/register", userController.registerUser);
router.post("/login", userController.login);
router.put("/placeorder", userController.placeOrder);
router.put("/cancelorder", userController.cancelOrder);
export default router;
