import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luma — Listen to Your PDFs",
  description:
    "Luma transforms any PDF into structured chapters you can listen to. Upload, parse, and learn — hands-free.",
  keywords: ["PDF to audio", "listen to documents", "AI PDF parser", "study tool", "Luma"],
  openGraph: {
    title: "Luma — Listen to Your PDFs",
    description:
      "Upload any PDF. Luma breaks it into chapters and lets you listen to it — anytime, anywhere.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
