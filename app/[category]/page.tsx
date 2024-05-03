"use client";

import Link from "next/link";
import Image from "next/image";
import { toVND } from "../../lib/utils";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";
import useSWR from "swr";
import { getData } from "../../lib/get-product-data";

//export const dynamic = "force-dynamic";

function formatCategoryName(category: string) {
    return (
        category[0].toUpperCase() +
        category.slice(1).toLowerCase().replace(/-/g, " ")
    );
}

const sortOptions = [
    { value: "price asc", label: "Price: Low to High" },
    { value: "price desc", label: "Price: High to Low" },
];

export default function Page({ params }: { params: { category: string } }) {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [sortBy, setSortBy] = useState("");

    const {
        data: { data, totalCount } = { data: undefined, totalCount: undefined },
        isLoading,
        mutate,
    } = useSWR(
        `${params.category}`,
        () =>
            getData(
                params.category,
                page,
                itemsPerPage,
                sortBy != "" ? sortBy : undefined
            ),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    if (isLoading || !data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white h-full md:h-screen">
            <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        {formatCategoryName(params.category)} Products
                    </h2>

                    <div className="flex items-center gap-x-1">
                        <p>
                            {data.length} products out of {totalCount}
                        </p>
                        <Select
                            onValueChange={(value) => {
                                setSortBy(value),
                                    mutate((data) =>
                                        getData(
                                            params.category,
                                            page,
                                            itemsPerPage,
                                            value
                                        )
                                    );
                            }}
                        >
                            <SelectTrigger className="text-primary flex items-center gap-x-1">
                                <SelectValue placeholder={"Sort By"} />
                            </SelectTrigger>
                            <SelectContent>
                                {sortOptions.map((option) => (
                                    <SelectItem
                                        value={option.value}
                                        key={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {data.map((item) => (
                        <div key={item._id} className="group relative">
                            <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                                <Image
                                    src={item.product.imageUrl}
                                    alt="Product image"
                                    className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                                    width={300}
                                    height={300}
                                />
                            </div>

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <Link
                                            href={`/product/${item.product.slug}`}
                                        >
                                            {item.name}
                                        </Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {item.product.category}
                                    </p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                    {toVND(item.product.price)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
