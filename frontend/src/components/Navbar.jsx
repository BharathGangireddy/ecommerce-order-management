import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-lg sticky top-0 z-50">
      <h1
        className="text-2xl font-bold text-white cursor-pointer tracking-wide hover:text-blue-400 transition"
        onClick={() => navigate("/")}
      >
       Shop<span className="text-blue-400">App</span>
      </h1>

      <div className="flex items-center gap-4">
        {token ? (
          <>
            <button
              className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition backdrop-blur-md"
              onClick={() => navigate("/cart")}
            >
              🛒
            </button>

            <button
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium shadow-md hover:shadow-red-500/30 hover:scale-[1.05] active:scale-95 transition-all duration-300"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:shadow-blue-500/30 hover:scale-[1.05] active:scale-95 transition-all duration-300"
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
