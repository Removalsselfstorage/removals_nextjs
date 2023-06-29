import Image from 'next/image';
import { Inter } from 'next/font/google';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>RSS</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/favicon.co" />
      </Head>
      <main className="md:max-w-7xl mx-auto p-2">
        <article className="prose mx-[40px]">
          <h1>Garlic bread with cheese: What the science tells us</h1>
          <h2>tells us</h2>
          <ol>
            <li>
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
