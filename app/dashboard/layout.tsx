import { Header } from "@/components/dashboard/Header";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import LtrEnforcer from "@/components/providers/LtrEnforcer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Overview - AYADI",
  description: "Dashboard Overview - AYADI",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LtrEnforcer>
      <SidebarProvider className="bg-neutral-50">
        <AppSidebar />
        <SidebarInset>
          <div className="flex-1 flex flex-col overflow-hidden bg-neutral-50">
            <Header />

            <main className="flex-1 overflow-y-auto p-6 ">
              <div className=" mx-auto space-y-6   mt-6 rounded-xl">
                {children}
              </div>
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </LtrEnforcer>
  );
}
