import Image from 'next/image';
import Head from 'next/head';
import { titleFont } from '@/utils/fonts';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Removals and Selfstorage - Book Movers & Moving Help Online
        </title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <main className="">
        <Hero />
      </main>
    </>
  );
}
