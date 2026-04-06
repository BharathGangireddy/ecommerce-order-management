import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

dotenv.config();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* =====================================
   CREATE RAZORPAY ORDER
===================================== */
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    console.log("Amount received:", amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const options = {
      amount: Number(amount) * 100 , // rupees → paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    console.log("Razorpay Order:", order);

    res.json(order);
  } catch (error) {
    console.log("RAZORPAY CREATE ORDER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* =====================================
   VERIFY PAYMENT
===================================== */
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // Get user cart
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    // Reduce product stock
    for (let item of cart.items) {
      const product = await Product.findById(item.product._id);
      product.stock -= item.quantity;
      await product.save();
    }

    // Create Order
    const order = await Order.create({
      user: req.user._id,
      items: cart.items,
      paymentId: razorpay_payment_id,
      totalAmount: cart.items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ),
      status: "Paid",
    });

    // Clear Cart
    cart.items = [];
    await cart.save();

    res.json({
      success: true,
      message: "Payment verified & Order created",
      order,
    });

  } catch (error) {
    console.log("VERIFY PAYMENT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};