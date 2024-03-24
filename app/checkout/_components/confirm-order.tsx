import { forwardRef, useImperativeHandle } from "react";
import { CheckoutForm } from "../page";
import { createOrder } from "../../../store/cart-provider";
import FormWrapper from "./form-wrapper";
import { toVND } from "../../../lib/utils";
import { Separator } from "../../../components/ui/separator";

export const ConfirmOrderForm = forwardRef(
    (
        {
            data,
            onUpdate,
            goTo,
        }: {
            data: CheckoutForm;
            onUpdate: any;
            goTo: any;
        },
        ref
    ) => {
        const { customer, cart, delivery_option, payment } = data;

        const createZalopayOrder = async () => {
            const { success, error } = await createOrder();
            return success;
        };

        const totalAmount =
            Object.values(cart).reduce((acc, item) => acc + item.price, 0) +
            (delivery_option.type === "fast" ? 50000 : 15000);

        useImperativeHandle(ref, () => ({
            submit: async () =>
                new Promise<boolean>(async (resolve) => {
					console.log("submitting order", payment.type)
                    if (payment.type === "zalopay") {
                        const result = await createZalopayOrder();
                        if (!result) {
                            resolve(false);
                        }
                    }
                    resolve(true);
                }),
        }));

        return (
            <FormWrapper
                title="Finishing Up"
                description="Double-check everything looks OK before confirming."
            >
                <div className="">
                    <div className="bg-white p-4 mt-2 rounded-md border border-indigo-700">
                        <div className="flex justify-between items-center">
                            <div className="w-full">
                                {
                                    // iterate over cart items
                                    Object.values(cart).map((item: any) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between items-center my-2 mb-4"
                                        >
                                            <h4 className="font-semibold md:text-lg">
                                                {item.name}
                                            </h4>
                                            <p className="font-semibold">
                                                {toVND(item.price)}
                                            </p>
                                        </div>
                                    ))
                                }

                                <button
                                    onClick={() => goTo(0)}
                                    className="text-primary text-bold"
                                >
                                    Change
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        {delivery_option.type === "fast" ? (
                            <div className="bg-white p-4 mt-2 rounded-md border border-indigo-700">
                                <h4 className="font-semibold md:text-lg">
                                    Fast Delivery
                                </h4>
                                <p className="text-neutral-400">
                                    {toVND(50000)}
                                </p>
                            </div>
                        ) : (
                            <div className="bg-white p-4 mt-2 rounded-md border border-indigo-700">
                                <h4 className="font-semibold md:text-lg">
                                    Standard Delivery
                                </h4>
                                <p className="text-neutral-400">
                                    {toVND(15000)}
                                </p>
                            </div>
                        )}
                        <Separator className="my-4" />
                    </div>
                    <div className="flex justify-between items-center my-4 px-4">
                        <p className="text-neutral-400">Total</p>
                        <p className="text-primary font-semibold md:text-lg">
                            {toVND(totalAmount)}
                        </p>
                    </div>

                    <div className="w-full">
                        <Separator className="my-4" />
                    </div>
                    <div className="w-full px-4">
                        <p className="text-neutral-400">
                            Payment Method: {payment.type}
                        </p>
                        <button
                            onClick={() => goTo(2)}
                            className="text-primary text-bold"
                        >
                            Change
                        </button>
                    </div>
                </div>
            </FormWrapper>
        );
    }
);

ConfirmOrderForm.displayName = "ConfirmOrderForm";
