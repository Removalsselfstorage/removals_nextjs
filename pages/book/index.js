import SecurePayment from '@/components/BookingPages/SecurePayment';
import Features from '@/components/HomePage/Features';
import Hero from '@/components/HomePage/Hero';
import BookingLayout from '@/layouts/BookingLayout';
import Head from 'next/head';
import React from 'react';

const Booking = () => {
  return (
    <BookingLayout>
      <Head>
        <title>
          Removals and Selfstorage - Book Movers & Moving Help Online
        </title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <main className="">
        <SecurePayment />
        <Features />
      </main>
    </BookingLayout>
  );
};

export default Booking;
