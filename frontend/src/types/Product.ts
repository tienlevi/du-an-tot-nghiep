export type Product = {
    _id: string;
    name: string;
    category: string;
    discount: number;
    price: number;
    variants: {
        color: string;
        size: string;
        stock: number;
        image: string;
        imageUrlRef: string;
        _id: string;
    }[];
    description: string;
    sold: number;
    tags: string[];
    createdAt: string;
    updatedAt: string;
};

export type IAttribute = {
    _id?: string;
    type: string;
    name: string;
    attributeKey: string;
    isRequired: boolean;
    isVariant: boolean;
    values?: string[];
};

export interface IThumbnailAntd extends File {
    uid: string;
    originFileObj: File;
}

export type IProductVariation = {
    _id?: string;
    thumbnail?: {
        file: File;
        fileList: IThumbnailAntd[];
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
    imageUrlRef: string;
    price: number;
    stock: number;
};

export type IProductFiles = {
    file: IThumbnailAntd;
    fileList: FileList;
};

export type IProductForm = {
    name: string;
    isHide: boolean;
    thumbnail: IProductFiles | null;
    images: IProductFiles | null;
    categoryId: string;
    brandId: string;
    description: string;
    attributes: IAttribute[];
    variations: IProductVariation[];
};

export type IProductItem = {
    isHide: boolean;
    reviewCount: number;
    _id: string;
    name: string;
    discount: number;
    images: string[];
    imageUrlRefs: string[];
    thumbnail: string;
    thumbnailUrlRef: string[];
    status: string;
    isAvailable: boolean;
    isDeleted: boolean;
    attributes: {
        key: string;
        value: string;
        _id?: string;
    }[];
    rating: number;
    reviewIds: string[];
    variationIds: {
        _id: string;
        price: number;
        image: string;
        stock: number;
        sku: string;
        color: string;
        productId: string;
    }[];
    brandId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
};
