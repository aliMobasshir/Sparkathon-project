import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sparkmart - Save Money. Live Better.',
  description: 'Shop everything you need at Sparkmart with unbeatable prices and fast delivery',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23ffc220;stop-opacity:1" /><stop offset="100%" style="stop-color:%23ffb800;stop-opacity:1" /></linearGradient></defs><rect x="10" y="10" width="80" height="80" rx="15" ry="15" fill="url(%23grad)"/><text x="50" y="65" font-family="Arial,sans-serif" font-size="45" font-weight="bold" text-anchor="middle" fill="%230071ce">S</text></svg>',
        type: 'image/svg+xml',
      },
    ],
    shortcut: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23ffc220;stop-opacity:1" /><stop offset="100%" style="stop-color:%23ffb800;stop-opacity:1" /></linearGradient></defs><rect x="10" y="10" width="80" height="80" rx="15" ry="15" fill="url(%23grad)"/><text x="50" y="65" font-family="Arial,sans-serif" font-size="45" font-weight="bold" text-anchor="middle" fill="%230071ce">S</text></svg>',
    apple: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23ffc220;stop-opacity:1" /><stop offset="100%" style="stop-color:%23ffb800;stop-opacity:1" /></linearGradient></defs><rect x="10" y="10" width="80" height="80" rx="15" ry="15" fill="url(%23grad)"/><text x="50" y="65" font-family="Arial,sans-serif" font-size="45" font-weight="bold" text-anchor="middle" fill="%230071ce">S</text></svg>',
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