import { Rubik, Commissioner, Inter } from 'next/font/google';

export const titleFont = Commissioner({
  //   weight: ["500", "600", "700"],
  subsets: ['latin'],
  variable: '--font-commissioner',
});

// export const subTitleFont = Roboto({
// //   weight: '400',
//   subsets: ['latin'],
//   variable: '--font-roboto',
// });

export const textFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
