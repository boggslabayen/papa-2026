import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Plus_Jakarta_Sans,
  Space_Mono,
} from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://robertlabayen.com"),
  title: {
    default: "Robert Labayen | Creative Leader, Artist & Speaker",
    template: "%s | Robert Labayen",
  },
  description:
    "Talks and creative workshops by Robert Labayen for teams that want to think braver, lead with meaning, and communicate with impact.",
  openGraph: {
    type: "website",
    title: "Robert Labayen | Ideas That Move People",
    description:
      "Creative talks and workshops for teams that want their work to mean more.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Robert Labayen, creative leader, artist, and speaker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robert Labayen | Ideas That Move People",
    description:
      "Creative talks and workshops for teams that want their work to mean more.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} ${jakarta.variable} ${spaceMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
