"use client";

import { z } from "zod";
import { useCheckoutForm } from "../page";
import FormWrapper from "./form-wrapper";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { toVND } from "../../../lib/utils";
import { useEffect, useState } from "react";

const formSchema = z.object({
	code: z
		.string()
		.min(10)
		.max(25, "Discount code must be between 10 and 25 characters"),
});

export const OrderSummaryForm = () => {
	const {
		formData,
		setDiscountCode,
		getTotalAmount,
		getTotalWithoutDiscount,
		getDiscountAmount,
	} = useCheckoutForm();

	const { cart: cartDetails } = formData;

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const { handleSubmit } = form;

	const onSubmit = (data: any) => {
		setDiscountCode(data.code);
	};

	const { control } = form;

	// hack to force client-side rendering
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<FormWrapper title="Order Summary" description="Review your order">
			{isClient && (
				<div className="flex flex-col gap-4">
					{cartDetails &&
						Object.values(cartDetails).map((item) => (
							<div
								key={item.id}
								className="flex items-center justify-between gap-4"
							>
								<div className="flex items-center gap-4">
									{item.imageUrl && (
										<Image
											src={item.imageUrl}
											alt={item.name}
											width={48}
											height={48}
										/>
									)}
									<p className="text-lg font-semibold text-neutral-200">
										{item.name}
									</p>
								</div>
								<p className="text-lg font-semibold text-neutral-200">
									{toVND(item.price)}
								</p>
							</div>
						))}
					<div className="flex items-center justify-between gap-4">
						<p className="text-lg font-semibold text-neutral-200">Total</p>
						<p className="text-lg font-semibold text-neutral-200">
							{toVND(getTotalWithoutDiscount())}
						</p>
					</div>
					<div className="flex items-center justify-between gap-4">
						<p className="text-lg font-semibold text-neutral-200">Discount</p>
						<p className="text-lg font-semibold text-neutral-200">
							-{toVND(getDiscountAmount())}
						</p>
					</div>
					<div className="flex items-center justify-between gap-4">
						<p className="text-lg font-semibold text-neutral-200">
							Total after discount
						</p>
						<p className="text-lg font-semibold text-neutral-200">
							{toVND(getTotalAmount())}
						</p>
					</div>
					<Form {...form}>
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={control}
								name="code"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor={field.name}>Discount Code</FormLabel>
										<FormControl>
											<Input {...field} value={field.value || ""} />
										</FormControl>
										<FormDescription>Enter your discount code</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>
				</div>
			)}
		</FormWrapper>
	);
};
