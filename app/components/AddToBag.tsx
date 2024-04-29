"use client";

import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { type cartNewItem, useShoppingCart } from "../../store/cart-provider";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";

export default function AddToBag({
    id,
    imageUrl,
    description,
    name,
    category,
    slug,
    price,
    blends,
}: cartNewItem) {
    const { addItem, addNItem, handleCartClick } = useShoppingCart();

    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => setQuantity(quantity + 1);
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const product = {
        id: id,
        name: name,
        description: description,
        price: price,
        imageUrl: imageUrl,
        category: category,
        slug: slug,
        blends: blends,
    };
    return (
        <div className="flex flex-col justify-start w-full">
            <div className="flex justify-start">
                <ToggleGroup type="single">
                    {blends.map((blend) => (
                        <ToggleGroupItem value={blend}>{blend}</ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </div>

            <div className="flex items-center gap-2 m-4">
                <Button variant="outline" onClick={decrementQuantity}>
                    <Minus size={16} />
                </Button>
                <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="border text-center w-8"
                />
                <Button variant="outline" onClick={incrementQuantity}>
                    <Plus size={16} />
                </Button>

                <Button
                    onClick={() => {
                        console.log("Add to cart clicked");
                        addNItem(product, quantity);
                        console.log("Toggle cart");
                        handleCartClick();
                    }}
                >
                    Add To Cart
                </Button>
            </div>
        </div>
    );
}
