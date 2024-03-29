import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [
    {
      id: 1,
      // stripe_id: "price_1OZe9WHTmsPQv11MlEKsjdzR",
      stripe_id: "price_1OaQCkHTmsPQv11MrxV3Y3eU",
      image:
        "https://www.globepackaging.co.uk/images/Large%20Wardrobe%20Box%20Hanging%20Garment%20Carrier%20Moving%20Clothes.jpg",
      name: `Standard Large Size Double Wall Wardrobe Removal Boxes 20"x19"x38"`,
      price: "20.50",
      qty: 1,
    },
    {
      id: 2,
      // stripe_id: "price_1OZe93HTmsPQv11M1jtNmDd3",
      stripe_id: "price_1OaQCbHTmsPQv11Mp1Hi5gwP",
      image:
        "https://www.globepackaging.co.uk/images/Removal%20kit%20no%201%20GP%20site.jpg",
      name: "House Moving Removal Kit No 1 (Cardboard Boxes + Materials)",
      price: "39.99",
      qty: 1,
    },
    {
      id: 3,
      // stripe_id: "price_1OZe8LHTmsPQv11MnaBst0ai",
      stripe_id: "price_1OaQCOHTmsPQv11M5chBLCRK",
      image:
        "https://lirp.cdn-website.com/5499e577/dms3rep/multi/opt/6-640w.jpg",
      name: `Double Wall Medium Storage Packing Boxes 18"x12"x12"`,
      price: "5.99",
      qty: 1,
    },
    {
      id: 4,
      // stripe_id: "price_1OZe7HHTmsPQv11MRCu0Peg1",
      stripe_id: "price_1OaQCAHTmsPQv11MjUnvHD1p",
      image:
        "https://www.globepackaging.co.uk/images/Small%20bubble%20wrap%20PRODUCT%20PIC%20globe%20packaging.jpg",
      name: "Roll of Small Bubble Wrap 300mm x 100M",
      price: "14.99",
      qty: 1,
    },
    {
      id: 5,
      // stripe_id: "price_1OZe6lHTmsPQv11MGdkH5z6j",
      stripe_id: "price_1OaQBqHTmsPQv11MXuiuVhyH",
      image:
        "https://www.globepackaging.co.uk/images/Mattress%20cover%20latest%20site.jpg",
      name: "Heavy Duty King Size Mattress Removal Poly Cover Bag",
      price: "10.99",
      qty: 1,
    },
    {
      id: 6,
      // stripe_id: "price_1OZe61HTmsPQv11MlIOtzaV9",
      stripe_id: "price_1OaQBiHTmsPQv11M2BMNsSHe",
      image:
        "https://www.globepackaging.co.uk/images/sofa%20cover%20latest%20SITE%20RS.jpg",
      name: "Heavy Duty Four Seat Sofa Removal Poly Cover Storage Bag",
      price: "10.99",
      qty: 1,
    },
    {
      id: 7,
      // stripe_id: "price_1OZe5YHTmsPQv11MxXsbLHxC",
      stripe_id: "price_1OZycqHTmsPQv11Ma0Tj0OCs",
      image:
        "https://www.globepackaging.co.uk/images/ProLoc%20low%20noise%20tape%20BROWN%20for%20use.jpg",
      name: "Rolls ProLoc Low Noise Brown Packing Tape 48mm x 66M",
      price: "1.00",
      // price: "2.99",
      qty: 1,
    },
    {
      id: 8,
      // stripe_id: "price_1OZe4xHTmsPQv11MOLx1An98",
      stripe_id: "price_1OaQB7HTmsPQv11M85d9yhyr",
      image:
        "https://www.globepackaging.co.uk/images/Fragile%20tape%20site.jpg",
      name: "Rolls Of FRAGILE Low Noise Printed Packing Tape 48mm x 66M",
      price: "3.99",
      qty: 1,
    },
  ],
};

export const packagingSlice = createSlice({
  name: "packaging",
  initialState,
  reducers: {
    // All products
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    increaseProductQty: (state, action) => {
      const { itemName } = action.payload;
      const allProducts = state?.allProducts;

      // Find the index of the item with the given name in the bedRoom array
      const itemIndex = allProducts.findIndex((item) => item.name === itemName);

      if (itemIndex !== -1) {
        // If the item is found, increase its qty by 1
        allProducts[itemIndex].qty += 1;
      }
    },
    decreaseProductQty: (state, action) => {
      const { itemName } = action.payload;
      const allProducts = state?.allProducts;

      // Find the index of the item with the given name in the bedRoom array
      const itemIndex = allProducts.findIndex((item) => item.name === itemName);

      if (itemIndex !== -1) {
        // If the item is found, increase its qty by 1
        if (allProducts[itemIndex].qty > 1) allProducts[itemIndex].qty -= 1;
      }
    },
    resetProductQty: (state, action) => {
      const { itemName } = action.payload;
      const allProducts = state?.allProducts;

      // Find the index of the item with the given name in the bedRoom array
      const itemIndex = allProducts.findIndex((item) => item.name === itemName);

      if (itemIndex !== -1) {
        // If the item is found, increase its qty by 1
        allProducts[itemIndex].qty = 1;
      }
    },
  },
});

export const { increaseProductQty, decreaseProductQty, resetProductQty } =
  packagingSlice.actions;

export const getAllPackagingDetails = (state) => state?.packaging?.allProducts;

export default packagingSlice.reducer;
