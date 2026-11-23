import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { Header } from "@/components/Header";
import { ThemeScript } from "@/components/ThemeScript";
import { SkyScenery, GroundScenery } from "@/components/Scenery";
import { AudioNotice } from "@/components/AudioNotice";
import { socials } from "@/content/socials";

const siteUrl = "https://0xdezman.cv";
const siteDescription =
  "Developer relations and technical writing portfolio for Abdulganiy Adeleke, focused on developer tools, Web3, AI-assisted tooling, documentation, and community.";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "Abdulganiy Adeleke",
      description: siteDescription,
      inLanguage: "en",
      author: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Abdulganiy Adeleke",
      url: `${siteUrl}/`,
      jobTitle: "Developer Relations Engineer and Technical Writer",
      sameAs: [
        socials.x.href,
        socials.linkedin.href,
        socials.youtube.href,
        socials.github.href,
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Abdulganiy Adeleke — Developer Relations Engineer & Technical Writer",
    template: "%s | Abdulganiy Adeleke",
  },
  description: siteDescription,
  openGraph: {
    title: "Abdulganiy Adeleke — Developer Relations Engineer & Technical Writer",
    description:
      "Proof-first DevRel portfolio featuring projects, content, open-source contributions, and community work.",
    type: "website",
    images: [{ url: "/og/profile.png", width: 1200, height: 675 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdulganiy Adeleke — Developer Relations Engineer & Technical Writer",
    description:
      "Proof-first DevRel portfolio featuring projects, content, open-source contributions, and community work.",
    images: ["/og/profile.png"],
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
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />
      </head>
      {/* Added 'relative min-h-screen w-full flex flex-col justify-between' to manage flow layout timing */}
      <body className="font-sans antialiased relative min-h-screen w-full flex flex-col justify-between">
        <AudioNotice />
        
        {/* 1. Sky sits cleanly at the top flow boundary */}
        <SkyScenery />
        
        {/* 2. Main content column sits in the middle, locking layout width blocks */}
        <main className="w-full flex-grow">
          {children}
        </main>
        
        <Header />
        
        {/* 3. Ground sits cleanly at the absolute bottom flow boundary */}
        <GroundScenery/>

        <Analytics />
        
      </body>
    </html>
  );
}
