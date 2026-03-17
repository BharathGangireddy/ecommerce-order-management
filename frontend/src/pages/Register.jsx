import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../components/Input";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password) {
      return toast.error("Please fill all fields");
    }

    try {
      await axiosInstance.post("/auth/register", data);

      toast.success("Account created 🚀");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-gray-900 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Create your account
        </h2>
        <p className="text-center text-gray-400 text-sm mb-6">
          Join us and get started 🚀
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            placeholder="Full Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />

          <Input
            type="email"
            placeholder="Email Address"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />

          <Input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-green-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-300"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-300 mt-6">
          Already have an account?{" "}
          <span
            className="text-green-400 cursor-pointer hover:underline hover:text-green-300 transition"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
