"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneRegex } from "../../../lib/utils";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { forwardRef, useImperativeHandle } from "react";
import { useCheckoutForm } from "../page";
import FormWrapper from "./form-wrapper";
import { Textarea } from "../../../components/ui/textarea";

const formSchema = z.object({
	name: z.string().min(1).max(255),
	email: z.string().email({ message: "Invalid email" }),
	phone: z.string().regex(phoneRegex, { message: "Invalid phone number" }),
	delivery: z.object({
		province: z.string().min(1).max(255),
		district: z.string().min(1).max(255),
		ward: z.string().min(1).max(255),
		street: z.string().min(1).max(255),
		address: z.string().min(1).max(255),
		note: z.string().max(255),
	}),
});

export const CustomerInfoForm = forwardRef((props, ref) => {
	const { formData: data, setCustomerData } = useCheckoutForm();

	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: data.customer,
		resolver: zodResolver(formSchema),
	});

	const { handleSubmit } = form;

	const { control } = form;

	useImperativeHandle(ref, () => ({
		validate: () => form.trigger(),
	}));

	// if validation passed, this function will be called
	const validationSuccessfulCallback = (values: z.infer<typeof formSchema>) => {
		setCustomerData(values);
	};

	// if validation failed, this function will be called
	const validationFailedCallback = (errors: any) => {
		console.log(errors);
	};

	return (
		<FormWrapper title="Customer Information" description="Enter your details">
			<Form {...form}>
				<form
					onSubmit={handleSubmit(
						validationSuccessfulCallback,
						validationFailedCallback,
					)}
					className="space-y-6"
				>
					<FormField
						control={control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor={field.name}>Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormDescription>Enter your full name</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor={field.name}>Email</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription>Enter your email address</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor={field.name}>Phone</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription>Enter your phone number</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="delivery.province"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor={field.name}>Province</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription>Enter your province</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="delivery.district"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor={field.name}>District</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription>Enter your district</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="delivery.ward"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor={field.name}>Ward</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription>Enter your ward</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="delivery.street"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor={field.name}>Street</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription>Enter your street</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="delivery.address"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor={field.name}>Address</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription>Enter your address</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="delivery.note"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor={field.name}>Note</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Enter your note"
											className="resize-none h-24 w-full border border-input rounded-md px-3 py-2 text-sm shadow-sm placeholder-text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Provide note about your delivery
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/*<Button type="submit">Submit</Button>*/}
				</form>
			</Form>
		</FormWrapper>
	);
});
