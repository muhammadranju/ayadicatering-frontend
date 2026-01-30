import MainFooter from "@/components/shared/MainFooter";
import MainHeader from "@/components/shared/MainHeader";
import I18nProvider from "@/components/providers/I18nProvider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#F2EEE6] min-h-screen">
      <I18nProvider>
        <MainHeader />
        <div className="flex flex-col justify-between min-h-screen">
          {children}
        </div>
        <MainFooter />
      </I18nProvider>
    </div>
  );
}
