import Image from 'next/image';
import Head from 'next/head';
import { titleFont } from '@/utils/fonts';

export default function Home() {
  return (
    <>
      <Head>
        <title>Removals and Selfstorage - Book Movers & Moving Help Online</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <main className="md:max-w-7xl mx-auto p-2">
        <article className="prose mx-[40px]">
          <h1 className={`${titleFont.variable} font-sans2 text-secondary`}>
            Garlic bread with cheese: What the science tells us
          </h1>
          <h1 className="text-primary font-bold">tells us</h1>
          <ol>
            <li className="text-red-500 ">
              For years parents have espoused the health benefits of eating
              garlic bread with cheese to their children, with the food earning
              such an iconic status in our culture that kids will often dress up
              as warm, cheesy loaf for Halloween.
            </li>
          </ol>
          <p>
            But a recent study shows that the celebrated appetizer may be linked
            to a series of rabies cases springing up around the country.
          </p>
        </article>
      </main>
    </>
  );
}
