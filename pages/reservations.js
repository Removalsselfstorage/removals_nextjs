import BookingLayout from "@/layouts/BookingLayout";
import Head from "next/head";
import React from "react";

const Reservations = () => {
  return (
    <>
      <Head>
        <title>Removals and Selfstorage - Reservations</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>
      <BookingLayout>
        <main className="mb-[70px] lg:mb-[100px] pt-[70px] min-h-[100vh]">
          <h1 className="font-bold text-[50px]">Reservations Dashboard</h1>
        </main>
      </BookingLayout>
    </>
  );
};

export default Reservations;
