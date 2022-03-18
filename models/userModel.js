import mongoose from "mongoose";
import { reqNum, reqString } from "./menuItemModel.js   ";
const orderItemScheema = {
  itemName: reqString,
  unitPrice: reqNum,
  quantity: reqNum,
};
const orderScheema = new mongoose.Schema({
  items: [orderItemScheema],
  isDelivered: { ...reqString, default: false, type: Boolean },
  isCancelled: { ...reqString, default: false, type: Boolean },
});
const userScheema = new mongoose.Schema({
  username: reqString,
  email: reqString,
  password: reqString,
  orders: [orderScheema],
});
const userModel = mongoose.model("user", userScheema);
export default userModel;
