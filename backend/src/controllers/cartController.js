import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

/* ===============================
   ADD TO CART
================================ */
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product)
    return res.status(404).json({ message: "Product not found" });

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [{ product: productId, quantity }],
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
  }

  const populatedCart = await Cart.findOne({ user: req.user._id })
    .populate("items.product");

  res.status(200).json({
    items: populatedCart.items,
  });
};

/* ===============================
   GET CART
================================ */
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
    .populate("items.product");

  if (!cart) return res.json({ items: [] });

  res.json({ items: cart.items });
};

/* ===============================
   UPDATE CART ITEM
================================ */
export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart)
    return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (!item)
    return res.status(404).json({ message: "Item not found" });

  item.quantity = quantity;
  await cart.save();

  const updatedCart = await Cart.findOne({ user: req.user._id })
    .populate("items.product");

  res.json({ items: updatedCart.items });
};

/* ===============================
   REMOVE FROM CART
================================ */
export const removeFromCart = async (req, res) => {
  const { productId } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart)
    return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();

  const updatedCart = await Cart.findOne({ user: req.user._id })
    .populate("items.product");

  res.json({ items: updatedCart.items });
};