import Image from "next/image";
import Hero from "./components/Hero";
import Newest from "./components/Newest";
import { ProductHighlights } from "./components/product-highlights";
import { CustomerReviews } from "./components/customer-reviews";
import { Discount } from "./components/discount";

export const dynamic = "force-dynamic";

export default function Home() {
    return (
        <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
            <Hero />
			<Discount />
            <ProductHighlights />
            <Newest />
            <CustomerReviews />
        </div>
    );
}
