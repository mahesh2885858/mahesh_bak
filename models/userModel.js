import mongoose from "mongoose";
import { reqNum, reqString } from "./menuItemModel.js   ";
const orderScheema = new mongoose.Schema({
  itemName: reqString,
  unitPrice: reqNum,
  quantity: reqNum,
  isDelivered: { ...reqString, default: false },
  isCancelled: { ...reqString, default: false },
});
const userScheema = new mongoose.Schema({
  username: reqString,
  email: reqString,
  password: reqString,
  orders: [orderScheema],
});
const userModel = mongoose.model("user", userScheema);
export default userModel;
