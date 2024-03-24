"use client";

import { useRef, useState } from "react";
import { cartDetails, useShoppingCart } from "../../store/cart-provider";
import { useMultiplestepForm } from "../../hooks/use-multistep-form";
import SideBar from "./_components/side-bar";
import { AnimatePresence } from "framer-motion";
import { Button } from "../../components/ui/button";
import SuccessMessage from "./_components/success-message";
import { CustomerInfoForm } from "./_components/customer-info-form";
import { CartListingsForm } from "./_components/cart-listings";
import { PaymentOptionsForm } from "./_components/payment-options";
import { ConfirmOrderForm } from "./_components/confirm-order";

export type CheckoutForm = {
    customer: {
        name: string;
        email: string;
        phone: string;
        delivery: {
            province: string;
            district: string;
            ward: string;
            street: string;
            address: string;
            note: string;
        };
    };
    cart: cartDetails;
    discount: {
        code: string;
    };
    delivery_option: {
        type: "fast" | "normal";
        time: string;
    };
    payment: {
        type: "cod" | "zalopay" | "momo";
    };
};

const initialValues: CheckoutForm = {
    customer: {
        name: "Test",
        email: "",
        phone: "",
        delivery: {
            province: "",
            district: "",
            ward: "",
            street: "",
            address: "",
            note: "",
        },
    },
    cart: {},
    discount: {
        code: "",
    },
    delivery_option: {
        type: "fast",
        time: "",
    },
    payment: {
        type: "cod",
    },
};

// Checkout form
export default function Page() {
    const { cartDetails } = useShoppingCart();

    const [formData, setFormData] = useState<CheckoutForm>({
        ...initialValues,
        cart: cartDetails,
    });
    const formRef = useRef(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const {
        previousStep,
        nextStep,
        currentStepIndex,
        isFirstStep,
        isLastStep,
        steps,
        goTo,
        showSuccessMsg,
    } = useMultiplestepForm(4); // 4 steps in total

    const handleNextStep = async () => {
        if (isLastStep) {
			// payment
            await (formRef.current as any).submit();
        } else {
            if (formRef.current) {
                // if form validation return true, we can move to the next step
                const isValid = await (formRef.current as any).submit();
                if (isValid) {
                    nextStep();
                } else {
                    // Handle invalid form input
                    console.error("Invalid form input");
                }
            }
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div
                className={`${
                    currentStepIndex === 2 ? "h-[70vh] md:h-[40vh]" : "h-[60vh]"
                } w-11/12 max-w-6xl my-[10vh] mx-[1vh] rounded-lg border border-neutral-700 bg-white p-4 grid grid-cols-3 gap-4`}
            >
                {!showSuccessMsg ? (
                    <SideBar
                        currentStepIndex={currentStepIndex}
                        goTo={goTo}
                        className="max-h-72 col-span-1"
                    />
                ) : (
                    ""
                )}
                <div
                    className={`${
                        showSuccessMsg
                            ? "w-full h-full overflow-auto"
                            : "w-full md:mt-5 md:w-[95%] h-full overflow-auto"
                    } col-span-2`}
                >
                    {showSuccessMsg ? (
                        <AnimatePresence mode="wait">
                            <SuccessMessage />
                        </AnimatePresence>
                    ) : (
                        <div className="w-full flex flex-col justify-between h-full p-4">
                            <AnimatePresence mode="wait">
                                {currentStepIndex === 0 && (
                                    <CartListingsForm
                                        ref={formRef}
                                        cart={cartDetails}
                                        onUpdate={(data: any) =>
                                            setFormData({
                                                ...formData,
                                                discount: data,
                                            })
                                        }
                                    />
                                )}
                                {currentStepIndex === 1 && (
                                    <CustomerInfoForm
                                        ref={formRef}
                                        data={formData.customer}
                                        onUpdate={(data: any) =>
                                            setFormData({
                                                ...formData,
                                                customer: data,
                                            })
                                        }
                                    />
                                )}
                                {currentStepIndex === 2 && (
                                    <PaymentOptionsForm
                                        ref={formRef}
                                        data={formData.payment}
                                        onUpdate={(data: {
                                            type: "cod" | "zalopay" | "momo";
                                        }) =>
                                            setFormData({
                                                ...formData,
                                                payment: data,
                                            })
                                        }
                                    />
                                )}
                                {currentStepIndex === 3 && (
                                    <ConfirmOrderForm
                                        ref={formRef}
                                        data={formData}
                                        onUpdate={(data: any) =>
                                            setFormData(data)
                                        }
                                        goTo={goTo}
                                    />
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
                <div className="w-full items-center flex justify-between mt-auto">
                    <div className="">
                        <Button
                            onClick={previousStep}
                            type="button"
                            variant="secondary"
                            className={`${
                                isFirstStep
                                    ? "invisible"
                                    : "relative text-neutral-200 bg-neutral-900 border border-black/20 shadow-input shadow-black/10 rounded-xl hover:text-white"
                            }`}
                        >
                            Go Back
                        </Button>
                    </div>
                    <div className="flex items-center">
                        <div className="relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
                            <Button
                                onClick={handleNextStep}
                                type="button"
                                className="relative text-neutral-200 bg-neutral-900 border border-black/20 shadow-input shadow-black/10 rounded-xl hover:text-white"
                            >
                                {isLastStep ? "Confirm" : "Next Step"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
