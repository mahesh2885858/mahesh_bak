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
            req.session.userID = user._id;

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
  retainLogin: async (req, res) => {
    try {
      if (req.id) {
        const user = await userModel.findById(req.id);
        if (user) {
          res.send(user);
        } else {
          res.send("please login again");
        }
      } else {
        res.send("no user please login again");
      }
    } catch (err) {
      console.log(err);
      res.send(err);
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
    console.log(req.body);
    try {
      const data = await userModel.findByIdAndUpdate(
        req.id,
        {
          $push: { orders: { items: req.body } },
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
  logout: async (req, res) => {
    try {
      req.session.destroy((err) => {
        res.send("logout");
      });
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  },
};
export default userController;
