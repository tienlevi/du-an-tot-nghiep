import Product from "../models/product.js";
import { uploadFiles } from "../utils/upload.js";

export const getALlProducts = async () => {
  return await Product.find();
};

export const createProduct = async (productData, files) => {
  console.log(productData);
  let variationList;

  // @upload images
  if (files && files["variantImages"]) {
    const { fileUrls, fileUrlRefs, originNames } = await uploadFiles(
      files["variantImages"]
    );
    variationList = fileUrls.map((item, i) => {
      const variation = JSON.parse(productData.variantString).find((obj) => {
        const originName = originNames[i];
        const fileName = obj.imageUrlRef;
        return fileName === originName;
      });
      if (variation) {
        return { ...variation, image: item, imageUrlRef: fileUrlRefs[i] };
      }
    });
  }

  delete productData.variantImages;
  delete productData.variantString;

  // @add variants to product
  const newProduct = new Product({
    ...productData,
    variants: variationList,
  });

  await newProduct.save();
  return await Product.create(productData);
};

// @Patch: updateProduct
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    throw new NotFoundError(
      `${ReasonPhrases.NOT_FOUND} product with id: ${req.params.id}`
    );

  product.set({ ...req.body });
  await product.save();

  return res.status(StatusCodes.OK).json(
    customResponse({
      data: product,
      success: true,
      status: StatusCodes.OK,
      message: ReasonPhrases.OK,
    })
  );
};

export const getProductById = async (productId) => {
  return await Product.findById(productId);
};
