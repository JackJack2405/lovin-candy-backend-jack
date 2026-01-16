import { User } from "./users.model.js"
import mongoose from "mongoose";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return next(error);
  }
};

export const createUser = async (req, res, next) => {
  const { username, email, password, first_name, last_name, address, role } = req.body;

  try {
    const doc = await User.create({ username, email, password, first_name, last_name, address, role });

    return res.status(201).json({
      success: true,
      data: doc,
    });
  } catch (error) {
    return next(error);
  }
};


export const updateAddress = async (req, res, next) => {
  const { id } = req.params;
  const { address } = req.body;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id",
      });
    }

  
    const trimmed = String(address || "").trim();
    if (!trimmed) {
      return res.status(400).json({
        success: false,
        message: "address is required",
      });
    }

    
    const updated = await User.findByIdAndUpdate(
      id,
      { address: trimmed },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    return next(error);
  }
};
