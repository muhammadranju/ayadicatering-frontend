import MainFooter from "@/components/shared/MainFooter";
import MainHeader from "@/components/shared/MainHeader";
import I18nProvider from "@/components/providers/I18nProvider";
import StoreProvider from "@/lib/redux/provider";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import "../globals.css";

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
const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased bg-[#F2EEE6]`}>
        <StoreProvider>
          <I18nProvider>
            <MainHeader />
            <div className="flex flex-col justify-between min-h-screen">
              {children}
            </div>
            <MainFooter />
          </I18nProvider>
        </StoreProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
