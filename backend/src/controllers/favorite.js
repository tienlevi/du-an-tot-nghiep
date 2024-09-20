import Favorite from "../models/favorite";
import Product from "../models/product";
import User from "../models/user";
import { StatusCodes } from "http-status-codes";

//thêm sản phẩm yêu thích
export const addFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    
 
    const product = await Product.findById(productId);
    if (!product) return res.status(StatusCodes.NOT_FOUND).json({ message: "Product không tồn tại" });


    const user = await User.findById(userId);
    if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: "User không tồn tại" });
    
 
    const existingFavorite = await Favorite.findOne({ userId, productId });
    if (existingFavorite) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Product already in favorites" });
    }

    const favorite = await Favorite.create({ userId, productId });
    return res.status(StatusCodes.CREATED).json(favorite);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};


//xóa sản phẩm yêu thích 
export const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const favorite = await Favorite.findOneAndDelete({ _id: id });
    if (!favorite) return res.status(StatusCodes.NOT_FOUND).json({ message: "Favorite entry not found" });

    return res.status(StatusCodes.OK).json({ message: "Favorite removed successfully" });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
//lấy sản phẩm yêu thích theo id
// Lấy sản phẩm yêu thích theo userId
export const getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    // Tìm các sản phẩm yêu thích theo userId và populate để lấy chi tiết sản phẩm
    const favorites = await Favorite.find({ userId }).populate('productId');
    if (!favorites.length) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "No favorites found" });
    }

    // Trả về danh sách sản phẩm yêu thích
    const favoriteProducts = favorites.map(fav => fav.productId); // Populate sẽ giúp lấy productId là một object đầy đủ
    return res.status(StatusCodes.OK).json(favoriteProducts);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

