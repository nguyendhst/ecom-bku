import type { SchemaTypeDefinition } from "sanity";
import coffeeSchema from "./schemas/coffee";
import heroImageSchema from "./schemas/hero-image";
import blendSchema from "./schemas/blend";
import accessoriesSchema from "./schemas/accessories";
import coffeeMakerSchema from "./schemas/coffee-maker";
import productSchema from "./schemas/product";
import { categorySchema } from "./schemas/category";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        productSchema,
        categorySchema,
        coffeeSchema,
        blendSchema,
        accessoriesSchema,
        coffeeMakerSchema,
        heroImageSchema,
    ],
};
