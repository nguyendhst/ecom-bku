"use client";

import AddToBag from "@/app/components/AddToBag";
import CheckoutNow from "@/app/components/CheckoutNow";
import ImageGallery from "@/app/components/ImageGallery";
import { fullProduct } from "@/app/interface";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import { client } from "../../../sanity/lib/client";
import { toVND } from "../../../lib/utils";
import { useEffect, useState } from "react";
import { urlForImage } from "../../../sanity/lib/image";
import { Input } from "@/components/ui/input";
import { useShoppingCart } from "../../../store/cart-provider";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
async function getData(slug: string) {
    const query = `*[_type == "product" && slug.current == "${slug}"][0] {
        _id,
          images,
          price,
          name,
          description,
          "slug": slug.current,
          "categoryName": category->name,
          price_id
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
    });
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { addItem, handleCartClick } = useShoppingCart();

    const [isLogin, setIsLogin] = useState(() => {
      if (typeof window !== 'undefined') {
            const storedLogin = localStorage.getItem("login");
            return storedLogin === "true";
        }
        return false; 
    });
    
    const account = { 
        username: "ecommerce",
        password: "123456"
    }

    useEffect(() => {

    },[])

    useEffect(() => {
        const fetchData = async () => {
            const data: fullProduct = await getData(params.slug);
            setData(data);
            setLoading(false);
        };

        fetchData();
    }, [params.slug]);

    const handleLogin = () => {
      console.log("username",account.username)
      if (username == account.username && password == account.password){
        localStorage.setItem("login", "true");
        setIsLogin(true)
        setShowModal(false)
      }
      handleCartClick();
      console.log(isLogin);
    }
    console.log(username,password)

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="grid gap-8 md:grid-cols-2">
                    {!loading && <ImageGallery images={data.images} />}

                    <div className="md:py-8">
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
                            <div className="flex gap-2.5">
                                <div onClick={() => { 
                                      if (!isLogin) { 
                                          setShowModal(true); 
                                      } 
                                  }}>
                                      <AddToBag
                                          id={data._id}
                                          description={data.description}
                                          imageUrl={urlForImage(data.images[0])}
                                          name={data.name}
                                          category={data.categoryName}
                                          slug={data.slug}
                                          price={data.price}
                                          login={isLogin}
                                          mustLogin={true}
                                      />
                                  </div>

                                                                
                                <CheckoutNow
                                  id={data.price_id}
                                  description={data.description}
                                  imageUrl={urlForImage(data.images[0])}
                                  name={data.name}
                                  price={data.price}
                                  key={data._id}
                                  category={data.categoryName}
                                  slug={data.slug}
                                  login={isLogin}
                                  mustLogin={false}
                                />
                            </div>
                        )}

                        <p className="mt-12 text-base text-gray-500 tracking-wide">
                            {data.description}
                        </p>
                    </div>
                </div>
            </div>
            {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none " style={{width: "600px"}}>
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    You need business role for purchase
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto" >
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" style={{fontWeight: 600, fontSize:"16px"}}>Username</label>
                    <input onChange={(e) => setUserName(e.target.value)} value={username} type="text" id="account" aria-label="Account" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" style={{fontWeight: 600, fontSize:"16px"}}>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" aria-label="Password" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleLogin()}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
        </div>
    );
}
