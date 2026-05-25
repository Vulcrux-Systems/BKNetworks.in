import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { GlobalParticles } from "@/components/ui/GlobalParticles";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: {
    default: "BKNetwork Services Pvt. Ltd | Partners in Growth",
    template: "%s | BKNetwork Services",
  },
  description:
    "Innovative IT services, strategic consulting, and cutting-edge technology implementations. Transform your business with BKNetwork Services.",
  keywords: [
    "IT services",
    "IT consulting",
    "cloud services",
    "cybersecurity",
    "DevOps",
    "digital transformation",
    "enterprise solutions",
    "India",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "BKNetwork Services Pvt. Ltd",
    title: "BKNetwork Services Pvt. Ltd | Partners in Growth",
    description:
      "Innovative IT services, strategic consulting, and cutting-edge technology implementations.",
  },
  icons: {
    icon: "/Favicon-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} overflow-x-hidden`} suppressHydrationWarning>
      <body className="font-sans antialiased text-foreground overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <div className="relative w-full overflow-x-hidden">
              <GlobalParticles />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
