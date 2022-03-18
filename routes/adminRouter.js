import express from "express";
import adminController from "../controllers/adminController.js";
const router = express.Router();

router.post("/additem", adminController.additem);
router.post("/deleteitem", adminController.deleteItem);

export default router;
