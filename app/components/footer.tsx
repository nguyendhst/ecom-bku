// components/Footer.tsx
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-black text-white py-10 px-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Products</h3>
                    <ul>
                        <li>
                            <Link href="/products/coffee">Coffee</Link>
                        </li>
                        <li>
                            <Link href="/products/accessories">
                                Accessories
                            </Link>
                        </li>
                        <li>
                            <Link href="/products/coffee-makers">
                                Coffee Makers
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Information</h3>
                    <ul>
                        <li>
                            <Link href="/about">About Us</Link>
                        </li>
                        <li>
                            <Link href="/contact">Contact Us</Link>
                        </li>
                        <li>
                            <Link href="/privacy-policy">Privacy Policy</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">
                        Customer Service
                    </h3>
                    <ul>
                        <li>
                            <Link href="/returns">Returns & Exchange</Link>
                        </li>
                        <li>
                            <Link href="/shipping">Shipping & Delivery</Link>
                        </li>
                        <li>
                            <Link href="/faq">FAQs</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                    <ul>
                        <li>
                            <a href="https://www.facebook.com">Facebook</a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com">Instagram</a>
                        </li>
                        <li>
                            <a href="https://www.twitter.com">Twitter</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="text-center mt-10">
                <p>
                    &copy; {new Date().getFullYear()} Nature's Brew. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
