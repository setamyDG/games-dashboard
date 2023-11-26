import '../globals.css';
import type { Metadata } from 'next';
import { Tektur } from 'next/font/google';
import { NextAuthProvider } from '@/components/Providers/NextAuthProvider';
import { NextUILibProvider } from '@/components/Providers/NextUIProvider';
import { ThemeProvider } from '@/components/Providers/ThemeProvider';
import { Header } from '@/components/shared/Header';
const tektur = Tektur({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Games Dashboard',
  description: 'Welcome to the Games Dashboard, platform where you can discover new games and manage your own games.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${tektur.className} bg-neutral-900`}>
        <NextAuthProvider>
          <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
            <NextUILibProvider>
              <Header />
              <main className='flex'>
                <section className='mainContainer'>
                  <div className='w-full px-4 md:px-0'>{children}</div>
                </section>
              </main>
            </NextUILibProvider>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
