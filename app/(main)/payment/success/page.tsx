import { Suspense } from "react";
import SuccessContent from "./SuccessContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Successful | Ayadi Catering",
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
      <SuccessContent />
    </Suspense>
  );
}
