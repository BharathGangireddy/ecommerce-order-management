import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../features/products/productSlice";
import { addToCartAPI } from "../features/cart/cartSlice";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading } = useSelector(
    (state) => state.products || {}
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!product?._id) return;

    dispatch(
      addToCartAPI({
        productId: product._id,
        quantity: 1,
      })
    );

    toast.success("Added to cart 🛒");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-6">Loading...</div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="p-6">Product not found</div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row gap-8">
          
          {/* Image */}
          <img
            src={product.image || "https://via.placeholder.com/300"}
            alt={product.name}
            className="w-full md:w-1/2 h-80 object-cover rounded"
          />

          {/* Details */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{product.name}</h1>

            <p className="text-gray-600 mt-2">
              {product.description || "No description available"}
            </p>

            <h2 className="text-xl font-semibold mt-4">
              ₹{product.price}
            </h2>

            <p className="mt-2">
              Stock: {product.stock || "Available"}
            </p>

            <button
              onClick={handleAddToCart}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;