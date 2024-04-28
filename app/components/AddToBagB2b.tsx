"use client";

import { Button } from "@/components/ui/button";
import { cartNewItem, useShoppingCart } from "../../store/cart-provider";

export default function AddToBagB2b({
    id,
    imageUrl,
    description,
    name,
    category,
    slug,
    price,
    login,
    mustLogin
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
        login: login,
        mustLogin: mustLogin
    };
    return (
        <Button
            onClick={() => {
				console.log('Add to cart clicked');
                addItem(product);
				console.log('Toggle cart');
                if (!mustLogin){
                    handleCartClick();
                } 
                if (login){
                    handleCartClick();
                }
            }}
        >
            Add To Cart
        </Button>
    );
}
