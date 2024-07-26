import slugify from "slugify";
import Category from "../models/category";
import Product from "../models/product";

import { StatusCodes } from "http-status-codes";

export const create = async (req, res) => {
    try {

        if (!req.body.name) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Tên danh mục là bắt buộc!" });
        }

        const slug = slugify(req.body.name, { lower: true });
        const category = await Category.create({
            name: req.body.name,
            slug: slug,
        });

        return res.status(StatusCodes.CREATED).json(category);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};


export const getAll = async (req, res) => {
    try {
        const categories = await Category.find({});
        if (categories.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không có danh mục nào!" });
        }
        return res.status(StatusCodes.OK).json({ data: categories });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy danh mục nào!" });
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

export const deleteCategoryById = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy danh mục nào để xóa!" });
        }
        return res.status(StatusCodes.OK).json({ message: "Danh mục đã được xóa thành công!" });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

export const updateCategoryById = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Tên danh mục là bắt buộc!" });
        }

        const slug = slugify(req.body.name, { lower: true });
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, slug: slug },
            { new: true }
        );

        return res.status(StatusCodes.OK).json(category);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

