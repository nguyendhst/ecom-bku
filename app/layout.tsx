import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
//import CartProvider from "./components/Providers";
import Navbar from "./components/Navbar";
import ShoppingCartModal from "./components/ShoppingCartModal";
import { ShoppingCartProvider } from "../store/cart-provider";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "HighlandSoul",
    description: "Specialty Coffee and Accessories",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ShoppingCartProvider>
                    <Navbar />
                    <ShoppingCartModal />
                    {children}
                    <Footer />
                </ShoppingCartProvider>
            </body>
        </html>
    );
}
