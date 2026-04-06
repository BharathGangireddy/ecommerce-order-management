import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],
    totalAmount: Number,
    paymentId: String,
    status: {
      type: String,
      default: "Paid",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);