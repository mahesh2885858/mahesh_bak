import express from "express";
import checkAdmin from "../middlewares/checkAdmin.js";
import adminController from "../controllers/adminController.js";
const router = express.Router();

router.post("/additem", adminController.additem);
router.post("/deleteitem", adminController.deleteItem);
router.post("/addadmin", adminController.addAmin);
router.post("/adminlogin", adminController.adminLogin);
router.get("/adminretain", checkAdmin, adminController.retainAdminLogin);
router.get("/adminlogout", adminController.adminLogout);
router.get("/getallorders", adminController.getAllOrders);
router.get("/deliverorder", adminController.deliverOrder);
export default router;
