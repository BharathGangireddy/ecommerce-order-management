import { useNavigate } from "react-router-dom";

const CartSummary = ({ total }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        Order Summary
      </h2>

      <p>Total: ₹{total}</p>

      <button
        onClick={() => navigate("/checkout")}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded"
      >
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;