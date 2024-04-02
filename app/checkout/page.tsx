"use client";

import { createContext, useContext, useRef, useState } from "react";
import { type cartDetails, useShoppingCart, createOrder } from "../../store/cart-provider";
import { CustomerInfoForm } from "./_components/customer-info-form";
import { PaymentOptionsForm } from "./_components/payment-options-form";
import { DeliveryOptionsForm } from "./_components/delivery-options-form";
import { OrderSummaryForm } from "./_components/order-summary-form";
import { Separator } from "../../components/ui/separator";
import { Button } from "../../components/ui/button";

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

	const customerInfoFormRef = useRef<any>(null);
	const deliveryOptionsFormRef = useRef<any>(null);
	const paymentOptionsFormRef = useRef<any>(null);

	const handleFinalSubmit = async () => {
		const customerInfoForm = customerInfoFormRef.current;
		const deliveryOptionsForm = deliveryOptionsFormRef.current;
		const paymentOptionsForm = paymentOptionsFormRef.current;

		if (!customerInfoForm || !deliveryOptionsForm || !paymentOptionsForm) {
			return;
		}

		const isCustomerInfoValid = await customerInfoForm.validate();
		const isDeliveryOptionsValid = await deliveryOptionsForm.validate();
		const isPaymentOptionsValid = await paymentOptionsForm.validate();

		if (
			isCustomerInfoValid &&
			isDeliveryOptionsValid &&
			isPaymentOptionsValid
		) {
			console.log("Validation successful");
			const createZalopayOrder = async () => {
				const { success, error } = await createOrder();
				return success;
			};

			const paymentType = paymentOptionsForm.getValues().type;
			if (paymentType === "zalopay") {
				const success = await createZalopayOrder();
				if (success) {
					// navigate to success page
				} else {
					// show error message
				}
			}
		}
	};

	const handleBackToCart = () => {
		// navigate back to cart
	};

	return (
		<CheckoutFormProvider cartDetails={cartDetails}>
			<div className="flex flex-col mx-20">
				<div
					id="checkout-form"
					className="grid grid-cols-1 lg:grid-cols-3 gap-4"
				>
					<div className="col-span-2 p-4">
						<CustomerInfoForm ref={customerInfoFormRef} />
						<Separator className="my-8" />
						<DeliveryOptionsForm ref={deliveryOptionsFormRef} />
						<Separator className="my-8" />
						<PaymentOptionsForm ref={paymentOptionsFormRef} />
					</div>
					<div className="col-span-1 p-4">
						<OrderSummaryForm />
					</div>
				</div>
			</div>
			<div className="sticky bottom-0 bg-gray-200 w-full h-[130px] p-4 flex items-center justify-center space-x-4">
				<Button onClick={handleBackToCart} variant="secondary" className="w-48">
					Back to Cart
				</Button>
				<Button onClick={handleFinalSubmit} className="w-48">
					Checkout
				</Button>
			</div>
		</CheckoutFormProvider>
	);
}
