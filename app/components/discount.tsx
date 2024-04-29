"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";

export const Discount = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // Handle the form submission here, e.g. send the email to your server
        console.log(`Email for discount: ${email}`);
    };

    return (
        <div className="bg-gray-200 p-4 rounded-lg mt-8 py-16 md:px-96">
            <h2 className="text-2xl font-bold mb-2">
                Get a first time discount!
            </h2>
            <p className="mb-4">
                Enter your email to receive a discount on your first purchase.
            </p>
            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-grow mr-2 p-2 rounded-lg"
                    placeholder="Enter your email"
                />
                <Button type="submit" className="bg-primary text-white">
                    Get Discount
                </Button>
            </form>
        </div>
    );
};
