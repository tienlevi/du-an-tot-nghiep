import { StatusCodes } from "http-status-codes";
import User from "../models/user";
// Function to get user profiles
export const getUserProfile = async (req, res) => {
  try {
    const data = await User.find(req.body);
    console.log(data);
    return res.status(StatusCodes.OK).json(data);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

// Function to lock a user account
export const lockUserAccount = async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(
      req.params.id,
      { isLocked: true }, // Assuming `isLocked` is the field used to lock the account
      { new: true }
    );
    return res.status(StatusCodes.OK).json(data);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to lock the user account", error });
  }
};

// Function to unlock a user account
export const unLockUserAccount = async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(
      req.params.id,
      { isLocked: false }, // Reverting `isLocked` to unlock the account
      { new: true }
    );
    return res.status(StatusCodes.OK).json(data);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to unlock the user account", error });
  }
};
