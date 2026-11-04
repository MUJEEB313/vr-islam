import type { Metadata, Viewport } from "next";
import { Amiri, Inter, Sora } from "next/font/google";
import { asset, site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
// Only the weights actually used are loaded, to keep mobile downloads small.
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: "600" });
const amiri = Amiri({ variable: "--font-amiri", subsets: ["arabic"], weight: "400" });

const shareImage = asset("/brand/og-image.jpg");

export const metadata: Metadata = {
  // Origin only: relative URLs below already include the base path.
  metadataBase: new URL(site.origin),
  title: { default: `${site.name}: Islamic heritage in 360° & VR`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, type: "website", locale: "en", images: [{ url: shareImage, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: [shareImage] },
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
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
