import type { Metadata } from "next";
import { Luckiest_Guy, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const luckiestGuy = Luckiest_Guy({
  weight: "400",
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cowz",
  description: "FCFS Whitelist Applications are now open. Complete the farm duties to apply and join the secret herd.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    apple: [
      { url: "/apple-touch-icon.png" }
    ]
  },
  manifest: "/site.webmanifest",
  other: {
    google: "notranslate",
  },
  openGraph: {
    title: "Cowz | Join The Secret Herd",
    description: "FCFS Whitelist Applications are now open. Complete the farm duties to apply and join the secret herd.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${luckiestGuy.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
      translate="no"
    >
      <body className="min-h-full flex flex-col bg-sky-blue overflow-x-hidden text-dark-text">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

