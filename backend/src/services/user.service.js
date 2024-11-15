import { BadRequestError } from "../errors/customError.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import customResponse from "../helpers/response.js";

import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { removeUploadedFile, uploadSingleFile } from "../utils/upload.js";

// @Patch change password
export const changePassword = async (req, res, next) => {
  const { password, newPassword } = req.body;
  const user = await User.findOne({ _id: req.userId });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new BadRequestError("Mật khẩu cũ không chính xác");
  }

  user.password = newPassword;
  await user.save();

  return res.status(StatusCodes.OK).json(
    customResponse({
      data: null,
      message: ReasonPhrases.OK,
      status: StatusCodes.OK,
      success: true,
    })
  );
};
// @Patch forgot password
export const forgotPassword = async (req, res, next) => {
  const user = await User.findById(req.userId);
  user.password = req.body.password;
  await user.save();

  return res.status(StatusCodes.OK).json(
    customResponse({
      data: null,
      message: ReasonPhrases.OK,
      status: StatusCodes.OK,
      success: true,
    })
  );
};

// @Get get user profile
export const getProfile = async (req, res, next) => {
  const user = await User.findById(req.userId).lean();

  return res.status(StatusCodes.OK).json(
    customResponse({
      data: user,
      message: ReasonPhrases.OK,
      status: StatusCodes.OK,
      success: true,
    })
  );
};

// @Patch update user profile
export const updateProfile = async (req, res, next) => {
  const user = await User.findById(req.userId);

  if (req.files["avatar"]) {
    const { downloadURL, imageUrlRef } = await uploadSingleFile(
      ...req.files["avatar"]
    );
    user.avatar = downloadURL;
    user.imageUrlRef = imageUrlRef;

    if (user.imageUrlRef) {
      removeUploadedFile(user.imageUrlRef);
    }
  }
  user.set(req.body);
  await user.save();

  return res.status(StatusCodes.OK).json(
    customResponse({
      data: null,
      message: ReasonPhrases.OK,
      status: StatusCodes.OK,
      success: true,
    })
  );
};
