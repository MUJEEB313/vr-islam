import type { Metadata, Viewport } from "next";
import { Amiri, Inter, Sora } from "next/font/google";
import { asset, site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
// Only the weights actually used are loaded, to keep mobile downloads small.
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: "600" });
const amiri = Amiri({ variable: "--font-amiri", subsets: ["arabic"], weight: "400" });

// A new file name whenever the image changes, so apps that cached the old preview fetch it again.
const shareImage = asset("/brand/share-v4.jpg");

// Home page title and description (SEO brief).
const homeTitle = "VR Islam – Islamic History Through Virtual Reality";
const homeDescription =
  "Explore Islamic history through immersive virtual reality, 360° videos and historic Islamic places. Experience Islamic heritage like never before.";

// Schema markup (SEO brief), placed in <head>.
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://vrislam.net/#website",
  name: "VR ISLAM",
  url: "https://vrislam.net/",
  publisher: {
    "@id": "https://vrislam.net/#organization",
  },
};

export const metadata: Metadata = {
  // Origin only: relative URLs below already include the base path.
  metadataBase: new URL(site.origin),
  title: { default: homeTitle, template: `%s · ${site.name}` },
  description: homeDescription,
  openGraph: { siteName: site.name, title: homeTitle, description: homeDescription, type: "website", locale: "en", images: [{ url: shareImage, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: homeTitle, description: homeDescription, images: [shareImage] },
  appleWebApp: { capable: true, title: site.name, statusBarStyle: "default" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Draw under the notch / home indicator; layouts add safe-area padding.
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${amiri.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema, null, 2) }} />
      </head>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
