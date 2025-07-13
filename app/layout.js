import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sparkmart - Save Money. Live Better.',
  description: 'Shop everything you need at Sparkmart with unbeatable prices and fast delivery',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%230071ce;stop-opacity:1" /><stop offset="100%" style="stop-color:%23005a9c;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="50" r="45" fill="url(%23grad)"/><text x="50" y="65" font-family="Arial,sans-serif" font-size="45" font-weight="bold" text-anchor="middle" fill="white">S</text></svg>',
        type: 'image/svg+xml',
      },
    ],
    shortcut: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%230071ce;stop-opacity:1" /><stop offset="100%" style="stop-color:%23005a9c;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="50" r="45" fill="url(%23grad)"/><text x="50" y="65" font-family="Arial,sans-serif" font-size="45" font-weight="bold" text-anchor="middle" fill="white">S</text></svg>',
    apple: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%230071ce;stop-opacity:1" /><stop offset="100%" style="stop-color:%23005a9c;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="50" r="45" fill="url(%23grad)"/><text x="50" y="65" font-family="Arial,sans-serif" font-size="45" font-weight="bold" text-anchor="middle" fill="white">S</text></svg>',
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}