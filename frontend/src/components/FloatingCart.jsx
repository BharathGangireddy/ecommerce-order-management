
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const FloatingCart = () => {
  return (
    <Link to="/cart">
      <div className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl">
        <FaShoppingCart />
      </div>
    </Link>
  );
};

export default FloatingCart;