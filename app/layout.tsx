import IntroAnimation from '@/components/IntroAnimation';
import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/components/CartContext';
import CustomCursor from '@/components/CustomCursor';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <IntroAnimation />
          <CustomCursor />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}