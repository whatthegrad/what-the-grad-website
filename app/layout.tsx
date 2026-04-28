import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/components/CartContext';
import CustomCursor from '@/components/CustomCursor';

export const metadata: Metadata = {
  title: 'What The Grad',
  description: 'Career guidance for students aged 14–22',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <CustomCursor />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}