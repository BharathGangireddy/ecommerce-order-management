import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config(); 

console.log(
  "INIT RAZORPAY WITH:",
  process.env.RAZORPAY_KEY_ID,
  process.env.RAZORPAY_KEY_SECRET,
);

export const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
