import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ThemeScript } from "@/components/ThemeScript";

export const metadata: Metadata = {
  metadataBase: new URL("https://abdulganiy.dev"),
  title: {
    default: "Abdulganiy Adeleke — Developer Relations Engineer & Technical Writer",
    template: "%s | Abdulganiy Adeleke",
  },
  description:
    "Developer relations and technical writing portfolio for Abdulganiy Adeleke, focused on developer tools, Web3, AI-assisted tooling, documentation, and community.",
  openGraph: {
    title: "Abdulganiy Adeleke — Developer Relations Engineer & Technical Writer",
    description:
      "Proof-first DevRel portfolio featuring projects, content, open-source contributions, and community work.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="font-sans antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
