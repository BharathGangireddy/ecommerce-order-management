import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

/* ROUTES */
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

/* CONFIG */
dotenv.config();
connectDB();

/* EXPRESS APP */
const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

/* PORT */
const PORT = process.env.PORT || 3000;

/* ================================
   SOCKET SETUP
================================ */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("🔌 User connected");

  socket.on("orderPlaced", (data) => {
    console.log("📦 New Order:", data);

    io.emit("newOrder", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

/* START SERVER */
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 