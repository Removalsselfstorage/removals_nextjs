import React from "react";
import ProductCard from "./ProductCard";
import ProductRow from "./ProductRow";

const BuyItems = () => {
  const products = [
    {
      id: 1,
      image:
        "https://www.globepackaging.co.uk/images/Large%20Wardrobe%20Box%20Hanging%20Garment%20Carrier%20Moving%20Clothes.jpg",
      name: `5 x Standard Large Size Double Wall Wardrobe Removal Boxes 20"x19"x38"`,
      price: "£20.50",
    },
    {
      id: 2,
      image:
        "https://www.globepackaging.co.uk/images/Removal%20kit%20no%201%20GP%20site.jpg",
      name: "House Moving Removal Kit No 1 (40 Cardboard Boxes + Materials)",
      price: "£39.99",
    },
    {
      id: 3,
      image:
        "https://lirp.cdn-website.com/5499e577/dms3rep/multi/opt/6-640w.jpg",
      name: `5 x Double Wall Medium Storage Packing Boxes 18"x12"x12"`,
      price: "£5.99",
    },
    {
      id: 4,
      image:
        "https://www.globepackaging.co.uk/images/Small%20bubble%20wrap%20PRODUCT%20PIC%20globe%20packaging.jpg",
      name: "300mm x 100M Roll of Small Bubble Wrap",
      price: "£14.99",
    },
    {
      id: 5,
      image:
        "https://www.globepackaging.co.uk/images/Mattress%20cover%20latest%20site.jpg",
      name: "1 x Heavy Duty King Size Mattress Removal Poly Cover Bag",
      price: "£10.99",
    },
    {
      id: 6,
      image:
        "https://www.globepackaging.co.uk/images/sofa%20cover%20latest%20SITE%20RS.jpg",
      name: "1 x Heavy Duty Four Seat Sofa Removal Poly Cover Storage Bag",
      price: "£10.99",
    },
    {
      id: 7,
      image:
        "https://www.globepackaging.co.uk/images/ProLoc%20low%20noise%20tape%20BROWN%20for%20use.jpg",
      name: "6 x Rolls ProLoc Low Noise Brown Packing Tape 48mm x 66M",
      price: "£2.99",
    },
    {
      id: 8,
      image:
        "https://www.globepackaging.co.uk/images/Fragile%20tape%20site.jpg",
      name: "Pro6 x Rolls Of FRAGILE Low Noise Printed Packing Tape 48mm x 66M",
      price: "£3.99",
    },
  ];

  return (
    <div>
      <div className="mb-[10px] md:mb-[20px]">
        <p className="text-2xl font-bold mb-[10px] select-none">
          Buy Packaging Items:
        </p>
        <p className="text-[14px]"></p>
      </div>

      <ProductRow id="product_box" products={products} />
    </div>
  );
};

export default BuyItems;
