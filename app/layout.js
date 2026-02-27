import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Poppins } from "next/font/google";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Whatsapp from "./Components/Whatsapp";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL("https://shelter4u.in"),
  title: {
    default: "Shelter4U - Zero Brokerage Real Estate Platform",
    template: "%s | Shelter4U",
  },
  description:
    "Discover the best zero brokerage flats, affordable properties, and premium projects by top builders in Ahmedabad & Gandhinagar.",
  keywords: [
    "zero brokerage properties",
    "affordable flats",
    "real estate India",
    "buy property",
    "Shelter4U",
  ],
  openGraph: {
    title: "Shelter4U - Zero Brokerage Real Estate Platform",
    description:
      "Explore affordable, verified real estate listings from top builders. Flats available in Ahmedabad & Gandhinagar with zero brokerage.",
    url: "https://shelter4u.in",
    siteName: "Shelter4U",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Shelter4U Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shelter4U - Zero Brokerage Real Estate",
    description:
      "Recommended real estate from Shelter4U. Builder projects with zero brokerage across India.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="font-main">
        <NextTopLoader showSpinner={false} />
        <Header />
        <Whatsapp />
        {children}
        <Footer />
      </body>
    </html>
  );
}
