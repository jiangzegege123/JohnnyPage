import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800", "900"],
});

export const metadata: Metadata = {
  title: "Johnny's Page",
  description: "Beautiful Baby! Come on and visit😊😊",
  icons: {
    icon: "/images/icon.jpg",
    shortcut: "/images/icon.jpg",
    apple: "/images/icon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
