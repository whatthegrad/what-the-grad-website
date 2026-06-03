import IntroAnimation from '@/components/IntroAnimation';
import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/components/CartContext';
import CustomCursor from '@/components/CustomCursor';
import Script from 'next/script'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
  <html lang="en">
        <head>
          <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet"/>
        </head>
        <body>
          <CartProvider>
            <IntroAnimation />
            <CustomCursor />
            {children}
          </CartProvider>
          <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload"/>
        </body>
      </html>
  );
}
