import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateCartAPI, removeCartAPI } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items = [] } = useSelector((state) => state.cart || {});

  // 🔥 VERY IMPORTANT — Load cart when page opens
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Total calculation
  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // Empty cart
  if (!items.length) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-2xl font-bold mb-4">Cart is empty 🛒</h1>

          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Go Shopping
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.product._id}
              className="flex gap-4 bg-white p-4 rounded-xl shadow"
            >
              {/* Image */}
              <img
                src={item.product.image || "https://via.placeholder.com/100"}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded"
              />

              {/* Details */}
              <div className="flex-1">
                <h2 className="font-semibold text-lg">
                  {item.product.name}
                </h2>

                <p className="text-gray-600">
                  ₹{item.product.price}
                </p>

                {/* Quantity */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded"
                    onClick={() =>
                      dispatch(
                        updateCartAPI({
                          productId: item.product._id,
                          quantity: Math.max(1, item.quantity - 1),
                        })
                      )
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="px-3 py-1 bg-gray-200 rounded"
                    onClick={() =>
                      dispatch(
                        updateCartAPI({
                          productId: item.product._id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                  >
                    +
                  </button>

                  <button
                    className="ml-4 text-red-500"
                    onClick={() =>
                      dispatch(
                        removeCartAPI({
                          productId: item.product._id,
                        })
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total + Checkout */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Total: ₹{total}
          </h2>

          <button
            onClick={() => navigate("/checkout")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;