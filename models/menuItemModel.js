import mongoose from "mongoose";

export const reqString = {
  type: String,
  required: true,
};
export const reqNum = {
  type: Number,
  required: true,
};
const menuItemScheema = new mongoose.Schema({
  itemName: reqString,
  unitPrice: reqNum,

  quantity: { ...reqNum, default: 0 },
});
const MenuItemModel = mongoose.model("menuitem", menuItemScheema);
export default MenuItemModel;
