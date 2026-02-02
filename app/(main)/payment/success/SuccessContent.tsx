"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function SuccessContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("id");

  useEffect(() => {
    if (paymentId) {
      // Optional: Verify payment status with backend if needed
    }
  }, [paymentId]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6 animate-in zoom-in duration-300">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {t("payment.successTitle")}
        </h2>
        <p className="text-gray-500 mb-8">{t("payment.successDesc")}</p>

        {paymentId && (
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <p className="text-sm text-gray-500 mb-1">
              {t("payment.paymentRef")}
            </p>
            <p className="font-mono font-medium text-gray-900 break-all uppercase">
              #{paymentId.slice(-6)}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md transition-colors shadow-lg shadow-green-500/20"
          >
            {t("payment.BackToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
