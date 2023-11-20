import '../globals.css';
import type { Metadata } from 'next';
import { Tektur } from 'next/font/google';

const tektur = Tektur({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Games Dashboard',
  description: 'Welcome to the Games Dashboard, platform where you can discover new games and manage your own games.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={tektur.className}>{children}</body>
    </html>
  );
}
