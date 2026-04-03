import { useDispatch } from "react-redux";
import { addToWishlist } from "../features/wishlist/wishlistSlice";
import { FaHeart } from "react-icons/fa";

const WishlistButton = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(addToWishlist(product))}
      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
    >
      <FaHeart className="text-red-500" />
    </button>
  );
};

export default WishlistButton;