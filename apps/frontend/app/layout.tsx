import './globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Providers from './providers';

export const metadata = {
  title: 'OpusPro | AI-Powered Video Editor',
  description: 'Create professional videos with AI assistance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Providers>
          <main className="min-h-screen font-sans">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
