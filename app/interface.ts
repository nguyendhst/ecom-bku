export interface simplifiedProduct {
    _id: string;
    imageUrl: string;
    price: number;
    slug: string;
    categoryName: string;
    name: string;
}

export interface fullProduct {
    _id: string;
    images: any;
    price: number;
    slug: string;
    categoryName: string;
    name: string;
    description: string;
    price_id: string;
}

export type item = {
    _id: string;
    name: string;
    product: product;
};

export type product = {
    id: string;
} & productAttributes;

export type productAttributes = {
    name: string;
    category: string;
    price: number;
    slug: string;
    description: string;
    imageUrl: string;
};
