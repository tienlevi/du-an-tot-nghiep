import slugify from "slugify";
import Category from "../models/category";
import Product from "../models/product";
import { StatusCodes } from "http-status-codes";

// Tạo danh mục mới
export const create = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Tên danh mục là bắt buộc!" });
    }

    const slug = slugify(name, { lower: true });
    const category = await Category.create({
      name,
      slug,
      image,
    });

    return res.status(StatusCodes.CREATED).json(category);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

// Lấy tất cả danh mục
export const getAll = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không có danh mục nào!" });
    }
    return res.status(StatusCodes.OK).json({ data: categories });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

// Lấy danh mục theo ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy danh mục nào!" });
    }

    const products = await Product.find({ category: req.params.id });
    return res.status(StatusCodes.OK).json({
      category,
      products,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

// Xóa danh mục theo ID
export const deleteCategoryById = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy danh mục nào để xóa!" });
    }
    return res
      .status(StatusCodes.OK)
      .json({ message: "Danh mục đã được xóa thành công!" });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

// Cập nhật danh mục theo ID
export const updateCategoryById = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Tên danh mục là bắt buộc!" });
    }

    const slug = slugify(name, { lower: true });
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, slug, image },
      { new: true }
    );

    if (!category) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Danh mục không tìm thấy!" });
    }

    return res.status(StatusCodes.OK).json(category);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

// Tìm sản phẩm theo danh mục
export const getProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.find({ category: id });

    if (products.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Không có sản phẩm nào trong danh mục này!" });
    }

    return res.status(StatusCodes.OK).json(products);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};