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
import { forwardRef, useImperativeHandle } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../../components/ui/form";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";

const formSchema = z.object({
	type: z.enum(["cod", "zalopay", "momo"], {
		required_error: "Please select a payment method",
	}),
});

export const PaymentOptionsForm = forwardRef((props, ref) => {
	const { formData, setPaymentOption } = useCheckoutForm();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const { control, handleSubmit } = form;

	useImperativeHandle(ref, () => ({
		validate: () => form.trigger(),
		getValues: () => form.getValues(),
	}));

	return (
		<FormWrapper
			title="Payment Options"
			description="Select your payment method"
		>
			<Form {...form}>
				<form onSubmit={handleSubmit((values) => setPaymentOption(values))}>
					<FormField
						control={control}
						name="type"
						render={({ field }) => (
							<FormItem className="space-y-2">
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex flex-col space-y-2"
									>
										<FormItem className="flex items-center space-x-3 space-y-0 w-full m-2 p-2 hover:bg-indigo-200">
											<FormControl>
												<RadioGroupItem value="cod" id="cod" />
											</FormControl>
											<FormLabel
												htmlFor="cod"
												className="w-full cursor-pointer"
											>
												<div className="flex flex-row items-center space-x-4">
													<Image
														src={cod}
														alt="Cash on delivery"
														width={48}
														height={48}
													/>
													<div className="flex flex-col">
														<p className="text-lg font-semibold">COD</p>
													</div>
												</div>
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0 w-full m-2 p-2 hover:bg-indigo-200">
											<FormControl>
												<RadioGroupItem value="zalopay" id="zalopay" />
											</FormControl>
											<FormLabel
												htmlFor="zalopay"
												className="w-full cursor-pointer"
											>
												<div className="flex flex-row items-center space-x-4">
													<Image
														src={zalopay}
														alt="ZaloPay"
														width={48}
														height={48}
													/>
													<div className="flex flex-col">
														<p className="text-lg font-semibold">ZaloPay</p>
													</div>
												</div>
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0 w-full m-2 p-2 hover:bg-indigo-200">
											<FormControl>
												<RadioGroupItem value="momo" id="momo" />
											</FormControl>
											<FormLabel
												htmlFor="momo"
												className="w-full cursor-pointer"
											>
												<div className="flex flex-row items-center space-x-4">
													<Image src={momo} alt="Momo" width={48} height={48} />
													<div className="flex flex-col">
														<p className="text-lg font-semibold">Momo</p>
													</div>
												</div>
											</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</FormWrapper>
	);
});
