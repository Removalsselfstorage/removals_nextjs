import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Cart products
    addToCart: (state, action) => {
      const existingProduct = state.products?.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.qty += action.payload.qty;
      } else {
        state.products?.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const existingProduct = state.products?.find(
        (item) => item.id === action.payload.id
      );
      existingProduct && existingProduct.qty++;
    },
    decreaseQuantity: (state, action) => {
      const existingProduct = state.products?.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct?.qty === 1) {
        existingProduct.qty === 1;
      } else {
        existingProduct && existingProduct.qty--;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products?.filter(
        (item) => item.id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
    // Calculate total price
    // calculateTotalPrice: (state) => {
    //   let totalPrice = 0;
    //   state?.products?.forEach((product) => {
    //     totalPrice += product.price * product.qty; // Assuming each product has a 'price' property
    //   });
    //   return totalPrice;
    // },
  },
});

export const {
  increaseProductQty,
  decreaseProductQty,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
  // calculateTotalPrice,
} = cartSlice.actions;

export const getAllCartDetails = (state) => state?.cart?.products;
// export const getAllProductsDetails = (state) => state?.cart?.allProducts;

export default cartSlice.reducer;
