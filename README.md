  # 🛒 E-Commerce Order Management System

A full-stack e-commerce order management application built with **React**, **Node.js + Express**, and **MongoDB**. Features real-time order notifications via **Socket.io**, a complete shopping flow for users, and a dedicated **Admin Dashboard** to manage products and orders.

---

## 🚀 Features

- 🔐 **User Authentication** — Register, login with JWT-based session management
- 🏠 **Home & Product Listing** — Browse all available products
- 🔍 **Search** — Search products by name or category
- 📄 **Product Details** — View detailed product information
- 🛍️ **Cart & Checkout** — Add to cart and place orders seamlessly
- ❤️ **Wishlist** — Save favourite products
- 📦 **Order History** — View and track all past orders
- 🔌 **Real-Time Notifications** — Socket.io broadcasts new orders instantly to admin
- 🛠️ **Admin Dashboard** — Manage products and orders from a dedicated panel

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, React Router DOM, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Real-Time | Socket.io |
| Auth | JWT (JSON Web Tokens) |

---

## 📁 Project Structure

```
ecommerce-order-management/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── README.md
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v16+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- npm

---

### 1. Clone the Repository

```bash
git clone https://github.com/BharathGangireddy/ecommerce-order-management.git
cd ecommerce-order-management
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

App runs at **http://localhost:5173**

---

## 🔌 Real-Time — Socket.io

When a user places an order, a `orderPlaced` event is emitted to the server, which then broadcasts a `newOrder` event to all connected clients (including the admin dashboard) in real time.

---

## 📌 API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get token |
| GET | `/api/products` | Get all products |
| POST | `/api/cart` | Add item to cart |
| POST | `/api/orders` | Place new order |
| GET | `/api/admin/orders` | Admin — get all orders |

---

## 🔮 Future Improvements

- [ ] Razorpay / Stripe payment gateway
- [ ] Email notifications on order updates
- [ ] Deploy on Vercel + Railway
- [ ] Product reviews and ratings
- [ ] Mobile responsive UI improvements

---

## 👨‍💻 Author

**Bharath Gangireddy**
- GitHub: [@BharathGangireddy](https://github.com/BharathGangireddy)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
