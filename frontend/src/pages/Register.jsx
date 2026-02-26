import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/auth/register", data);
      toast.success("Registration Successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button className="bg-green-600 text-white w-full p-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;