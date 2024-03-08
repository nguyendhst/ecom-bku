export const accessoriesSchema = {
    name: "accessories",
    title: "Accessories",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Accessory Name",
            type: "string",
        },
        {
            name: "product",
            type: "reference",
            to: [{ type: "product" }],
        },
    ],
};

export default accessoriesSchema;
