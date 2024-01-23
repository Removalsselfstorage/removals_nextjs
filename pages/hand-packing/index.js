import NormalLayout from "@/layouts/NormalLayout";
import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const HandPacking = () => {
  return (
    <>
      <Head>
        <title>Storage - Removals and Selfstorage</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>

      <NormalLayout>
        <div className='bg-base-200 mt-[50px]  md:mt-[0px] md:pt-[70px] lg:pt-[100px]'>
          <div className='md:max-w-7xl mx-auto'></div>
        </div>
      </NormalLayout>
    </>
  );
};

export default HandPacking;
