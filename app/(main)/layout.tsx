import MainHeader from "@/components/shared/MainHeader";
import StoreProvider from "@/lib/redux/provider";
import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import { Toaster } from "sonner";
import "../globals.css";
import MainFooter from "@/components/shared/MainFooter";

// Importing the Inter font
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

// Importing a monospace font (Source Code Pro as an example)
const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AYADI - Food Booking Platform",
  description: "Book your food appointment with ease using our platform.",
  openGraph: {
    title: "AYADI - Food Booking Platform",
    description: "Book your food appointment with ease using our platform.",
    url: "https://www.ayadi.com/booking",
    images: [
      {
        url: "https://www.ayadi.com/images/booking.png",
        width: 1200,
        height: 630,
        alt: "AYADI - Food Booking Platform",
      },
    ],
    siteName: "AYADI - Food Booking Platform",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sourceCodePro.variable} antialiased bg-[#F2EEE6]`}
      >
        <StoreProvider>
          <MainHeader />
          <div className="flex flex-col justify-between min-h-screen">
            {children}
          </div>
          <MainFooter />
        </StoreProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
