import type { Metadata } from "next";
import { Epilogue, Inter } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Muhammed Mubashir P | Strategic Marketing Consultant",
  description: "Executive-level strategic marketing consultant specializing in brand development, campaign management, operations, and leadership coaching. Let's build something meaningful together.",
  openGraph: {
    title: "Muhammed Mubashir P | Strategic Marketing Consultant",
    description: "Executive-level strategic marketing consultant specializing in brand development, campaign management, operations, and leadership coaching.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${epilogue.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-[#F3F4F6] text-[#111827] font-inter flex flex-col">{children}</body>
    </html>
  );
}
