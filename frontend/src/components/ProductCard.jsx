import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items } = useSelector((state) => state.wishlist);

  const isWishlisted = items.some(
    (item) => item._id === product._id
  );

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 relative">

      {/* HEART ICON */}
      <button
        onClick={() => dispatch(toggleWishlist(product))}
        className="absolute top-3 right-3"
      >
        <FaHeart
          className={`text-xl ${
            isWishlisted
              ? "text-red-500"
              : "text-gray-300"
          }`}
        />
      </button>

      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
        onClick={() => navigate(`/product/${product._id}`)}
      />

      {/* DETAILS */}
      <h2 className="font-semibold mt-2">
        {product.name}
      </h2>

      <p className="text-gray-500">
        ₹{product.price}
      </p>

      <button
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        View Product
      </button>
    </div>
  );
};

export default ProductCard;