import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { BadRequestError, DuplicateError } from "../errors/customError.js";
import User from "../models/user.js";
import customResponse from "../helpers/response.js";
import bcrypt from "bcryptjs";
import _ from "lodash";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/env.js";
import { generateToken } from "./token.services.js";

// @POST register
export const register = async (req, res, next) => {
  const foundeduser = await User.findOne({ email: req.body.email }).lean();
  if (foundeduser) {
    throw new DuplicateError("Email đã tồn tại!");
  }
  const user = await User.create(req.body);

  return res.status(StatusCodes.CREATED).json(
    customResponse({
      data: user,
      message: ReasonPhrases.CREATED,
      status: StatusCodes.OK,
      success: true,
    })
  );
};

// @POST login
export const login = async (req, res, next) => {
  const foundeduser = await User.findOne({ email: req.body.email });
  const payload = {
    userId: foundeduser._id,
    role: foundeduser.role,
  };

  if (!foundeduser) {
    throw new BadRequestError("Thông tin đăng nhập không chính xác");
  }

  const isCompared = await bcrypt.compare(
    req.body.password,
    foundeduser.password
  );

  if (!isCompared) {
    throw new BadRequestError("Thông tin đăng nhập không chính xác");
  }

  const accessToken = generateToken(payload, envConfig.JWT_SECRET, "1d");

  return res.status(StatusCodes.OK).json(
    customResponse({
      data: { user: foundeduser, accessToken },
      message: ReasonPhrases.OK,
      status: StatusCodes.OK,
      success: true,
    })
  );
};

// @GET logout
export const logout = async (req, res, next) => {};
