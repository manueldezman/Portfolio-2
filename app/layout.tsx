import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { ThemeScript } from "@/components/ThemeScript";
import { SkyScenery, GroundScenery } from "@/components/Scenery";

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
      {/* Added 'relative min-h-screen w-full flex flex-col justify-between' to manage flow layout timing */}
      <body className="font-sans antialiased relative min-h-screen w-full flex flex-col justify-between">
        
        {/* 1. Sky sits cleanly at the top flow boundary */}
        <SkyScenery />
        
        {/* 2. Main content column sits in the middle, locking layout width blocks */}
        <main className="w-full flex-grow">
          {children}
        </main>
        
        <Header />
        
        {/* 3. Ground sits cleanly at the absolute bottom flow boundary */}
        <GroundScenery/>
        
      </body>
    </html>
  );
}
