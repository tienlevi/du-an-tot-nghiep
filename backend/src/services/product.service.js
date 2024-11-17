import Product from "../models/product.js";
import APIQuery from "../utils/APIQuery.js";
import { removeUploadedFile, uploadFiles } from "../utils/upload.js";

export const getAllProducts = async (query) => {
  const features = new APIQuery(
    Product.find().populate("variants.color").populate("variants.size"),
    query
  );
  features.filter().sort().limitFields().search().paginate();

  const [products, totalDocs] = await Promise.all([
    features.query,
    features.count(),
  ]);
  return { products, totalDocs };
};
export const getBestSellingProducts = async () => {
  const products = await Product.find()
    .populate("variants.color")
    .populate("variants.size")
    .sort({ sold: -1 })
    .limit(10);
  return products;
};
export const getDiscountProducts = async () => {
  const products = await Product.find()
    .populate("variants.color")
    .populate("variants.size")
    .sort({ sdiscountold: -1 })
    .limit(10);
  return products;
};

export const createProduct = async (productData, files) => {
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
  return newProduct;
};

// @PUT: updateProduct
export const updateProduct = async (
  productId,
  oldImageUrlRefs,
  files,
  variants,
  productNew
) => {
  const product = await Product.findById(productId);
  let newVariants;
  if (!product)
    throw new NotFoundError(
      `${ReasonPhrases.NOT_FOUND} product with id: ${productId}`
    );

  // @upload images
  if (files && files["variantImages"]) {
    const { fileUrls, fileUrlRefs, originNames } = await uploadFiles(
      files["variantImages"]
    );
    // @map new images to variants
    newVariants = fileUrls.map((item, i) => {
      const variation = variants.find((obj) => {
        const originName = originNames[i];
        const fileName = obj.imageUrlRef;
        return fileName === originName;
      });
      if (variation) {
        return { ...variation, image: item, imageUrlRef: fileUrlRefs[i] };
      } else {
        return variants[i];
      }
    });
  }

  // @remove old images in firebase storage
  if (oldImageUrlRefs || oldImageUrlRefs.length > 0) {
    await Promise.all(
      oldImageUrlRefs.map(async (ref) => {
        await removeUploadedFile(ref);
      })
    );
  }
  const tags = productNew.tags ? productNew.tags.split(",") : product.tags;

  // @update product
  product.set({ ...productNew, variants: newVariants, tags });
  return await product.save();
};

export const getProductById = async (productId) => {
  const product = await Product.findById(productId)
    .populate("variants.color")
    .populate("variants.size");
  if (!product)
    throw new NotFoundError(
      `${ReasonPhrases.NOT_FOUND} product with id: ${productId}`
    );

  return product;
};
