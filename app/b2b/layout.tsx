import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { client } from "../../sanity/lib/client";
import { urlForImage } from "../../sanity/lib/image";
import Image from "next/image";

async function getImageData() {
    const query = "*[_type == 'heroImage'][0]";

    const data = await client.fetch(query);

    return data;
}

export default async function Layout({ children }: { children: React.ReactNode }) {
    const images = await getImageData();
    return (
        <main className="flex-1 p-4">
            {children}

            <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                <div className="container px-4 md:px-6">
                    <div className="grid items-center gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px]">
                        <div className="space-y-4">
                            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                                Wholesale Inquiries
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Have Questions? Let's Chat.
                            </h2>
                            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Fill out the form below to get in touch with our
                                team and learn more about our wholesale
                                offerings and ordering process.
                            </p>
                            <form className="space-y-4">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter your name"
                                        type="text"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        placeholder="Enter your email"
                                        type="email"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us about your business and your coffee needs"
                                        rows={4}
                                    />
                                </div>
                                <Button className="w-full" type="submit">
                                    Submit
                                </Button>
                            </form>
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
        </main>
    );
}
