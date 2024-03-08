export const productSchema = {
    name: "product",
    type: "document",
    title: "Product",
    fields: [
        {
            name: "name",
            type: "string",
            title: "Name of Product",
        },
        {
            name: "category",
            title: "Category",
            type: "reference",
            to: [{ type: "category" }],
        },
        {
            name: "images",
            type: "array",
            title: "Product Images",
            of: [{ type: "image" }],
        },
        {
            name: "description",
            type: "text",
            title: "Description of product",
        },
        {
            name: "slug",
            type: "slug",
            title: "Product Slug",
            options: {
                source: "name",
            },
        },
        {
            name: "price",
            title: "Price",
            type: "number",
        },
        {
            name: "price_id",
            title: "Stripe Price ID",
            type: "string",
        },
    ],
};

export default productSchema;
