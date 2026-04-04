import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  /* SEARCH */
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?keyword=${keyword}`);
    }
  };

  /* LOGOUT */
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  /* CART COUNT */
  const cartCount = items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-lg sticky top-0 z-50">
      
      {/* LOGO */}
      <h1
        className="text-2xl font-bold text-white cursor-pointer tracking-wide hover:text-blue-400 transition"
        onClick={() => navigate("/")}
      >
        Shop<span className="text-blue-400">Sphere</span>
      </h1>

      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center bg-white/10 rounded-lg px-3 py-2 w-1/3">
        <FaSearch className="text-white mr-2" />
        <input
          type="text"
          placeholder="Search products..."
          className="bg-transparent outline-none text-white w-full placeholder-gray-300"
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        {token ? (
          <>
            {/* WISHLIST */}
            <button
              className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
              onClick={() => navigate("/wishlist")}
            >
              <FaHeart />
            </button>

            {/* CART */}
            <button
              className="relative px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
              onClick={() => navigate("/cart")}
            >
              <FaShoppingCart />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* LOGOUT */}
            <button
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium shadow-md hover:scale-[1.05] active:scale-95 transition-all duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:scale-[1.05] active:scale-95 transition-all duration-300"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;