"use client";

import FormWrapper from "./form-wrapper";
import {
	ToggleGroup,
	ToggleGroupItem,
} from "../../../components/ui/toggle-group";
import Image from "next/image";
import momo from "../../../public/assets/momo.png";
import zalopay from "../../../public/assets/zalopay.png";
import cod from "../../../public/assets/cod.png";
import { useCheckoutForm } from "../page";

export const PaymentOptionsForm = () => {
	const { formData, setPaymentOption } = useCheckoutForm();

	return (
		<FormWrapper
			title="Payment Options"
			description="Select your payment method"
		>
			<ToggleGroup
				value={formData.payment.type}
				type="single"
				variant="outline"
				onValueChange={(value: any) => setPaymentOption({ type: value })}
			>
				<ToggleGroupItem
					value="cod"
					aria-label="Cash on delivery"
					className="border border-neutral-600 flex items-start gap-3 p-3 h-24 rounded-md aspect-square data-[state=on]:border-primary data-[state=on]:bg-neutral-900 focus:border-primary outline-none hover:border-primary md:h-44 md:w-[30%] md:flex-col md:justify-between md:gap-0"
				>
					<Image src={cod} alt="Cash on delivery" width={48} height={48} />
					<div className="flex flex-col">
						<p className="text-lg font-semibold text-neutral-200">COD</p>
					</div>
				</ToggleGroupItem>
				<ToggleGroupItem
					value="zalopay"
					aria-label="ZaloPay"
					className="border border-neutral-600 flex items-start gap-3 p-3 h-24 rounded-md aspect-square data-[state=on]:border-primary data-[state=on]:bg-neutral-900 focus:border-primary outline-none hover:border-primary md:h-44 md:w-[30%] md:flex-col md:justify-between md:gap-0"
				>
					<Image src={zalopay} alt="ZaloPay" width={48} height={48} />
					<div className="flex flex-col items-center justify-center">
						<p className="text-lg font-semibold text-neutral-200">ZaloPay</p>
					</div>
				</ToggleGroupItem>
				<ToggleGroupItem
					value="momo"
					disabled
					aria-label="Momo"
					className="border border-neutral-600 flex items-start gap-3 p-3 h-24 rounded-md aspect-square data-[state=on]:border-primary data-[state=on]:bg-neutral-900 focus:border-primary outline-none hover:border-primary md:h-44 md:w-[30%] md:flex-col md:justify-between md:gap-0"
				>
					<Image src={momo} alt="Momo" width={48} height={48} />
					<div className="flex flex-col">
						<p className="text-lg font-semibold text-neutral-200">Momo</p>
					</div>
				</ToggleGroupItem>
			</ToggleGroup>
		</FormWrapper>
	);
};
