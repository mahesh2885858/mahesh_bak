import MenuItemModel from "../models/menuItemModel.js";

const adminController = {
  additem: async (req, res) => {
    const { itemName, quantity, unitPrice } = req.body;
    try {
      const data = new MenuItemModel({
        itemName,
        quantity,
        unitPrice,
      });
      await data.save();
      res.send("it's saved");
    } catch (err) {
      res.send(err);
    }
  },
  deleteItem: async (req, res) => {
    try {
      const { id } = req.body;
      const result = await MenuItemModel.findByIdAndDelete(id);
      res.send("it's deleted");
    } catch (error) {
      res.send(error);
    }
  },
};
export default adminController;
