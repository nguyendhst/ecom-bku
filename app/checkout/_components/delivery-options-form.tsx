"use client";

import { z } from "zod";
import { toVND } from "../../../lib/utils";
import { useCheckoutForm } from "../page";
import FormWrapper from "./form-wrapper";
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
import { forwardRef, useImperativeHandle } from "react";

const formSchema = z.object({
	type: z.enum(["fast", "standard"], {
		required_error: "Please select a delivery option",
	}),
});

export const DeliveryOptionsForm = forwardRef((props, ref) => {
	const { setDeliveryOption } = useCheckoutForm();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const { control, handleSubmit } = form;

	const validationSuccessfulCallback = (values: z.infer<typeof formSchema>) => {
		setDeliveryOption({
			type: values.type,
			time: "",
		});
	};

	useImperativeHandle(ref, () => ({
		validate: () => form.trigger(),
	}));

	return (
		<FormWrapper
			title="Delivery Options"
			description="Select your delivery method"
		>
			<div className="bg-white p-4 mt-2 rounded-md border border-indigo-700">
				<div className="flex justify-between items-center">
					<div className="w-full">
						<Form {...form}>
							<form onSubmit={handleSubmit(validationSuccessfulCallback)}>
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
													<FormItem className="flex items-center space-x-3 space-y-0">
														<FormControl>
															<RadioGroupItem value="fast" id="fast" />
														</FormControl>
														<FormLabel htmlFor="fast">
															Fast Delivery (1-2 days)
														</FormLabel>
													</FormItem>
													<FormItem className="flex items-center space-x-3 space-y-0">
														<FormControl>
															<RadioGroupItem value="standard" id="standard" />
														</FormControl>
														<FormLabel htmlFor="standard">
															Standard Delivery (3-5 days)
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
					</div>
				</div>
			</div>
		</FormWrapper>
	);
});
