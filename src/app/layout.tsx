import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Adam Lansley',
  description:
    'Building feature-rich, responsive, and performant web applications.',
  authors: { name: 'Adam Lansley', url: 'https://adumb.uk' },
  keywords: [
    'web development',
    'front end developer',
    'web dev',
    'ui developer',
    'web programming',
    'web design and development',
    'front end web developer',
  ],
  creator: 'Adam Lansley',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
