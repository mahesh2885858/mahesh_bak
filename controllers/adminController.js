import MenuItemModel from "../models/menuItemModel.js";
import AdminModel from "../models/Adminscheema.js";
import userModel from "../models/userModel.js";
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
  addAmin: async (req, res) => {
    try {
      const { name, username, email, password } = req.body;
      const admin = new AdminModel({ name, username, email, password });
      const result = await admin.save();
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },
  adminLogin: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (username && password) {
        const user = await AdminModel.findOne({ username });
        if (user) {
          if (user.password === password) {
            req.session.adminId = user._id;
            res.send(user);
          } else {
            throw "password is wrong";
          }
        } else {
          throw "user doen't exist";
        }
      } else {
        throw "need username and password";
      }
    } catch (err) {
      res.send(err);
    }
  },
  retainAdminLogin: async (req, res) => {
    try {
      const id = req.id;
      if (id) {
        const user = await AdminModel.findById(id);
        res.send(user);
      } else {
        throw "please login again";
      }
    } catch (error) {
      res.send(error);
    }
  },
  adminLogout: async (req, res) => {
    try {
      req.session.destroy((err) => {
        res.send("logout");
      });
    } catch (err) {
      res.send(err);
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const data = await userModel.find({}, { orders: 1, _id: 0 });
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  },
  deliverOrder: async (req, res) => {
    console.log("first");
    try {
      const { orderId } = req.body;
      if (orderId) {
        const data = await userModel.findOneAndUpdate(
          {
            "orders._id": orderId,
          },
          { "orders.$.isDelivered": true },
          { new: true }
        );
        res.send(data);
      } else {
        throw "invalid order id";
      }
    } catch (error) {
      res.send(error);
    }
  },
};
export default adminController;
