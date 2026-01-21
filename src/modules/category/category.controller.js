import { Category } from "./category.model.js";

export const getCategory = async (req, res, next) => {
  try {
    const docs = await Category.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: docs });
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const doc = await Category.create(req.body);
    return res.status(201).json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const doc = await Category.findByIdAndUpdate(
      req.params.id, 
      req.body, { new: true });
    if (!doc) 
      return res.status(404).json({ success: false, message: "Category not found" });
    return res.status(200).json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const doc = await Category.findByIdAndDelete(req.params.id);
    if (!doc) 
      return res.status(404).json({ success: false, message: "Category not found" });
      return res.status(200).json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

export const getCategoriesWithProducts = async (req, res, next) => {
  try {
    const data = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "name",
          foreignField: "category",
          as: "products_in_category"
        }
      }
    ]);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};