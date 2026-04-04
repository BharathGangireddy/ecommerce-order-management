import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartAPI,
  removeCartAPI,
} from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items = [] } = useSelector((state) => state.cart || {});

  /* LOAD CART WHEN PAGE OPENS */
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  /* TOTAL PRICE */
  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  /* EMPTY CART */
  if (!items.length) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h1 className="text-2xl font-bold mb-4">
            Cart is empty 🛒
          </h1>

          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Go Shopping
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">
        Your Cart
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* CART ITEMS */}
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product._id}
              className="flex gap-4 bg-white p-4 rounded-xl shadow"
            >
              {/* IMAGE */}
              <img
                src={
                  item.product.image ||
                  "https://via.placeholder.com/100"
                }
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded"
              />

              {/* DETAILS */}
              <div className="flex-1">
                <h2 className="font-semibold text-lg">
                  {item.product.name}
                </h2>

                <p className="text-gray-600">
                  ₹{item.product.price}
                </p>

                {/* QUANTITY */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded"
                    onClick={() =>
                      dispatch(
                        updateCartAPI({
                          productId: item.product._id,
                          quantity: Math.max(
                            1,
                            item.quantity - 1
                          ),
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

                  {/* REMOVE */}
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

        {/* ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow h-fit">
          <h2 className="text-xl font-bold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>₹50</span>
          </div>

          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total</span>
            <span>₹{total + 50}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;