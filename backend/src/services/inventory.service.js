import { NotFoundError } from "../errors/customError.js";
import Product from "../models/product.js";

export const updateStockOnCreateOrder = async (dataItems) => {
  return await Promise.all(
    dataItems.map(async (item) => {
      const productTarget = await Product.findOne({
        _id: item.productId,
      });
      if (!productTarget) {
        throw new NotFoundError("Product not found");
      }
      const newVariants = productTarget.variants.map((variant) => {
        if (variant._id.toString() === item.variantId.toString()) {
          variant.stock -= item.quantity;
        }
        return variant;
      });
      productTarget.variants = newVariants;
      await productTarget.save();
    })
  );
};

export const updateStockOnCancelOrder = async (dataItems) => {
  return await Promise.all(
    dataItems.map(async (item) => {
      await ProductVariation.updateOne(
        { _id: item.productVariationId },
        {
          $inc: {
            sold: -item.quantity, // Decrement "sold" by item.quantity
            stock: item.quantity, // Increment "stock" by item.quantity
          },
        }
      );
    })
  );
};
