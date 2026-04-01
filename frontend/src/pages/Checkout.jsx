import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { socket } from "../socket";

const Checkout = () => {
  const navigate = useNavigate();


  useEffect(() => {
    socket.on("newOrder", (data) => {
      console.log("New order received:", data);
    });

    return () => {
      socket.off("newOrder");
    };
  }, []);

  const handlePayment = async () => {
    try {
      const res = await axiosInstance.post("/payment/create-order", {
        amount: 500,
      });

      await axiosInstance.post("/orders", {
        amount: 500,
        paymentId: "demo123",
        orderId: res.data.order.id,
      });

   
      socket.emit("orderPlaced", {
        message: "New order placed",
      });

      toast.success("Order placed successfully 🎉");

      navigate("/");
    } catch (error) {
      toast.error("Payment failed");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <p className="mb-4">Confirm your order</p>

        <button
          onClick={handlePayment}
          className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-lg"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Checkout;