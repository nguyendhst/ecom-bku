import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
            <head>
                <Script async src="https://www.googletagmanager.com/gtag/js?id=G-9V9B1E28FF"/>
                <Script id="google-analytics">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-9V9B1E28FF');
                    `}
                </Script>
            </head>
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
