# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:
# 🛍️ Frontend — E-Commerce Order Management

The frontend of the E-Commerce Order Management System, built with **React.js**. It supports both user-facing shopping features and a full **Admin Dashboard** with protected routes throughout.

---

## 🧰 Tech Stack

| Tool | Purpose |
|---|---|
| React.js | UI Framework |
| React Router DOM | Client-side routing |
| Axios | API calls to backend |
| Socket.io Client | Real-time order updates |
| CSS | Styling |

---

## 📁 Folder Structure

```
frontend/
└── src/
    ├── pages/
    │   ├── Login.jsx
    │   ├── Register.jsx
    │   ├── Home.jsx
    │   ├── Cart.jsx
    │   ├── Checkout.jsx
    │   ├── ProductDetails.jsx
    │   ├── SearchResults.jsx
    │   ├── Wishlist.jsx
    │   ├── Orders.jsx
    │   └── admin/
    │       ├── AdminDashboard.jsx
    │       ├── AdminProducts.jsx
    │       ├── AddProducts.jsx
    │       ├── EditProduct.jsx
    │       └── AdminOrders.jsx
    ├── components/
    │   └── ProtectedRoute.jsx
    └── App.jsx
```

---

## 🔐 Route Structure

### Public Routes
| Path | Page |
|---|---|
| `/login` | Login Page |
| `/register` | Register Page |

### User Routes (Protected)
| Path | Page |
|---|---|
| `/` | Home — Product Listing |
| `/search` | Search Results |
| `/product/:id` | Product Details |
| `/cart` | Shopping Cart |
| `/checkout` | Checkout & Payment |
| `/wishlist` | Wishlist |
| `/orders` | Order History |

### Admin Routes (Protected)
| Path | Page |
|---|---|
| `/admin` | Admin Dashboard |
| `/admin/products` | Manage Products |
| `/admin/add-product` | Add New Product |
| `/admin/edit-product/:id` | Edit Product |
| `/admin/orders` | Manage All Orders |

---

## ⚙️ Setup & Installation

### 1. Navigate to frontend folder

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
VITE_API_URL=http://localhost:5000
```

### 4. Start the development server

```bash
npm run dev
```

App runs at **http://localhost:5173**

---

## 🔒 Protected Routes

All routes except `/login` and `/register` are wrapped in a `ProtectedRoute` component. If a user is not authenticated, they are automatically redirected to the login page.

---

## 🔮 Future Improvements

- [ ] Add loading skeletons for better UX
- [ ] Toast notifications for cart/order actions
- [ ] Dark mode support
- [ ] Mobile responsive improvements
- [ ] Unit tests with React Testing Library
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
