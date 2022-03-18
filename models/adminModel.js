import mongoose from "mongoose";
import { reqString } from "./menuItemModel";
const adminModel = new mongoose.Schema({
  name: reqString,
  username: reqString,
  email: reqString,
  password: reqString,
  role: reqString,
});
const AdminModel = mongoose.model("admin", adminModel);
export default AdminModel;
