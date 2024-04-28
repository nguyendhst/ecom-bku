"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneRegex } from "../../../lib/utils";
import { useForm } from "react-hook-form";
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
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import FormWrapper from "./form-wrapper";
import { Textarea } from "../../../components/ui/textarea";
import { useCheckoutForm } from "../../../store/checkout";
import { GamepadIcon } from "lucide-react";

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
	const [name, setName] = useState("");
	const [email, setEmail] = useState("123");
	const [phone, setPhone] = useState("");
	const [province, setProvince] = useState("");
	const [district, setDistrict] = useState("");
	const [ward, setWard] = useState("");
	const [street, setStreet] = useState("");
	const [address, setAddress] = useState("");
	const [showModal, setShowModal] = useState(false);


	useEffect(() => {
		if (email == "huythai31052002@gmail.com") {
			setShowModal(true);
			console.log("đù má đéo hiểu")
		}
	},[email])

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
	const handleAutoFill = () => {
		setShowModal(false);
		setName("Trương Huy Thái")
		setWard("Phường 14")
		setProvince("HCM")
		setDistrict("Gò Vấp")
		setAddress("261/2")
		setPhone("0348273184")
		setStreet("Lê Đức Thọ")
	}
	console.log("showModal",showModal)
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
									<Input {...field}  value={name} onChange={(e) => setName(e.target.value)} />
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
										<Input {...field} value={email} onChange={(e) => setEmail(e.target.value)} />
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
										<Input {...field}  value={phone} onChange={(e) => setPhone(e.target.value)} />
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
										<Input {...field}  value={province} onChange={(e) => setProvince(e.target.value)} />
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
										<Input {...field}  value={district} onChange={(e) => setDistrict(e.target.value)} />
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
										<Input {...field}  value={ward} onChange={(e) => setWard(e.target.value)} />
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
										<Input {...field}  value={street} onChange={(e) => setStreet(e.target.value)} />
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
										<Input {...field}  value={address} onChange={(e) => setAddress(e.target.value)}  />
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
				{showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none " style={{width: "600px"}}>

                {/*body*/}
                <div className="relative p-6 flex-auto" >
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
						Autofill you information form?
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleAutoFill}
                  >
                    Autofill
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
			</Form>
			

		</FormWrapper>
	);
});
