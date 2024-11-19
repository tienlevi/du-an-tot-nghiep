import { UploadFile } from 'antd';
import { IProductForm, IThumbnailAntd } from '@/types/Product';
import convertData from './convertData';
import { DataTypeConvert } from '@/constants/enum';

type IHandleEditProductProp = {
    imagesInit: UploadFile<any>[];

    productId: string;
    data: IProductForm;
    updateProduct: ({
        data,
        productId,
    }: {
        data: FormData;
        productId: string;
    }) => void;
    updateProductVariant: ({
        data,
        variantId,
    }: {
        data: FormData;
        variantId: string;
    }) => void;
    createProductVariant: (data: FormData) => void;
};

export const handleEditProduct = async ({
    imagesInit,
    productId,
    data,
    updateProduct,
    updateProductVariant,
    createProductVariant,
}: IHandleEditProductProp) => {
    const dataTransfer = new DataTransfer();
    const formDataUpdateProduct = new FormData();
    const oldImages = [];
    const oldImagesRefs = [];
    const {
        name,
        images,
        thumbnail,
        description,
        variations,
        attributes,
        isHide,
        brandId: brandIdData,
        categoryId: categoryIdData,
    } = data;
    const attributesData = convertData({
        data: attributes,
        to: DataTypeConvert.raw,
    });
    const firstElement = 0;
    console.log(attributes, 'attributes');
    if (variations) {
        variations.forEach((value) => {
            if (value._id) {
                // Update product variant
                const formDataUpdateProductVariant = new FormData();
                if (value.thumbnail?.fileList?.[firstElement]?.originFileObj) {
                    console.log(value.thumbnail?.fileList?.[firstElement]);
                    formDataUpdateProductVariant.append(
                        'image',
                        value.thumbnail?.fileList?.[firstElement]
                            .originFileObj as File,
                    );
                }
                delete value.thumbnail;
                const {
                    imageUrlRef,
                    price,
                    stock,
                    isActive,
                    ...variantAttributesObj
                } = value;
                const variantAttributes = variantAttributesObj.variantAttributes
                    ? convertData({
                          data: variantAttributesObj.variantAttributes,
                          to: DataTypeConvert.raw,
                      })
                    : [];
                const variantFinal = {
                    imageUrlRef,
                    price,
                    stock,
                    isActive,
                    variantAttributes,
                };
                formDataUpdateProductVariant.append(
                    'variantString',
                    JSON.stringify(variantFinal),
                );
                updateProductVariant({
                    data: formDataUpdateProductVariant,
                    variantId: value._id,
                });
            } else {
                // Create product variant
                const formDataCreateProductVariant = new FormData();
                if (value.thumbnail?.fileList?.[firstElement]?.originFileObj) {
                    formDataCreateProductVariant.append(
                        'image',
                        value.thumbnail?.fileList?.[firstElement]
                            .originFileObj as File,
                    );
                }
                delete value.thumbnail;
                const {
                    imageUrlRef,
                    price,
                    stock,
                    isActive,
                    ...variantAttributesObj
                } = value;
                const variantAttributes = convertData({
                    data: variantAttributesObj.variantAttributes,
                    to: DataTypeConvert.raw,
                });

                const variantFinal = {
                    imageUrlRef,
                    price,
                    isActive,
                    stock,
                    variantAttributes,
                };
                formDataCreateProductVariant.append(
                    'variantString',
                    JSON.stringify(variantFinal),
                );
                formDataCreateProductVariant.append('productId', productId);
                createProductVariant(formDataCreateProductVariant);
            }
        });

        formDataUpdateProduct.append('name', name);
        formDataUpdateProduct.append('isHide', String(isHide));
        formDataUpdateProduct.append(
            'attributes',
            JSON.stringify(attributesData),
        );

        // Update product
        /* eslint-disable */
        if (images?.fileList) {
            for (const file of images?.fileList) {
                if ((file as any).originFileObj) {
                    dataTransfer.items.add((file as any).originFileObj as File);
                    const firstImage = dataTransfer.files[firstElement];
                    formDataUpdateProduct.append('images', firstImage);
                    dataTransfer.items.clear();
                } else {
                    if ((file as any).status === 'done') {
                        oldImages.push((file as any).url as string);
                        oldImagesRefs.push((file as any).uid as string);
                    }
                }
            }
        } else {
            imagesInit.map((file) => {
                if ((file as any).status === 'done') {
                    oldImages.push((file as any).url as string);
                    oldImagesRefs.push((file as any).uid as string);
                }
            });
        }

        if (thumbnail?.file) {
            if (
                (thumbnail?.fileList[firstElement] as IThumbnailAntd)
                    .originFileObj
            ) {
                formDataUpdateProduct.append(
                    'thumbnail',
                    (thumbnail?.fileList[firstElement] as IThumbnailAntd)
                        ?.originFileObj as File,
                );
            }
        }
        formDataUpdateProduct.append('oldImages', JSON.stringify(oldImages));
        formDataUpdateProduct.append(
            'oldImageRefs',
            JSON.stringify(oldImagesRefs),
        );

        formDataUpdateProduct.append('categoryId', categoryIdData);
        formDataUpdateProduct.append('brandId', brandIdData);

        formDataUpdateProduct.append('description', description || '');
        updateProduct({ data: formDataUpdateProduct, productId });
    }
};
