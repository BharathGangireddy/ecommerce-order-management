import Product from "../models/Product.js";

/* =====================================
   CREATE PRODUCT
===================================== */
export const createProduct = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock,
      image:
        req.body.image && req.body.image.startsWith("http")
          ? req.body.image
          : "https://via.placeholder.com/300",
      createdBy: req.user._id,
    });

    return res.status(201).json(product);
  } catch (error) {
    console.log("CREATE PRODUCT ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

/* =====================================
   GET ALL PRODUCTS
===================================== */
export const getAllProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const count = await Product.countDocuments({ ...keyword });

    const products = await Product.find({ ...keyword })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      products,
      page,
      totalPages: Math.ceil(count / limit),
      totalProducts: count,
    });
  } catch (error) {
    console.log("GET PRODUCTS ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

/* =====================================
   GET SINGLE PRODUCT
===================================== */
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log("GET SINGLE PRODUCT ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

/* =====================================
   UPDATE PRODUCT (FIXED)
===================================== */
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        stock: req.body.stock,
        image:
          req.body.image && req.body.image.startsWith("http")
            ? req.body.image
            : undefined,
      },
      {
        new: true,
        runValidators: false,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.log("UPDATE PRODUCT ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

/* =====================================
   DELETE PRODUCT
===================================== */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("DELETE PRODUCT ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};