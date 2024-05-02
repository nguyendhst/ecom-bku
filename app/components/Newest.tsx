import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { client } from "../../sanity/lib/client";
import type { item } from "../interface";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { Separator } from "../../components/ui/separator";
import { cn } from "../../lib/utils";

type latestProducts = {
    items: item[];
};

async function getData() {
    const query = `*[_type == "product"] | order(_createdAt desc)[0...4] {
        _id,
        name,
        "category": category->name,
        price,
        "slug": slug.current,
        description,
        "imageUrl": images[0].asset->url
    }`;

    const data = await client.fetch(query);

    return data;
}

export default async function Newest() {
    // query result is an array of latest products
    const queryResult = await getData();
    const data: latestProducts = { items: queryResult };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Our Newest Products
                    </h2>

                    <Link
                        className="text-primary flex items-center gap-x-1"
                        href="/all"
                    >
                        See All{" "}
                        <span>
                            <ArrowRight />
                        </span>
                    </Link>
                </div>

                <Separator className="space-y-4 mt-4 mb-4" />

                <div className="relative">
                    <ScrollArea>
                        <div className="flex space-x-4 pb-4">
                            {data.items.map((item) => (
                                <ProductCard
                                    item={item}
                                    key={item._id}
                                    aspectRatio="portrait"
                                />
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}

const ProductCard = ({
    item,
    aspectRatio = "portrait",
}: {
    item: any;
    aspectRatio: string;
}) => {
    return (
        <div
            key={item._id}
            className="group relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
        >
            <div className="overflow-hidden rounded-md h-48 sm:h-64 md:h-80 lg:h-96 xl:h-112">
                <Image
                    src={item.imageUrl}
                    alt="Product image"
                    width={1280}
                    height={1114}
                    className={cn(
                        "h-auto w-auto object-cover transition-all hover:scale-105",
                        aspectRatio === "portrait"
                            ? "aspect-[3/4]"
                            : "aspect-square"
                    )}
                />
            </div>
            <div className="mt-4 flex flex-col sm:flex-row justify-between">
                <div>
                    <h3 className="text-sm sm:text-base text-gray-700">
                        <Link href={`/product/${item.slug}`}>
                            {item.name}
                        </Link>
                    </h3>
                </div>
                <p className="text-sm sm:text-base font-medium text-gray-900">
                    {item.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })}
                </p>
            </div>
        </div>
    );
};
