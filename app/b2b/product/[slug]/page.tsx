import { Button } from "../../../../components/ui/button";
import { Label } from "../../../../components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../components/ui/select";
import { client } from "../../../../sanity/lib/client";
import Image from "next/image";
import { urlForImage } from "../../../../sanity/lib/image";
import { toVND } from "../../../../lib/utils";
import {
    ToggleGroup,
    ToggleGroupItem,
} from "../../../../components/ui/toggle-group";

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

export default async function Page({ params }: { params: { slug: string } }) {
    const product = await getData(params.slug);

    return (
        <>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px]">
                        <div className="space-y-4">
                            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                                Product Details
                            </div>
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                {product.name}
                            </h1>
                            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                {product.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-3xl font-bold">
                                    {toVND(120000)}/kg
                                </span>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Label
                                            className="text-sm"
                                            htmlFor="quantity"
                                        >
                                            Quantity:
                                        </Label>
                                        <Select defaultValue="1">
                                            <SelectTrigger>
                                                <SelectValue placeholder="1" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">
                                                    1 kg
                                                </SelectItem>
                                                <SelectItem value="2">
                                                    2 kg
                                                </SelectItem>
                                                <SelectItem value="3">
                                                    3 kg
                                                </SelectItem>
                                                <SelectItem value="4">
                                                    4 kg
                                                </SelectItem>
                                                <SelectItem value="5">
                                                    5 kg
                                                </SelectItem>
                                                <SelectItem value="10">
                                                    10 kg
                                                </SelectItem>
                                                <SelectItem value="25">
                                                    25 kg
                                                </SelectItem>
                                                <SelectItem value="50">
                                                    50 kg
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label
                                            className="text-sm"
                                            htmlFor="delivery"
                                        >
                                            Delivery:
                                        </Label>
                                        <Select defaultValue="monthly">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Monthly" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="weekly">
                                                    Weekly
                                                </SelectItem>
                                                <SelectItem value="monthly">
                                                    Monthly
                                                </SelectItem>
                                                <SelectItem value="quarterly">
                                                    Quarterly
                                                </SelectItem>
                                                <SelectItem value="biannually">
                                                    Biannually
                                                </SelectItem>
                                                <SelectItem value="annually">
                                                    Annually
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button size="lg" variant="link">
                                        Add to Cart
                                    </Button>
                                </div>
                           
                            </div>
							<div>
                                    <div className="flex justify-start items-center">
                                        <p className="text-sm font-semibold">
                                            Blends:
                                        </p>
                                        <ToggleGroup type="single">
                                            {product.blends.map(
                                                (blend: any) => (
                                                    <ToggleGroupItem
                                                        value={blend}
                                                    >
                                                        {blend}
                                                    </ToggleGroupItem>
                                                )
                                            )}
                                        </ToggleGroup>
                                    </div>

                                    <div className="flex justify-start items-center">
                                        <p className="text-sm font-semibold">
                                            Grind:
                                        </p>
                                        <ToggleGroup type="single">
                                            <ToggleGroupItem value="Whole Bean">
                                                Whole Bean
                                            </ToggleGroupItem>
                                            <ToggleGroupItem value="Fine">
                                                Fine
                                            </ToggleGroupItem>
                                            <ToggleGroupItem value="Medium">
                                                Medium
                                            </ToggleGroupItem>
                                            <ToggleGroupItem value="Coarse">
                                                Coarse
                                            </ToggleGroupItem>
                                        </ToggleGroup>
                                    </div>
                                    <div className="flex justify-start items-center">
                                        <p className="text-sm font-semibold">
                                            Brew Method:
                                        </p>
                                        <ToggleGroup type="single">
                                            <ToggleGroupItem value="Espresso">
                                                Espresso
                                            </ToggleGroupItem>
                                            <ToggleGroupItem value="Pour Over">
                                                Pour Over
                                            </ToggleGroupItem>
                                            <ToggleGroupItem value="French Press">
                                                French Press
                                            </ToggleGroupItem>
                                            <ToggleGroupItem value="Aeropress">
                                                Aeropress
                                            </ToggleGroupItem>
                                            <ToggleGroupItem value="Phin">
                                                Phin
                                            </ToggleGroupItem>
                                        </ToggleGroup>
                                    </div>
                                </div>
                        </div>
                        <Image
                            alt="Sumatra Mandheling Coffee Beans"
                            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                            height="550"
                            src={urlForImage(product.images[0])}
                            width="550"
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
