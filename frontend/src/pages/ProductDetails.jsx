// FE-EPIC-02 Product, Cart and Checkout Experience Enhancement

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  clearProduct,
} from "../features/products/productSlice";
import { addToCartAPI } from "../features/cart/cartSlice";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading } = useSelector(
    (state) => state.products || {}
  );

  const [quantity, setQuantity] = useState(1);

  /* LOAD PRODUCT */
  useEffect(() => {
    if (id) {
      dispatch(clearProduct());
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  /* ADD TO CART */
  const handleAddToCart = async () => {
    if (!product?._id) return;

    await dispatch(
      addToCartAPI({
        productId: product._id,
        quantity,
      })
    );

    toast.success("Added to cart 🛒");
  };

  /* BUY NOW */
  const handleBuyNow = async () => {
    if (!product?._id) return;

    await dispatch(
      addToCartAPI({
        productId: product._id,
        quantity,
      })
    );

    navigate("/cart");
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-6">Loading...</div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="p-6">Product not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white p-6 rounded-xl shadow grid md:grid-cols-2 gap-10">
        
        {/* IMAGE */}
        <img
          src={product.image || "https://via.placeholder.com/400"}
          alt={product.name}
          className="w-full h-96 object-cover rounded-xl"
        />

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-3">
            {product.description || "No description available"}
          </p>

          <h2 className="text-2xl font-semibold mt-4">
            ₹{product.price}
          </h2>

          <p className="mt-2">
            Stock: {product.stock || "Available"}
          </p>

          {/* QUANTITY */}
          <div className="flex items-center gap-3 mt-4">
            <button
              className="px-3 py-1 bg-gray-200 rounded"
              onClick={() =>
                setQuantity(Math.max(1, quantity - 1))
              }
            >
              -
            </button>

            <span>{quantity}</span>

            <button
              className="px-3 py-1 bg-gray-200 rounded"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;