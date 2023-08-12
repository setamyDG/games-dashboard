import '../globals.css';
import type { Metadata } from 'next';
import { Tektur } from 'next/font/google';
import { NextAuthProvider } from '@/components/Providers/NextAuthProvider';
import ReactQueryProvider from '@/components/Providers/QueryClient';
import { ThemeProvider } from '@/components/Providers/ThemeProvider';
import Header from '@/components/shared/Header';
import Navigation from '@/components/shared/Navigation';
const tektur = Tektur({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${tektur.className} bg-neutral-900`}>
        <ReactQueryProvider>
          <NextAuthProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
              <Header />
              <main className='flex'>
                <Navigation />
                <section className='mainContainer'>
                  <div className='w-full'>{children}</div>
                </section>
              </main>
            </ThemeProvider>
          </NextAuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
