"use client";

import { useRef } from "react";
import { useShoppingCart, createOrder } from "../../store/cart-provider";
import { CustomerInfoForm } from "./_components/customer-info-form";
import { PaymentOptionsForm } from "./_components/payment-options-form";
import { DeliveryOptionsForm } from "./_components/delivery-options-form";
import { OrderSummaryForm } from "./_components/order-summary-form";
import { Separator } from "../../components/ui/separator";
import { Button } from "../../components/ui/button";
import { CheckoutFormProvider } from "../../store/checkout";



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
