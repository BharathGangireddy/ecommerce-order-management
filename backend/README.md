# ⚙️ Backend — E-Commerce Order Management

The backend of the E-Commerce Order Management System, built with **Node.js**, **Express.js**, and **MongoDB**. Features real-time order notifications via **Socket.io** and secure JWT-based authentication.

---

## 🧰 Tech Stack

| Tool | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB + Mongoose | Database & ODM |
| Socket.io | Real-time communication |
| JWT | Authentication |
| bcryptjs | Password hashing |
| dotenv | Environment variables |
| cors | Cross-origin requests |

---

## 📁 Folder Structure

```
backend/
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── authController.js       # Register, Login logic
│   ├── productController.js    # Product CRUD
│   ├── cartController.js       # Cart management
│   ├── orderController.js      # Order creation
│   ├── paymentController.js    # Payment handling
│   └── adminController.js      # Admin operations
├── middleware/
│   └── authMiddleware.js       # JWT protect middleware
├── models/
│   ├── User.js                 # User schema
│   ├── Product.js              # Product schema
│   ├── Cart.js                 # Cart schema
│   └── Order.js                # Order schema
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   ├── paymentRoutes.js
│   ├── orderRoutes.js
│   └── adminRoutes.js
└── server.js                   # Entry point
```

---

## 🗄️ Database Schema

### Order
```js
{
  user:        ObjectId (ref: User),
  items: [{
    product:   ObjectId (ref: Product),
    quantity:  Number
  }],
  totalAmount: Number,
  paymentId:   String,
  status:      String (default: "Paid"),
  createdAt:   Date,
  updatedAt:   Date
}
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login & get JWT |

### Products
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/products` | Protected | Get all products |
| GET | `/api/products/:id` | Protected | Get product by ID |
| POST | `/api/products` | Admin | Add new product |
| PUT | `/api/products/:id` | Admin | Update product |
| DELETE | `/api/products/:id` | Admin | Delete product |

### Cart
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/cart` | Protected | Get user cart |
| POST | `/api/cart` | Protected | Add item to cart |
| DELETE | `/api/cart/:id` | Protected | Remove item |

### Orders
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/orders` | Protected | Place new order |

### Admin
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/admin/orders` | Admin | Get all orders |
| PUT | `/api/admin/orders/:id` | Admin | Update order status |

### Payment
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/payment` | Protected | Process payment |

---

## 🔌 Real-Time — Socket.io

The server uses **Socket.io** for real-time order notifications.

| Event | Direction | Description |
|---|---|---|
| `connection` | Client → Server | User connects |
| `orderPlaced` | Client → Server | New order placed |
| `newOrder` | Server → All Clients | Broadcasts new order to admin |
| `disconnect` | Client → Server | User disconnects |

---

## ⚙️ Setup & Installation

### 1. Navigate to backend folder

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Start the server

```bash
# Development
npm run dev

# Production
npm start
```

Server runs at **http://localhost:5000**

---

## 🔒 Authentication Flow

1. User registers → password hashed with **bcryptjs** → saved to MongoDB
2. User logs in → JWT token generated and returned
3. Protected routes → `authMiddleware` verifies JWT on every request
4. Admin routes → additional role check inside middleware

---

## 🔮 Future Improvements

- [ ] Razorpay / Stripe payment gateway integration
- [ ] Email notifications on order status change
- [ ] Pagination for products and orders
- [ ] Rate limiting and helmet.js for security
- [ ] Unit tests with Jest & Supertest