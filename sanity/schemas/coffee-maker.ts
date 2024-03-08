export const coffeeMakerSchema = {
    name: "coffee-maker",
    title: "Coffee Maker",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Coffee Maker Name",
            type: "string",
        },
        {
            name: "product",
            type: "reference",
            to: [{ type: "product" }],
        },
        {
            name: "brand",
            title: "Brand",
            type: "string",
        },
    ],
};

export default coffeeMakerSchema;
