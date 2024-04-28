"use client";

import { Button } from "@/components/ui/button";
import { cartNewItem, useShoppingCart } from "../../store/cart-provider";

export default function AddToBag({
    id,
    imageUrl,
    description,
    name,
    category,
    slug,
    price,
}: cartNewItem) {
    const { addItem, handleCartClick } = useShoppingCart();

    const product = {
        id: id,
        name: name,
        description: description,
        price: price,
        imageUrl: imageUrl,
        category: category,
        slug: slug,
    };
    return (
        <Button
            onClick={() => {
				console.log('Add to cart clicked');
                addItem(product);
				console.log('Toggle cart');
                handleCartClick();
            }}
        >
            Add To Cart
        </Button>
    );
}
