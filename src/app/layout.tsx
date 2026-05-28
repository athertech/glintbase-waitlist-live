import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Glintbase | Agentic Documentation Engine",
  description: "Eliminate documentation debt with agentic velocity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground tracking-tight">
        {children}
      </body>
    </html>
  );
}


// app/layout.tsx
import type { Metadata } from "next";

// 1. Define and export your static metadata configuration
export const metadata: Metadata = {
  title: "My Production Site",
  description: "Built with Next.js and Vercel",
  
  // 2. Insert the Google Search Console metadata key here
  verification: {
    google: "FuwkZGg4rWDRQLqPv7TBAdIsXx8AZt5eQ2T0PW1dO4s", // <-- Paste your exact content token string here
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
