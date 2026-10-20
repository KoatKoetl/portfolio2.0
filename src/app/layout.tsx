import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../components/theme-provider';
import LanguageSwitcher from '../components/ui/LanguageSwitcher';
import { I18nProvider } from '../i18n/I18nProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Stanislav's Portfolio",
  description: 'Minimalist, but perfect portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <I18nProvider>
            <LanguageSwitcher />
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
