// export default function ProfileLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex flex-col justify-between min-h-screen bg-white">
//       {children}
//     </div>
//   );
// }

import { Header } from "@/components/dashboard/Header";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Overview - AYADI",
  description: "Dashboard Overview - AYADI",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="bg-neutral-50">
      <AppSidebar />
      <SidebarInset>
        <div className="flex-1 flex flex-col overflow-hidden bg-neutral-50">
          <Header />

          <main className="flex-1 overflow-y-auto p-6 ">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
