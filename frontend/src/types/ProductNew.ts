
interface Variant {
    _id: string;
    color: {
        _id: string;
        hex: string;
        name: string;
    };
    size: {
        _id: string;
        name: string;
    };
    stock: number;
    image: string;
    imageUrlRef: string;
}

export type IProduct = {
    _id: string;
    name: string;
    category: string;
    discount: number;
    price: number;
    variants: Variant[];
    description: string;
    sold: number;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}