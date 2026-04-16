import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "GameChanger AI | Practical AI consulting for legacy operations",
  description:
    "GameChanger AI helps companies audit operations, redesign workflows, and implement practical AI tools inside legacy systems and real-world business constraints.",
  metadataBase: new URL("https://gamechanger-ai-site.vercel.app"),
  openGraph: {
    title: "GameChanger AI | Practical AI consulting for legacy operations",
    description:
      "AI audits, workflow redesign, and practical implementation for companies dealing with legacy systems, operational constraints, and adoption risk.",
    url: "https://gamechanger-ai-site.vercel.app",
    siteName: "GameChanger AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GameChanger AI",
    description:
      "Practical AI consulting for companies that need useful systems, not generic transformation talk.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${dmSerifDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
