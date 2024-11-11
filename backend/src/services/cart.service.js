import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/customError.js";
import customResponse from "../helpers/response.js";
import Cart from "../models/cart.js";
import Product from "../models/product.js";
import mongoose from "mongoose";

// @Get cart by user
export const getMyCart = async (req, res, next) => {
  const userId = req.userId;
  console.log(userId, "userId");
  const cartUser = await Cart.findOne({
    userId: new mongoose.Types.ObjectId(userId),
  }).populate({
    path: "items.product",
  });
  if (!cartUser)
    throw new NotFoundError("Not found cart or cart is not exist.");
  const checkStock = cartUser.items.filter((item) => {
    const stock = item.product.variants.find(
      (el) => el._id.toString() === item.variant.toString()
    ).stock;
    if (item.quantity > stock) {
      item.quantity = stock;
    }
    return item;
  });

  cartUser.items = checkStock;
  await cartUser.save();
  const itemsResponse = checkStock.map((item) => {
    const newItem = {
      productId: item.product._id,
      variantId: item.variant,
      quantity: item.quantity,
      name: item.product.name,
      price: item.product.price,
      image: item.product.variants[0].image,
      description: item.product.description,
      discount: item.product.discount,
    };
    return newItem;
  });
  const myCart = {
    userId: cartUser.userId,
    items: itemsResponse,
  };

  return myCart;
};

// @Add to cart
export const addToCart = async (req, res, next) => {
  let { productId, quantity, variantId } = req.body;
  let userId = req.userId;
  // Convert ids to ObjectId format if they are strings
  productId = new mongoose.Types.ObjectId(productId);
  userId = new mongoose.Types.ObjectId(userId);
  variantId = new mongoose.Types.ObjectId(variantId);

  let updatedCart = null;

  const [product, currentCart] = await Promise.all([
    Product.findOne({ _id: productId }).lean(),
    Cart.findOne({ userId }).lean(),
  ]);

  if (!product) throw new BadRequestError(`Not found product`);
  if (quantity < 1) throw new BadRequestError(`Quantity must be at least 1`);

  const item = product.variants.find((item) => item._id.equals(variantId));

  if (quantity > item.stock) quantity = item.stock;

  if (!currentCart) {
    const newCart = new Cart({
      userId,
      items: [{ product: productId, variant: variantId, quantity }],
    });
    updatedCart = await newCart.save();
    return updatedCart;
  }

  if (currentCart && currentCart.items.length > 0) {
    const productInThisCart = currentCart.items.find((item) =>
      item.variant.equals(variantId)
    );
    const currentQuantity = productInThisCart?.quantity || 0;
    const newQuantity = currentQuantity + quantity;

    updatedCart = await Cart.findOneAndUpdate(
      { userId, "items.product": productId, "items.variant": variantId },
      {
        $set: {
          "items.$.quantity":
            newQuantity > item.stock ? item.stock : newQuantity,
        },
      },
      { new: true, upsert: false }
    );
  }

  if (!updatedCart) {
    updatedCart = await Cart.findOneAndUpdate(
      { userId },
      {
        $push: { items: { product: productId, variant: variantId, quantity } },
      },
      { new: true, upsert: true }
    );
  }

  return null;
};

// @Remove one cart item
export const removeCartItem = async (req, res, next) => {
  const userId = req.userId;
  const updatedCart = await Cart.findOneAndUpdate(
    { userId: new mongoose.Types.ObjectId(userId) },
    { $pull: { items: { variant: req.params.variantId } } },
    { new: true }
  );
  if (!updatedCart)
    throw new BadRequestError(`Not found cart with userId: ${req.body.userId}`);
  return null;
};

// @Remove all cart items
export const removeAllCartItems = async (req, res, next) => {
  const userId = req.userId;
  const cart = await Cart.findOneAndUpdate(
    { userId },
    { items: [] },
    { new: true }
  ).lean();

  if (!cart)
    throw new BadRequestError(`Not found cart with userId: ${req.body.userId}`);

  return null;
};

// @Update  cart item quantity
export const updateCartItemQuantity = async (req, res, next) => {
  const userId = req.userId;
  const product = await Product.findOne({
    _id: new mongoose.Types.ObjectId(req.body.productId),
    "variants._id": new mongoose.Types.ObjectId(req.body.variantId),
  });
  if (!product) throw new BadRequestError(`Not found product`);

  if (req.body.quantity < 1)
    throw new BadRequestError(`Quantity must be at least 1`);
  if (req.body.quantity > product.variants[0].stock)
    req.body.quantity = product.variants[0].stock;

  const updatedQuantity = await Cart.findOneAndUpdate(
    {
      userId: new mongoose.Types.ObjectId(userId),
      "items.product": new mongoose.Types.ObjectId(req.body.productId),
      "items.variant": new mongoose.Types.ObjectId(req.body.variantId),
    },
    { $set: { "items.$.quantity": req.body.quantity } },
    { new: true }
  );
  if (!updatedQuantity)
    throw new BadRequestError(
      `Not found product with Id: ${req.body.productId} inside this cart or cart not found`
    );

  return null;
};
