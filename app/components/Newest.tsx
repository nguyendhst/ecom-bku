import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { client } from "../../sanity/lib/client";
import { item } from "../interface";

type latestProducts = {
    items: item[];
};

async function getData() {
    const query = `*[_type == "coffee"] | order(_createdAt desc)[0...4] {
		_id,
		name,
		"product": product-> {
		  name,
		  "category": category->name,
		  price,
		  "slug": slug.current,
		  description,
		  "imageUrl": images[0].asset->url
		},
		"blends": blends[]->name
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
                        Our Newest products
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

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {data.items.map((item) => (
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
                                    {item.product.price.toLocaleString(
                                        "vi-VN",
                                        {
                                            style: "currency",
                                            currency: "VND",
                                        }
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
