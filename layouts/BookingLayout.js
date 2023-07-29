import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { textFont } from "@/utils/fonts";
import Navbar2 from "@/components/Navbar/Navbar2";
import SessionProvider from "@/utils/SessionProvider";

const BookingLayout = ({ children }) => {
  return (
    <div className={`${textFont.variable} font-sans`}>
      <Navbar2 />
      {children}
      <Footer />
    </div>
  );
};

export default BookingLayout;
