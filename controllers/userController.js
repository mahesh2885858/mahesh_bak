import MenuItemModel from "../models/menuItemModel.js";
import userModel from "../models/userModel.js";

const userController = {
  registerUser: async (req, res) => {
    try {
      const data = new userModel({ ...req.body });
      await data.save();
      res.send("user registered");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },
  getMenu: async (req, res) => {
    try {
      const items = await MenuItemModel.find();
      res.send(items);
    } catch (error) {
      res.send(error);
    }
  },
  placeOrder: async (req, res) => {
    const { id, itemName, quantity, unitPrice } = req.body;
    try {
      const data = await userModel.findByIdAndUpdate(
        id,
        {
          $push: { orders: { itemName, quantity, unitPrice } },
        },
        { new: true }
      );
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  },
  cancelOrder: async (req, res) => {
    try {
      const { orderId } = req.body;
      const data = await userModel.findOneAndUpdate(
        {
          "orders._id": orderId,
        },
        { "orders.$.isCancelled": true },
        { new: true }
      );
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  },
};
export default userController;
