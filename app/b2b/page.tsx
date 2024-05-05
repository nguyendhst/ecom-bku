import Link from "next/link";
import { type item, simplifiedProduct } from "../interface";
import Image from "next/image";
import { client } from "../../sanity/lib/client";
import { urlForImage } from "../../sanity/lib/image";
import { Card, CardContent } from "../../components/ui/card";

async function getData(category: string): Promise<
    {
        _id: string;
        name: string;
        product: simplifiedProduct & {
            description: string;
        };
    }[]
> {
    const query = `*[_type == "coffee"] {
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
}`;

    const data = await client.fetch(query);

    return data;
}

async function getImageData() {
    const query = "*[_type == 'heroImage'][0]";

    const data = await client.fetch(query);

    return data;
}

export const dynamic = "force-dynamic";

export default async function Page({
    params,
}: {
    params: { category: string };
}) {
    const queryResult = await getData(params.category);

    const images = await getImageData();

    return (
        <>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px]">
                        <div className="space-y-4">
                            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                                Specialty Coffee
                            </div>
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Elevate Your Business with Our Premium Beans
                            </h1>
                            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                Nature's Brew Co. is dedicated to sourcing and
                                roasting the finest specialty coffee beans from
                                around the world. Our mission is to provide
                                businesses with the highest quality coffee to
                                elevate their customer experience.
                            </p>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Link
                                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                                    href="#"
                                >
                                    Browse Products
                                </Link>
                                <Link
                                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                                    href="#"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                        <Image
                            alt="Coffee Beans"
                            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                            height="550"
                            src={urlForImage(images.image1)}
                            width="550"
                        />
                    </div>
                </div>
            </section>

            <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                <div className="container px-4 md:px-6">
                    <div className="space-y-4 text-center">
                        <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                            Our Varieties
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Explore Our Premium Coffee Beans
                        </h2>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            We carefully source and roast the finest specialty
                            coffee beans from around the world, ensuring a
                            consistently exceptional experience for your
                            business.
                        </p>
                    </div>
                    <div className="mx-auto grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:max-w-5xl lg:grid-cols-3 lg:gap-8">
                        {queryResult.map((item: any) => (
                            <ProductCard
                                key={item._id}
                                product={item.product}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

const ProductCard = ({ product }: { product: any }) => {
    return (
        <Link href={`/b2b/product/${product.slug}`}>
            <Card>
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="rounded-t-xl"
                />
                <CardContent className="p-4 space-y-2">
                    <h3 className="text-lg font-bold">{product.name}</h3>
                    <p className="text-gray-500">{product.description}</p>
                </CardContent>
            </Card>
        </Link>
    );
};
