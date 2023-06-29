import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div data-theme="mytheme">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
