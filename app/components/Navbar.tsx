"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { LinearGradient } from "react-text-gradients";
import { useShoppingCart } from "../../store/cart-provider";
import { Sonsie_One } from "next/font/google";
import Image from "next/image";

const links = [
    { name: "Home", href: "/" },
    { name: "Coffee", href: "/coffee" },
    { name: "Accessories", href: "/accessories" },
    { name: "Coffee Makers", href: "/coffee-maker" },
    { name: "B2B Outlet", href: "/b2b" },
];

const font = Sonsie_One({ weight: "400", style: "normal", subsets: ["latin"] });

export default function Navbar() {
    const pathname = usePathname();
    const { handleCartClick } = useShoppingCart();
    return (
        <header className="mb-8 border-b">
            <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
                <Link href="/">
                    <div className="flex flex-row items-center justify-start">
                        <Image
                            src="/437530422_1114942873073385_6314017537517846940_n.png"
                            width={50}
                            height={50}
                            alt="logo"
                        />

                        <h1
                            className="text-2xl md:text-4xl font-bold"
                            style={font.style}
                        >
                            <LinearGradient
                                gradient={["to left", "#000000 ,#8a5d3c"]}
                                style={font.style}
                            >
                                Nature's Brew
                            </LinearGradient>
                        </h1>
                    </div>
                </Link>

                <nav className="hidden gap-12 lg:flex 2xl:ml-16">
                    {links.map((link, idx) => (
                        <div key={link.href}>
                            {pathname === link.href ? (
                                <Link
                                    className="text-lg font-semibold text-primary"
                                    href={link.href}
                                >
                                    {link.name}
                                </Link>
                            ) : (
                                <Link
                                    href={link.href}
                                    className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                                >
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="flex divide-x border-r sm:border-l">
                    <Button
                        variant={"outline"}
                        onClick={() => handleCartClick()}
                        className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
                    >
                        <ShoppingBag />
                        <span className="hidden text-xs font-semibold text-gray-500 sm:block">
                            Cart
                        </span>
                    </Button>
                </div>
            </div>
        </header>
    );
}
