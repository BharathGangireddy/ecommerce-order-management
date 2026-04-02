import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { clearCart } from "../features/cart/cartSlice";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const Checkout = () => {
  const { items = [] } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total price
  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    try {
      // 1️⃣ Create Razorpay Order from backend
      const { data: order } = await axiosInstance.post(
        "/payment/create-order",
        { amount: total }
      );

      console.log("Razorpay Order Response:", order);

      // 2️⃣ Razorpay Checkout Options
      const options = {
        key: "rzp_test_SYadbf2sSJtvJn", // Your Razorpay Test Key
        order_id: order.id,
        name: "Ecommerce App",
        description: "Order Payment",

        handler: async function (response) {
          console.log("Payment Success Response:", response);

          // 3️⃣ Verify Payment in backend
          await axiosInstance.post("/payment/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          toast.success("Payment Successful 🎉");

          // 4️⃣ Clear Cart
          dispatch(clearCart());

          // 5️⃣ Redirect to Orders Page
          navigate("/orders");
        },

        prefill: {
          name: "Customer",
          email: "customer@email.com",
        },

        theme: {
          color: "#2563eb",
        },
      };

      // 6️⃣ Open Razorpay Popup
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log("Payment Error:", error);
      toast.error("Payment failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>

          {/* Cart Items */}
          {items.map((item) => (
            <div
              key={item.product._id}
              className="flex justify-between border-b py-2"
            >
              <span>
                {item.product.name} × {item.quantity}
              </span>
              <span>
                ₹{item.product.price * item.quantity}
              </span>
            </div>
          ))}

          {/* Total */}
          <div className="flex justify-between mt-4 text-xl font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;