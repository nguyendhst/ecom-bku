const coffeeSchema = {
    name: "coffee",
    title: "Coffee",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Coffee Name",
            type: "string",
        },
        {
            name: "product",
            type: "reference",
            to: [{ type: "product" }],
        },
        {
            name: "blends",
            title: "Blends",
            type: "array",
            of: [{ type: "reference", to: [{ type: "blend" }] }],
        },
    ],
};

export default coffeeSchema;
