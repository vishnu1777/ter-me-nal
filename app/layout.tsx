import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Terminal Portfolio | Interactive Developer Portfolio",
  description:
    "An interactive terminal-style portfolio showcasing projects, skills, and experience. Built with Next.js, TypeScript, and Framer Motion.",
  keywords: [
    "portfolio",
    "developer",
    "terminal",
    "next.js",
    "react",
    "typescript",
  ],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Terminal Portfolio",
    description: "Interactive terminal-style developer portfolio",
    type: "website",
    url: "https://yourwebsite.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Terminal Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terminal Portfolio",
    description: "Interactive terminal-style developer portfolio",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
