"use client";

import { createContext, useContext, useRef, useState } from "react";
import { type cartDetails, useShoppingCart } from "../../store/cart-provider";
import { CustomerInfoForm } from "./_components/customer-info-form";
import { PaymentOptionsForm } from "./_components/payment-options-form";
import { DeliveryOptionsForm } from "./_components/delivery-options-form";
import { OrderSummaryForm } from "./_components/order-summary-form";
import { Separator } from "../../components/ui/separator";

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
}: { children: any; cartDetails: cartDetails }) {
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

	const setPaymentOption = (data: {
		type: "cod" | "zalopay" | "momo";
	}) => {
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
			"useCheckoutForm must be used within a CheckoutFormProvider",
		);
	}

	return context;
}

// Checkout form
export default function Page() {
	const { cartDetails } = useShoppingCart();
	return (
		<CheckoutFormProvider cartDetails={cartDetails}>
			<div className="flex flex-col mx-20">
				<div id="breadcrumb">TODO</div>
				<div
					id="checkout-form"
					className="grid grid-cols-1 lg:grid-cols-3 gap-4"
				>
					<div className="col-span-2 p-4">
						<CustomerInfoForm />
						<Separator className="my-8" />
						<DeliveryOptionsForm />
						<Separator className="my-8" />
						<PaymentOptionsForm />
					</div>
					<div className="col-span-1 p-4">
						<OrderSummaryForm />
					</div>
				</div>
			</div>
			<div className="sticky bottom-0 bg-gray-200 w-full p-4">
				<p>This is a sticky bar!</p>
			</div>
		</CheckoutFormProvider>
	);
}
