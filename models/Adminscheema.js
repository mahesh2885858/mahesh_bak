import mongoose from "mongoose";
import { reqString } from "./menuItemModel.js";
const adminModelSchema = new mongoose.Schema({
  name: reqString,
  username: reqString,
  email: reqString,
  password: reqString,
  role: { ...reqString, default: "ADMIN" },
});
const AdminModel = mongoose.model("admin", adminModelSchema);
export default AdminModel;
