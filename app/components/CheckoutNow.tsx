"use client";

import { Button } from "@/components/ui/button";
import { cartNewItem, useShoppingCart } from "../../store/cart-provider";

export default function CheckoutNow({
	id,
	imageUrl,
    description,
    name,
	category,
	slug,
    price,
}: cartNewItem) {
  const { checkoutSingleItem } = useShoppingCart();

  function buyNow(priceId: string) {
    checkoutSingleItem(priceId);
  }

  const product = {
    name: name,
    description: description,
    price: price,
    image: imageUrl,
  };
  return (
    <Button
      variant="outline"
      onClick={() => {
        buyNow(id);
      }}
    >
      Checkout Now
    </Button>
  );
}
