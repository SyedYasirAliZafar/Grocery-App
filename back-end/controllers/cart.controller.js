// Example backend route
import { User } from "../models/user.model.js";

export const updateCart = async (req, res) => {
  try {
    const userId = req.user; // this must be string ID
    const { cartItems } = req.body;

    if (!cartItems || typeof cartItems !== "object") {
      return res.status(400).json({ message: "Invalid cart data" });
    }

    await User.findByIdAndUpdate(userId, { cartItems });
    res.status(200).json({ success: true, message: "Cart updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

