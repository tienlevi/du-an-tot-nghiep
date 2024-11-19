export type variationAttribute = {
    _id: string;
    name: string;
    key: string;
    value: string;
};
export interface ICartItem {
    _id: string;
    color: string;
    image: string;
    isActive: boolean;
    price: number;
    productId: {
        _id: string;
        name: string;
    };
    stock: number;
    variantAttributes: variationAttribute[];
}

export type ICartItemsResponse = {
    productVariation: ICartItem;
    quantity: number;
};

export type ICartDataResponse = {
    items: ICartItemsResponse[];
    userId: string;
    _id: string;
};
