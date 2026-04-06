import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  getAllOrdersAdmin,
  updateOrderStatus,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/orders", protect, adminOnly, getAllOrdersAdmin);
router.put("/orders/:id", protect, adminOnly, updateOrderStatus);

export default router;