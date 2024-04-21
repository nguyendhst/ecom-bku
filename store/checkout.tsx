import { createContext, useContext, useState } from "react";
import type { cartDetails } from "./cart-provider";

export type CheckoutForm = {
    customer: {
        name: string;
        email: string;
        phone: string;
        delivery: {
            province: string;
            district: string;
            ward: string;
            street: string;
            address: string;
            note: string;
        };
    };
    cart: cartDetails;
    discount: {
        code: string;
    };
    delivery_option: {
        type: "fast" | "standard";
        time: string;
    };
    payment: {
        type: "cod" | "zalopay" | "momo";
    };
};

export type CheckoutFormContextValue = {
    formData: CheckoutForm;
    setFormData: React.Dispatch<React.SetStateAction<CheckoutForm>>;
    setCustomerData: (data: any) => void;
    setDeliveryOption: (data: {
        type: "fast" | "standard";
        time: string;
    }) => void;
    setPaymentOption: (data: { type: "cod" | "zalopay" | "momo" }) => void;
    setDiscountCode: (code: string) => void;
    getTotalWithoutDiscount: () => number;
    getDiscountAmount: () => number;
    getTotalAmount: () => number;
};

const initialValues: CheckoutForm = {
    customer: {
        name: "Test",
        email: "",
        phone: "",
        delivery: {
            province: "",
            district: "",
            ward: "",
            street: "",
            address: "",
            note: "",
        },
    },
    cart: {},
    discount: {
        code: "",
    },
    delivery_option: {
        type: "fast",
        time: "",
    },
    payment: {
        type: "cod",
    },
};

const CheckoutFormContext = createContext<CheckoutFormContextValue>({
    formData: initialValues,
    setFormData: () => {},
    setCustomerData: () => {},
    setDeliveryOption: () => {},
    setPaymentOption: () => {},
    setDiscountCode: () => {},
    getTotalWithoutDiscount: () => 0,
    getDiscountAmount: () => 0,
    getTotalAmount: () => 0,
});

export function CheckoutFormProvider({
    children,
    cartDetails,
}: {
    children: any;
    cartDetails: cartDetails;
}) {
    const [formData, setFormData] = useState<CheckoutForm>({
        ...initialValues,
        cart: cartDetails,
    });

    // set customer data
    const setCustomerData = (data: any) => {
        setFormData((prev: any) => ({
            ...prev,
            customer: data,
        }));
    };

    const setDeliveryOption = (data: {
        type: "fast" | "standard";
        time: string;
    }) => {
        setFormData((prev: any) => ({
            ...prev,
            delivery_option: data,
        }));
    };

    const setPaymentOption = (data: { type: "cod" | "zalopay" | "momo" }) => {
        setFormData((prev: any) => ({
            ...prev,
            payment: data,
        }));
    };

    const setDiscountCode = (code: string) => {
        setFormData((prev: any) => ({
            ...prev,
            discount: {
                code,
            },
        }));
    };

    const getDiscountAmount = () => {
        const discount = formData.discount.code ? 10000 : 0;

        return discount;
    };

    const getTotalWithoutDiscount = () => {
        const total = Object.values(cartDetails).reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);

        return total;
    };

    const getTotalAmount = () => {
        const total = getTotalWithoutDiscount();
        const discount = getDiscountAmount();

        const totalAfterDiscount = total - discount;

        return totalAfterDiscount;
    };

    // The value that will be provided to the children
    const contextValue: CheckoutFormContextValue = {
        formData,
        setFormData,
        setCustomerData,
        setDeliveryOption,
        setPaymentOption,
        setDiscountCode,
        getTotalWithoutDiscount,
        getDiscountAmount,
        getTotalAmount,
    };

    return (
        <CheckoutFormContext.Provider value={contextValue}>
            {children}
        </CheckoutFormContext.Provider>
    );
}

export function useCheckoutForm() {
    const context = useContext(CheckoutFormContext);

    if (!context) {
        throw new Error(
            "useCheckoutForm must be used within a CheckoutFormProvider"
        );
    }

    return context;
}
