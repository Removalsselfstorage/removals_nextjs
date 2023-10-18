import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ProductRow from "./ProductRow";
import { MdNotificationsActive } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import useProductCart from "@/hooks/useProductCart";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import useQuote from "@/hooks/useQuote";
import { getCurrentDateFormatted } from "@/utils/logics";

const BuyItems = ({
  image,
  showLoader2,
  selectedTime,
  setSelectedTime,
  clickedModalOpen,
  setClickedModalOpen,
  // timeValue,
  // setTimeValue,
}) => {
  const products = [
    {
      id: 1,
      image:
        "https://www.globepackaging.co.uk/images/Large%20Wardrobe%20Box%20Hanging%20Garment%20Carrier%20Moving%20Clothes.jpg",
      name: `Standard Large Size Double Wall Wardrobe Removal Boxes 20"x19"x38"`,
      price: "£20.50",
      qty: 1,
    },
    {
      id: 2,
      image:
        "https://www.globepackaging.co.uk/images/Removal%20kit%20no%201%20GP%20site.jpg",
      name: "House Moving Removal Kit No 1 (40 Cardboard Boxes + Materials)",
      price: "£39.99",
      qty: 1,
    },
    {
      id: 3,
      image:
        "https://lirp.cdn-website.com/5499e577/dms3rep/multi/opt/6-640w.jpg",
      name: `Double Wall Medium Storage Packing Boxes 18"x12"x12"`,
      price: "£5.99",
      qty: 1,
    },
    {
      id: 4,
      image:
        "https://www.globepackaging.co.uk/images/Small%20bubble%20wrap%20PRODUCT%20PIC%20globe%20packaging.jpg",
      name: "300mm x 100M Roll of Small Bubble Wrap",
      price: "£14.99",
      qty: 1,
    },
    {
      id: 5,
      image:
        "https://www.globepackaging.co.uk/images/Mattress%20cover%20latest%20site.jpg",
      name: "Heavy Duty King Size Mattress Removal Poly Cover Bag",
      price: "£10.99",
      qty: 1,
    },
    {
      id: 6,
      image:
        "https://www.globepackaging.co.uk/images/sofa%20cover%20latest%20SITE%20RS.jpg",
      name: "Heavy Duty Four Seat Sofa Removal Poly Cover Storage Bag",
      price: "£10.99",
      qty: 1,
    },
    {
      id: 7,
      image:
        "https://www.globepackaging.co.uk/images/ProLoc%20low%20noise%20tape%20BROWN%20for%20use.jpg",
      name: "Rolls ProLoc Low Noise Brown Packing Tape 48mm x 66M",
      price: "£2.99",
      qty: 1,
    },
    {
      id: 8,
      image:
        "https://www.globepackaging.co.uk/images/Fragile%20tape%20site.jpg",
      name: "Rolls Of FRAGILE Low Noise Printed Packing Tape 48mm x 66M",
      price: "£3.99",
      qty: 1,
    },
  ];

  const {
    allProducts,
    allCartProducts,

    // All Products
    increaseProductQtyFxn,
    decreaseProductQtyFxn,
    resetProductQtyFxn,

    // Cart Products
    addToCartFxn,
    increaseQuantityFxn,
    decreaseQuantityFxn,
    deleteProductFxn,
    resetCartFxn,

    router,
  } = useProductCart();

  const { reserveDetails, resetBookS, reserveId, updateReserveIdFxn } =
    useQuote();

  const bookingId = reserveDetails?.bookingId;

  const handleCart = async () => {
    try {
      await setDoc(
        doc(db, "bookingData", bookingId),

        {
          date: getCurrentDateFormatted(),
          stage: "reservation",
          cartCheckedOut: "NO",
          cartItems: allCartProducts,
        },
        { merge: true }
      );

      // return true;
      console.log("cart items update was successful @ reservation");
    } catch (error) {
      console.log(error);
      // return false;
      console.log("cart items update was unsuccessful @ reservation");
    }
  };

  // const [allProducts, setAllProducts] = useState(products);
  // console.log({ reserveDetails });

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <div className="drawer-content mb-[10px] md:mb-[20px] flex space-x-[10px]">
          <p className="text-2xl font-bold mb-[10px] select-none">
            Buy Packaging Items:
          </p>
          <label
            htmlFor="my_drawer_44"
            className="drawer-button  flex items-center relative cursor-pointer"
            onClick={handleCart}
          >
            <span className="text-[25px] mr-[10px] ">
              <BsCart4 />
            </span>
            <div className="absolute top-[-5px] right-[-4px] bg-secondary rounded-full flex justify-center items-center p-[0px] text-white w-[25px] h-[25px] text-[10px]">
              {allCartProducts?.length}
            </div>
          </label>
        </div>
        <div className="drawer-content mb-[10px] md:mb-[20px] flex space-x-[10px]">
          <label
            htmlFor="my_drawer_44"
            className="drawer-button btn btn-outline btn-primary  flex items-center relative cursor-pointer"
            onClick={handleCart}
          >
            CheckOut Cart
          </label>
        </div>
      </div>

      <div className="w-full mb-[20px]">
        {reserveDetails?.stripeCartProducts?.length > 0 && (
          <div className="text-secondary font-bold">Ordered Items: </div>
        )}
        {reserveDetails?.stripeCartProducts?.map((sp, index) => {
          return (
            <div className="text-[14px] font-semibold" key={index}>
              {sp.quantity} x {sp.name},{" "}
            </div>
          );
        })}
      </div>

      <ProductRow
        id="product_box"
        // products={allProducts}
        // products2={allProducts}
      />
    </div>
  );
};

export default BuyItems;
