import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Narayan Foundation | Donation',
  description: 'Support Vision United World through secure donations.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
