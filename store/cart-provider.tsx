"use client";

import React, {
    Reducer,
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import { productAttributes } from "../app/interface";
import { generateHMAC, toVND } from "../lib/utils";
import {
    appid,
    appuser,
    generateAppTransID,
    generateHMACSignature,
} from "../lib/zalopay";
import { useRouter } from "next/navigation";
import qs from "qs";

type cart = {
    addItem: (item: cartNewItem) => void;
    currency: string;
    cartCount: number;
    checkoutSingleItem: (itemId: string) => void;
    shouldDisplayCart: boolean;
    handleCartClick: () => void;
    cartDetails: cartDetails;
    removeItem: (itemId: string) => void;
    totalPrice: number;
    redirectToCheckout: () => Promise<{ success: boolean; error: string }>;
};

type cartEntryAttributes = {
    quantity: number;
    totalPrice: number;
    formattedTotalPrice: string;
    timeAdded: string;
} & productAttributes;

type cartEntry = { id: string } & cartEntryAttributes;

export type cartNewItem = { id: string } & productAttributes;

type cartDetails = {
    [key: string]: cartEntry;
};

type cartState = {
    cartCount: number;
    shouldDisplayCart: boolean;
    cartDetails: cartDetails;
    totalPrice: number;
};

type cartAction = {
    type: "ADD_ITEM" | "REMOVE_ITEM" | "REDIRECT_TO_CHECKOUT" | "TOGGLE_CART";
    payload?: cartNewItem;
    itemId: string;
};

type cartReducer = Reducer<cartState, cartAction>;

const cartReducer: cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            console.log("ADD_ITEM");
            // if payload is undefined, return state
            if (!action.payload) return state;

            const itemToAdd: cartNewItem = action.payload;
            // find the item in the cart
            const existingItem = state.cartDetails[itemToAdd.id];
            console.log("existingItem", existingItem);
            // if the item is already in the cart, update the quantity
            if (existingItem) {
                const updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1,
                    totalPrice:
                        existingItem.price * (existingItem.quantity + 1),
                    formattedTotalPrice: toVND(
                        existingItem.price * (existingItem.quantity + 1)
                    ),
                };
                console.log("updatedItem", updatedItem);
                return {
                    ...state,
                    cartCount: state.cartCount + 1,
                    totalPrice: state.totalPrice + existingItem.price,
                    cartDetails: {
                        ...state.cartDetails,
                        [itemToAdd.id]: updatedItem,
                    },
                };
            }
            // if the item is not in the cart, add it
            const newItem: cartEntry = {
                ...itemToAdd,
                quantity: 1,
                totalPrice: itemToAdd.price,
                formattedTotalPrice: toVND(itemToAdd.price),
                timeAdded: new Date().toISOString(),
            };
            return {
                ...state,
                cartCount: state.cartCount + 1,
                totalPrice: state.totalPrice + newItem.price,
                cartDetails: {
                    ...state.cartDetails,
                    [itemToAdd.id]: newItem,
                },
            };

        case "REMOVE_ITEM":
            console.log("REMOVE_ITEM", state);
            const itemIdToRemove: string = action.itemId;

            const { [itemIdToRemove]: removed, ...remainingCartDetails } =
                state.cartDetails;

            const updatedTotalPrice =
                state.totalPrice - removed.price < 0
                    ? 0
                    : state.totalPrice - removed.price;

            if (removed.quantity > 1) {
                const updatedCart = {
                    ...state.cartDetails,
                    [itemIdToRemove]: {
                        ...removed,
                        quantity: removed.quantity - 1,
                        totalPrice: removed.price * (removed.quantity - 1),
                        formattedTotalPrice: toVND(
                            removed.price * (removed.quantity - 1)
                        ),
                    },
                };
                return {
                    ...state,
                    totalPrice: updatedTotalPrice,
                    cartDetails: updatedCart,
                };
            }

            const updatedCardCount = state.cartCount - 1;

            return {
                ...state,
                cartCount: updatedCardCount,
                totalPrice: updatedTotalPrice,
                cartDetails: remainingCartDetails,
            };

        case "TOGGLE_CART":
            return {
                ...state,
                shouldDisplayCart: !state.shouldDisplayCart,
            };

        case "REDIRECT_TO_CHECKOUT":
            // Call to payment gateway
            console.log("Redirecting to checkout");
            return state;
        default:
            return state;
    }
};

const getCartFromLocalStorage = (): cartState => {
    if (typeof window !== "undefined") {
        const cart = localStorage.getItem("cart");
        if (cart) {
            return JSON.parse(cart);
        }
    }
    return {
        cartCount: 0,
        shouldDisplayCart: false,
        cartDetails: {},
        totalPrice: 0,
    };
};

// Define the context
const ShoppingCartContext = createContext<cart | undefined>(undefined);
const currency = "VND";

const initialCartState: cartState = getCartFromLocalStorage();

// Define the provider component
export function ShoppingCartProvider({ children }: any) {
    const [state, dispatch] = useReducer(cartReducer, initialCartState);
    const router = useRouter();

    useEffect(() => {
        // save cart to local storage
        if (typeof window !== "undefined") {
            localStorage.setItem("cart", JSON.stringify(state));
        }
    }, [state]);

    const handleCartClick = () => {
        console.log("handleCartClick");
        dispatch({ type: "TOGGLE_CART", itemId: "" });
    };

    const addItem = (item: cartNewItem) => {
        console.log(item, state.cartDetails);
        // Add item to cartDetails and update cartCount and totalPrice
        dispatch({ type: "ADD_ITEM", payload: item, itemId: item.id });
    };

    const removeItem = (itemId: string) => {
        // Remove item from cartDetails and update cartCount and totalPrice
        dispatch({ type: "REMOVE_ITEM", itemId: itemId });
    };

    const redirectToCheckout = async (): Promise<{
        success: boolean;
        error: string;
    }> => {
        dispatch({ type: "REDIRECT_TO_CHECKOUT", itemId: "" });

        try {
            const base = "https://sb-openapi.zalopay.vn/v2/create";
            // create a new order
            const time = new Date();
            const embed_data = `{"promotioninfo":"","merchantinfo":"du lieu rieng cua ung dung"}`;
            const item = `[{"itemid":"knb","itename":"kim nguyen bao","itemprice":198400,"itemquantity":1}]`;
            const amount = "50000";
      
            const payload = {
                app_id: appid,
                app_user: appuser,
                app_trans_id: generateAppTransID(time),
                app_time: time.getTime(),
                amount: amount,
                item: item,
                description: "Thanh toan don hang",
                bank_code: "zalopayapp",
                embed_data: embed_data,
            };
			
			const mac = await generateHMACSignature(payload);

			const request = {
				...payload,
				mac: mac,
			}

            console.log("request", request);
            try {
                const response = await fetch(base, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    mode: "no-cors",
                    body: qs.stringify(request),
                });

                if (!response.ok) {
                    const text = await response.text();
                    console.log("Server response:", text);
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                // get order_url and redirect to it
                const order_url = data.order_url;
                console.log("order_url", order_url);
                router.push(order_url);
            } catch (error: unknown) {
                console.log("error", error);
            }

            return { success: true, error: "" };
        } catch (error: unknown) {
            return { success: false, error: error as string };
        }
    };
    const checkoutSingleItem = (itemId: string) => {
        // Redirect to checkout page with only the single item
        Object.keys(state.cartDetails).forEach((id) => {
            if (id !== itemId) {
                dispatch({ type: "REMOVE_ITEM", itemId: id });
            }
        });

        // Then redirect to checkout
        dispatch({ type: "REDIRECT_TO_CHECKOUT", itemId: "" });
    };

    const value = {
        addItem,
        currency,
        checkoutSingleItem,
        handleCartClick,
        removeItem,
        redirectToCheckout,
        ...state,
    };

    return (
        <ShoppingCartContext.Provider value={value}>
            {children}
        </ShoppingCartContext.Provider>
    );
}

// Define the custom hook
export function useShoppingCart() {
    const context = useContext(ShoppingCartContext);

    if (context === undefined) {
        throw new Error(
            "useShoppingCart must be used within a ShoppingCartProvider"
        );
    }

    return context;
}
