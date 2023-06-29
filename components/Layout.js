import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { textFont } from '@/utils/fonts';

const Layout = ({ children }) => {
  return (
    <div className={`${textFont.variable} font-sans`}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
