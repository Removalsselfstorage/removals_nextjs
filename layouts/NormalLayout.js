import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { textFont } from "@/utils/fonts";
import SessionProvider from "@/utils/SessionProvider";

const NormalLayout = ({ children }) => {
  return (
    <div className={`${textFont.variable} font-sans`}>
        <Navbar />
        {children}
        <Footer />
    </div>
  );
};

export default NormalLayout;
