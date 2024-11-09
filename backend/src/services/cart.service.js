import { BadRequestError } from "../errors/customError.js";
import customResponse from "../helpers/response.js";
import Cart from "../models/cart.js";
import Product from "../models/product.js";
import mongoose from "mongoose";

// @Get cart by user
export const getCartByUser = async (req, res, next) => {
  const cartUser = await Cart.findOne({ userId: req.params.id }).populate({
    path: "items.product",
  });
  if (!cartUser)
    throw new NotFoundError("Not found cart or cart is not exist.");
  const checkStock = cartUser.items.filter((item) => {
    if (
      item.quantity >
      item.product.variants.find((el) => el._id === item.variant).stock
    ) {
      item.quantity = item.productVariation.stock;
    }
    return item;
  });
  cartUser.items = filteredProducts;
  await cartUser.save();
  const cartResponse = checkStock.map().filter((item) => {
    item.product = {
      ...item.product,
      ...item.product.variants.find((variant) => variant._id == item.variant),
    };
    delete item.product.variants;
    return item;
  });
  return res.status(StatusCodes.OK).json(
    customResponse({
      data: cartResponse,
      success: true,
      status: StatusCodes.OK,
      message: ReasonPhrases.OK,
    })
  );
};

// @Add to cart

export const addToCart = async (req, res, next) => {
  let { productId, userId, quantity, idVariant } = req.body;

  // Convert ids to ObjectId format if they are strings
  productId = new mongoose.Types.ObjectId(productId);
  userId = new mongoose.Types.ObjectId(userId);
  idVariant = new mongoose.Types.ObjectId(idVariant);

  let updatedCart = null;

  const [product, currentCart] = await Promise.all([
    Product.findOne({ _id: productId }).lean(),
    Cart.findOne({ userId }).lean(),
  ]);

  if (!product) throw new BadRequestError(`Not found product`);
  if (quantity < 1) throw new BadRequestError(`Quantity must be at least 1`);

  const item = product.variants.find((item) => item._id.equals(idVariant));
  console.log(item, "item");

  if (quantity > item.stock) quantity = item.stock;

  if (!currentCart) {
    const newCart = new Cart({
      userId,
      items: [{ product: productId, variant: idVariant, quantity }],
    });
    updatedCart = await newCart.save();
    return updatedCart;
  }

  if (currentCart && currentCart.items.length > 0) {
    const productInThisCart = currentCart.items.find((item) =>
      item.variant.equals(idVariant)
    );
    const currentQuantity = productInThisCart?.quantity || 0;
    const newQuantity = currentQuantity + quantity;

    updatedCart = await Cart.findOneAndUpdate(
      { userId, "items.product": productId, "items.variant": idVariant },
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
        $push: { items: { product: productId, variant: idVariant, quantity } },
      },
      { new: true, upsert: true }
    );
  }

  return updatedCart;
};

// @Remove one cart item
export const removeCartItem = async (req, res, next) => {
  const updatedCart = await Cart.findOneAndUpdate(
    { userId: req.body.userId },
    { $pull: { items: { variant: req.body.variantId } } },
    { new: true }
  );
  if (!updatedCart)
    throw new BadRequestError(`Not found cart with userId: ${req.body.userId}`);
  return res.status(StatusCodes.OK).json(
    customResponse({
      data: updatedCart,
      success: true,
      status: StatusCodes.OK,
      message: ReasonPhrases.OK,
    })
  );
};

// @Remove all cart items
export const removeAllCartItems = async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { userId: req.body.userId },
    { items: [] },
    { new: true }
  ).lean();

  if (!cart)
    throw new BadRequestError(`Not found cart with userId: ${req.body.userId}`);

  return res.status(StatusCodes.NO_CONTENT).json(
    customResponse({
      data: null,
      success: true,
      status: StatusCodes.NO_CONTENT,
      message: ReasonPhrases.NO_CONTENT,
    })
  );
};

// @Update  cart item quantity
export const updateCartItemQuantity = async (req, res, next) => {
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
      userId: new mongoose.Types.ObjectId(req.body.userId),
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

  return product;
};
