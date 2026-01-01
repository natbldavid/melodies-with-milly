import './globals.css';
import Header from '@/components/header/header';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { Montserrat } from 'next/font/google';
import { MelodiesWithMillyJsonLd } from '@/lib/structuredData';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'Children\'s Parties - Fun & Memorable Events',
  description: 'Professional children\'s party planning and entertainment services. Create unforgettable birthday parties and events for your kids.',
  keywords: 'children parties, kids birthday, party planning, entertainment',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.className}>
            <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(MelodiesWithMillyJsonLd),
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}