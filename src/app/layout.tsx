import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PROFILE } from "@/lib/data";

const interTight = localFont({
  src: [
    {
      path: "../fonts/inter-tight-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../fonts/inter-tight-latin-wght-italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-inter-tight",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    {
      path: "../fonts/instrument-serif-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/instrument-serif-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: [
    {
      path: "../fonts/jetbrains-mono-latin-wght-normal.woff2",
      weight: "100 800",
      style: "normal",
    },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yashpathak.dev"),
  title: `${PROFILE.name} — ${PROFILE.role}`,
  description: PROFILE.resumeSummary,
  authors: [{ name: PROFILE.name, url: PROFILE.github }],
  keywords: [
    "Yash Pallav Pathak",
    "Full Stack Developer",
    "DevOps Specialist",
    "AI ML Engineer",
    "SolDevPath",
    "SolScan",
    "SolAmi",
    "Tedekstra",
    "NeZaaka",
    "Portfolio",
  ],
  openGraph: {
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description: PROFILE.resumeSummary,
    url: "https://yashpathak.dev",
    siteName: `${PROFILE.name} Portfolio`,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${PROFILE.name} — Full Stack Developer`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description: PROFILE.resumeSummary,
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased selection:bg-[#0d0d0d] selection:text-[#f4f2ee]">
        {children}
      </body>
    </html>
  );
}
