import { Rubik, Roboto } from 'next/font/google';

export const titleFont = Rubik({
  //   weight: ["500", "600", "700"],
  subsets: ['latin'],
  variable: '--font-rubik',
});

export const textFont = Roboto({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-roboto',
});
