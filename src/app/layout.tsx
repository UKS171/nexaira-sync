import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexaira Sync | Merchant Dashboard",
  description:
    "A lightweight merchant dashboard for products, inventory, sales, and customer orders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
