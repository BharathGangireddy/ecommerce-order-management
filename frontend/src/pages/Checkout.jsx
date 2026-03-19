import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      const res = await axiosInstance.post("/payment/create-order", {
        amount: 500,
      });

      // Simulate success
      await axiosInstance.post("/orders", {
        amount: 500,
        paymentId: "demo123",
        orderId: res.data.order.id,
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

      <div className="bg-white p-6 rounded shadow">
        <p className="mb-4">Confirm your order</p>

        <button
          onClick={handlePayment}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Checkout;
