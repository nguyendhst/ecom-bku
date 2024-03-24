"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { cartDetails, cartEntry } from "../../../store/cart-provider";
import { DataTable } from "../../components/data-table";
import FormWrapper from "./form-wrapper";

const columns: ColumnDef<cartEntry>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
    {
        accessorKey: "formattedTotalPrice",
        header: "Total Price",
    },
];

export const CartListingsForm = forwardRef(
    (
        {
            cart,
            onUpdate,
        }: {
            cart: cartDetails;
            onUpdate: any;
        },
        ref
    ) => {
        const [isClient, setIsClient] = useState(false);

        useEffect(() => {
            // force to be client side
            // this is a workaround for the issue that the cart is not loaded on the server side
            setIsClient(true);
        }, []);

        // Use the ref to expose the handleSubmit function
        // no need to do anything since we don't have any form
        useImperativeHandle(ref, () => ({
            submit: () =>
                new Promise<boolean>((resolve) => {
                    resolve(true);
                }),
        }));
        return (
            <FormWrapper
                title="Cart Confirmation"
                description="Please review your cart before checkout"
            >
                <div className="flex flex-col items-center w-full">
                    <div className="w-full">
                        {isClient && cart ? (
                            <DataTable
                                columns={columns}
                                data={Object.values(cart)}
                            />
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </FormWrapper>
        );
    }
);

CartListingsForm.displayName = "CartListings";
