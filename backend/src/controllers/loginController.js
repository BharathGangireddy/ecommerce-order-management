import User from "../models/User.js";
import { comparePassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/jwtToken.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Enter a valid Password",
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      message: "Login Success",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
