import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(400).json({ message: "Cart empty" });

    const newOrder = await Order.create({
      user: req.user._id,
      items: cart.items,
      amount: req.body.amount,
      paymentId: req.body.paymentId,
      orderId: req.body.orderId,
    });

    // Clear cart after placing order
    cart.items = [];
    await cart.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
