import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/core/Auth/Navbar";
import Footer from "@/components/common/Footer";
import StoreProvider from "./StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
4;
export const metadata: Metadata = {
  title: "Service Ally",
  description: "Your All In One field Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ClerkProvider>
            <Navbar />
            {children}
            <Footer />
          </ClerkProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
