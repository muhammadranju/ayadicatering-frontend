import StoreProvider from "@/lib/redux/provider";
import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Script from "next/script";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });

export const viewport: Viewport = {
  themeColor: "#E07A5F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ayadicatering.com"),
  title: {
    default: "AYADI Catering | Premium Food Catering Services",
    template: "%s | AYADI Catering",
  },
  description:
    "Experience premium food catering with AYADI. We offer bespoke menus, professional service, and unforgettable culinary experiences for weddings, corporate events, and private parties.",
  keywords: [
    "Catering",
    "Food Services",
    "Event Catering",
    "Wedding Catering",
    "Corporate Catering",
    "Build Your Menu",
    "Ayadi Catering",
    "Food Delivery",
  ],
  authors: [{ name: "AYADI Catering" }],
  creator: "AYADI Catering",
  publisher: "AYADI Catering",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "AYADI Catering | Premium Food Catering Services",
    description:
      "Book your food appointment with ease using our platform. Create your custom menu today.",
    url: "https://www.ayadicatering.com",
    siteName: "AYADI Catering",
    images: [
      {
        url: "/images/booking.png", // Ensure this path is correct relative to public
        width: 1200,
        height: 630,
        alt: "AYADI Catering - Premium Food Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AYADI Catering",
    description: "Premium food catering services for all occasions.",
    images: ["/images/booking.png"], // Ensure this path is correct
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
  alternates: {
    canonical: "./",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CateringService",
    name: "AYADI Catering",
    image: "https://www.ayadicatering.com/images/booking.png",
    "@id": "https://www.ayadicatering.com",
    url: "https://www.ayadicatering.com",
    telephone: "+966500000000", // Update with actual phone if known or leave generic
    address: {
      "@type": "PostalAddress",
      streetAddress: "Riyadh",
      addressLocality: "Riyadh",
      postalCode: "12345",
      addressCountry: "SA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 24.7136,
      longitude: 46.6753,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "22:00",
    },
    sameAs: [
      "https://www.instagram.com/ayadicatering",
      "https://twitter.com/ayadicatering",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased`}>
        <Script
          id="schema-org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <StoreProvider>
          {children}
          <Toaster richColors closeButton position="top-center" />
        </StoreProvider>
      </body>
    </html>
  );
}
