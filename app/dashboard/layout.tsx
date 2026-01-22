import { Header } from "@/components/dashboard/Header";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard Overview - TechAdvantage",
  description: "Dashboard Overview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`} dir="ltr">
        <SidebarProvider className="bg-neutral-50">
          <AppSidebar />
          <SidebarInset>
            <div className="flex-1 flex flex-col overflow-hidden bg-neutral-50">
              <Header />

              <main className="flex-1 overflow-y-auto p-6 ">
                <div className=" mx-auto space-y-6   mt-6 rounded-xl">
                  {children}
                  <Toaster />
                </div>
              </main>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
