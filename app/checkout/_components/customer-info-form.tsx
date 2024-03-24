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

export const CustomerInfoForm = forwardRef(
    (
        {
            data,
            onUpdate,
        }: {
            data: z.infer<typeof formSchema>;
            onUpdate: any;
        },
        ref
    ) => {
        const form = useForm<z.infer<typeof formSchema>>({
            defaultValues: data,
            resolver: zodResolver(formSchema),
        });

        const {
            register,
            handleSubmit,
            formState: { errors },
        } = form;

        // if validation passed, this function will be called
        const validationSuccessfulCallback = (
            values: z.infer<typeof formSchema>
        ) => {
            onUpdate(values);
        };

        // if validation failed, this function will be called
        const validationFailedCallback = (errors: any) => {
            console.log(errors);
        };

        // Use the ref to expose the handleSubmit function
        useImperativeHandle(ref, () => ({
            submit: () =>
                new Promise<boolean>((resolve) => {
                    handleSubmit(
                        (values: z.infer<typeof formSchema>) => {
                            onUpdate(values);
                            // Resolve the promise with true indicating the form submission was successful
                            resolve(true);
                        },
                        (errors: any) => {
                            console.log(errors);
                            // Resolve the promise with false indicating the form submission failed
                            resolve(false);
                        }
                    )();
                }),
        }));

        return (
            <Form {...form}>
                <form
                    onSubmit={handleSubmit(
                        validationSuccessfulCallback,
                        validationFailedCallback
                    )}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor={field.name}>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter your full name
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor={field.name}>
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter your email address
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor={field.name}>
                                    Phone
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter your phone number
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="space-y-6">
                        <FormField
                            control={form.control}
                            name="delivery.province"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor={field.name}>
                                        Province
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your province
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="delivery.district"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor={field.name}>
                                        District
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your district
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="delivery.ward"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor={field.name}>
                                        Ward
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your ward
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="delivery.street"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor={field.name}>
                                        Street
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your street
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="delivery.address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor={field.name}>
                                        Address
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your address
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="delivery.note"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor={field.name}>
                                        Note
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your note
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/*<Button type="submit">Submit</Button>*/}
                </form>
            </Form>
        );
    }
);
CustomerInfoForm.displayName = "CustomerInfoForm";
