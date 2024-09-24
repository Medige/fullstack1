import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Shopcontext } from "../context/Shopcontext";
import ProductItem from "../components/ProductItem";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(Shopcontext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row -mr-40">
        {/* product info */}

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_dull_icon} className="w-3 5" alt="" />
            <p className="pl-2">(123)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:4/5 ">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? "border-gray-400" : ""}`} key={index}> {item} </button>
              ))}
            </div>
          </div>
          <button onClick={()=> addToCart(productData._id,size)}  className=" bg-black text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CART</button>
          <hr className="mt-8 sm:w-5/5 " />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Products.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>

        {/* large single image */}
        <div className="w-full sm:w-[30%]">
          <img className="w-full h-auto" src={image} alt="" />

          {/*  Description & Review */}
        </div>

        {/* product images */}
        <div className="flex-1 flex-col-reverse  gap-3 sm:flex-row">
          <div className="flex sm:flex-col  overflow-x-auto  justify-between sm:justify-normal sm:w-[22.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
        </div>
      </div>

      <div className=" mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (123)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 ">
          <p>
            An e-commerce website is an online platform that faclitates the
            buying and selling of products or services over the internet.
          </p>
          <p>
            E-commerce weebsites typically display products or service along
            with detailed description ,images,prices,and any available
            variations.
          </p>
        </div>
      </div>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
