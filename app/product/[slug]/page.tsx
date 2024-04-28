"use client";

import AddToBag from "@/app/components/AddToBag";
import CheckoutNow from "@/app/components/CheckoutNow";
import ImageGallery from "@/app/components/ImageGallery";
import type { fullProduct } from "@/app/interface";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import { client } from "../../../sanity/lib/client";
import { toVND } from "../../../lib/utils";
import { useEffect, useState } from "react";
import { urlForImage } from "../../../sanity/lib/image";

async function getData(slug: string) {
    const query = `*[_type == "product" && slug.current == "${slug}"][0] {
        _id,
          images,
          price,
          name,
          description,
          "slug": slug.current,
          "categoryName": category->name,
          price_id,
		  "blends": coffee->blends[]->name
      }`;

    const data = await client.fetch(query);

    return data;
}

export default function Page({ params }: { params: { slug: string } }) {
    const [data, setData] = useState<fullProduct>({
        _id: "",
        images: [],
        price: 0,
        slug: "",
        categoryName: "",
        name: "",
        description: "",
        price_id: "",
		blends: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data: fullProduct = await getData(params.slug);
            setData(data);
            setLoading(false);
        };

        fetchData();
    }, [params.slug]);

    return (
        <div className="bg-white h-full md:h-screen">
            <div className="p-8 grid gap-8 grid-cols-1 md:grid-cols-2">
                {!loading && <ImageGallery images={data.images} />}

                <div className="py-4 mb-8 md:py-8">
                    <div className="mb-2 md:mb-3">
                        <span className="mb-0.5 inline-block text-gray-500">
                            {data.categoryName}
                        </span>
                        <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                            {data.name}
                        </h2>
                    </div>

                    <div className="mb-6 flex items-center gap-3 md:mb-10">
                        <Button className="rounded-full gap-x-2">
                            <span className="text-sm">4.2</span>
                            <Star className="h-5 w-5" />
                        </Button>

                        <span className="text-sm text-gray-500 transition duration-100">
                            56 Ratings
                        </span>
                    </div>

                    <div className="mb-4">
                        <div className="flex items-end gap-2">
                            <span className="text-xl font-bold text-gray-800 md:text-2xl">
                                {toVND(data.price)}
                            </span>
                            <span className="mb-0.5 text-red-500 line-through">
                                {toVND(data.price + 50000)}
                            </span>
                        </div>

                        <span className="text-sm text-gray-500">
                            Incl. Vat plus shipping
                        </span>
                    </div>

                    <div className="mb-6 flex items-center gap-2 text-gray-500">
                        <Truck className="w-6 h-6" />
                        <span className="text-sm">2-4 Day Shipping</span>
                    </div>

                    {!loading && (
                        <div className="flex flex-col gap-2.5">
                            <AddToBag
                                id={data._id}
                                description={data.description}
                                imageUrl={urlForImage(data.images[0])}
                                name={data.name}
                                category={data.categoryName}
                                slug={data.slug}
                                price={data.price}
								blends={data.blends}
                            />
                            <CheckoutNow
                                id={data.price_id}
                                description={data.description}
                                imageUrl={urlForImage(data.images[0])}
                                name={data.name}
                                price={data.price}
                                key={data._id}
                                category={data.categoryName}
                                slug={data.slug}
								blends={data.blends}
                            />
                        </div>
                    )}

                    <p className="mt-12 text-base text-gray-500 tracking-wide">
                        {data.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
