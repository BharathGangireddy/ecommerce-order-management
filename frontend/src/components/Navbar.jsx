import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        ShopApp
      </h1>

      <div className="space-x-4">
        {token ? (
          <>
            <button
              className="bg-gray-200 px-4 py-2 rounded"
              onClick={() => navigate("/cart")}
            >
              Cart
            </button>

            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
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
