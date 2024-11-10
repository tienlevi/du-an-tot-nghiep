import { cartService } from "../services/index.js";
import asyncHandler from "../helpers/asyncHandler.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import customResponse from "../helpers/response.js";

export const addToCart = asyncHandler(async (req, res) => {
  const cart = await cartService.addToCart(req, res);
  return res.status(StatusCodes.OK).json(
    customResponse({
      data: cart,
      success: true,
      status: StatusCodes.OK,
      message: ReasonPhrases.OK,
    })
  );
});
export const getCartByUser = asyncHandler(async (req, res) => {
  const cart = await cartService.getCartByUser(req, res);
  return res.status(StatusCodes.OK).json(
    customResponse({
      data: cart,
      success: true,
      status: StatusCodes.OK,
      message: ReasonPhrases.OK,
    })
  );
});
export const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const cart = await cartService.updateCartItemQuantity(req, res);
  return res.status(StatusCodes.OK).json(
    customResponse({
      data: cart,
      success: true,
      status: StatusCodes.OK,
      message: ReasonPhrases.OK,
    })
  );
});
