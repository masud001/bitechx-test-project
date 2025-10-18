import "./globals.css";
import Providers from "./providers";
import { Inter, Playfair_Display } from "next/font/google";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import type { Viewport } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "Product Management App";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bitechx-test-live.netlify.app/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s — " + SITE_NAME,
  },
  description:
    "Manage products, categories, and inventory with a modern UI.",
  keywords: [
    "products",
    "inventory",
    "categories",
    "react",
    "nextjs",
    "management",
  ],
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: SITE_NAME,
    description:
      "Manage products, categories, and inventory with a modern UI.",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "Manage products, categories, and inventory with a modern UI.",
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EFF1F3" },
    { media: "(prefers-color-scheme: dark)", color: "#0D1821" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('theme')?.value as 'light' | 'dark' | undefined;
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning data-theme={themeCookie}>
      <head>
        {/* Pre-hydration theme to avoid flash of incorrect theme */}
        <script dangerouslySetInnerHTML={{
          __html: `(() => { try { var t = localStorage.getItem('theme'); if (t) { document.documentElement.setAttribute('data-theme', t); } } catch(e){} })();`
        }} />
        {/* Performance hints for external resources */}
        <link rel="dns-prefetch" href="https://api.bitechx.com" />
        <link rel="preconnect" href="https://api.bitechx.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://i.imgur.com" />
        <link rel="preconnect" href="https://i.imgur.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://laravelpoint.com" />
        <link rel="preconnect" href="https://laravelpoint.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
