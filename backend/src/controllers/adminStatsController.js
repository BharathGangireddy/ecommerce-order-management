import Order from "../models/Order.js";
import User from "../models/User.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = (
      await Order.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }])
    )[0]?.total || 0;

    res.json({
      success: true,
      totalUsers,
      totalOrders,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};