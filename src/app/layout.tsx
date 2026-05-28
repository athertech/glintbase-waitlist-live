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

// Both metadata blocks are combined into this single object
export const metadata: Metadata = {
  title: "Glintbase | Agentic Documentation Engine",
  description: "Eliminate documentation debt with agentic velocity.",
  verification: {
    google: "FuwkZGg4rWDRQLqPv7TBAdIsXx8AZt5eQ2T0PW1dO4s", 
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
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground tracking-tight">
        {children}
      </body>
    </html>
  );
}
