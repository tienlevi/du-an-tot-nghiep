import { StatusCodes } from "http-status-codes";
import Cart from "../models/cart";
import Product from "../models/product";

// Lấy danh sách sản phẩm thuộc 1 user
export const getCartByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await Cart.findOne({ userId: id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }
    return res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
};
// Thêm sản phẩm vào giỏ hàng
export const addItemToCart = async (req, res) => {
  const { userId, products } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    for (const product of products) {
      const productModel = await Product.findById(product.productId);

      if (!product.productId) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "productId is required for each product" });
      }
      const existProductQuantity = cart.products.find(
        (item) => item.productId.toString() === product.productId
      );
      const existProductIndex = cart.products.findIndex(
        (item) => item.productId.toString() === product.productId
      );
      if (existProductIndex !== -1) {
        // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
        cart.products[existProductIndex].quantity += product.quantity;

        if (existProductQuantity.quantity > productModel.countInStock) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Product quantity exceeds available stock" });
        }
      } else {
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
        const newProduct = {
          productId: product.productId,
          quantity: product.quantity,
        };
        cart.products.push(newProduct);
      }
    }
    await cart.save();
    return res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    console.log({ error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
// Xóa sản phẩm trong giỏ hàng thuộc 1 user

export const removeFromCart = async (req, res) => {
  const { userId } = req.params;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Cart not found" });
    }
    cart.products = cart.products.filter(
      (product) =>
        product.productId &&
        product.productId.toString() !== req.params.productId
    );

    await cart.save();
    return res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Internal Server Error" });
  }
};
// Cập nhật số lượng sản phẩm trong giỏ hàng thuộc 1 user
export const updateProductQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Cart not found" });
    }

    const product = cart.products.find(
      (item) => item.productId && item.productId.toString() === productId
    );
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
    }

    product.quantity = quantity;
    await cart.save();
    return res.status(StatusCodes.OK).json({ cart });
  } catch (error) {}
};
// Tăng số lượng của sản phẩm trong giỏ hàng
export const increaseProductQuantity = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    let cart = await Cart.findOne({ userId });
    const productQuantityLimit = await Product.findById(productId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (product.quantity >= productQuantityLimit.countInStock) {
      return res
        .status(400)
        .json({ message: "Product quantity has reached its limit" });
    }
    product.quantity++;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Giảm số lượng của sản phẩm trong giỏ hàng
export const decreaseProductQuantity = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (product.quantity > 1) {
      product.quantity--;
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
