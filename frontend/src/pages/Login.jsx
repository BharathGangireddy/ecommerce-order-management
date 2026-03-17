import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../components/Input";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // UI only

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await axiosInstance.post("/auth/login", data);

      if (!res?.data?.token) {
        return toast.error("Invalid response from server");
      }

      dispatch(loginSuccess(res.data));
      toast.success("Login successful 👋");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-gray-900 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 transition-all duration-300">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Sign in to your account
        </h2>
        <p className="text-center text-gray-400 text-sm mb-6">
        
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
          />

          <Input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-300 mt-6">
          Don’t have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline hover:text-blue-300 transition"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;