import { StatusCodes } from "http-status-codes";
import Product from "../models/product";

export const create = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(StatusCodes.CREATED).json(product);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const getProducts = async (req, res) => {
  try {
    const data = await Product.find(req.body);
    return res.status(StatusCodes.OK).json(data);
  } catch (error) {
    console.log(error);
  }
};

// export const getAllProducts = async (req, res) => {
//   const {
//     _page = 1,
//     _limit = 10,
//     _sort = "createdAt",
//     _order = "asc",
//     _expand,
//   } = req.query;
//   const options = {
//     page: _page,
//     limit: _limit,
//     sort: { [_sort]: _order === "desc" ? -1 : 1 },
//   };
//   const populateOptions = _expand ? [{ path: "category", select: "name" }] : [];
//   try {
//     const result = await Product.paginate(
//       { categoryId: null },
//       { ...options, populate: populateOptions }
//     );
//     if (result.docs.length === 0) throw new Error("No products found");
//     const response = {
//       data: result.docs,
//       pagination: {
//         currentPage: result.page,
//         totalPages: result.totalPages,
//         totalItems: result.totalDocs,
//       },
//     };
//     return res.status(200).json(response);
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy sản phẩm nào!" });
    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
//xóa sản phẩm
export const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product not found" });
    return res
      .status(StatusCodes.OK)
      .json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product not found" });
    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const related = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.categoryId,
      _id: { $ne: req.params.productId },
    });
    return res.status(StatusCodes.OK).json(products);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

// iphone 13 product max => /product/iphone-13-product-max
// GET /product/:slug
