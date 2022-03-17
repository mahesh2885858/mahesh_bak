import MenuItemModel from "../models/menuItemModel.js";
import userModel from "../models/userModel.js";
import session from "express-session";
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
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (username && password) {
        const user = await userModel.findOne({ username });
        if (user) {
          if (user.password === password) {
            let session = req.session;
            session.userId = user._id;
            console.log(req.session);
            res.status(200).send(user);
          } else {
            res.status(400).send("give password");
          }
        } else {
          res.status(400).send("no user found with that username");
        }
      } else {
        res.status(400).send("both fields are required");
      }
    } catch (error) {
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
