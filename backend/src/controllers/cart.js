import { StatusCodes } from "http-status-codes";
import Cart from "../models/cart";

// Lấy danh sách sản phẩm thuộc 1 user
export const getCartByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    const cartData = {
      products: cart.products.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
      })),
    };
    return res.status(StatusCodes.OK).json(cartData);
  } catch (error) {}
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
      if (!product.productId) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "productId is required for each product" });
      }

      const existProductIndex = cart.products.findIndex(
        (item) => item.productId.toString() === product.productId
      );
      if (existProductIndex !== -1) {
        // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
        cart.products[existProductIndex].quantity += 1;
      } else {
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
        const newProduct = { productId: product.productId, quantity: 1 };
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
  const { userId, productId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Cart not found" });
    }
    cart.products = cart.products.filter(
      (product) =>
        product.productId && product.productId.toString() !== productId
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
      (item) => item.productId.toString() === productId
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
  const { userId, productId } = req.body;
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

    product.quantity++;

    // await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Giảm số lượng của sản phẩm trong giỏ hàng
export const decreaseProductQuantity = async (req, res) => {
  const { userId, productId } = req.body;
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
