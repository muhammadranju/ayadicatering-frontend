import { Suspense } from "react";
import FailContent from "./FailContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Failed | Ayadi Catering",
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <FailContent />
    </Suspense>
  );
}
