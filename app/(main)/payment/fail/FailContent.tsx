"use client";

import { XCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function FailContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("id");

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6 animate-in zoom-in duration-300">
          <XCircle className="h-10 w-10 text-red-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {t("payment.failTitle")}
        </h2>
        <p className="text-gray-500 mb-8">{t("payment.failDesc")}</p>

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
            href="/build-your-menu"
            className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md transition-colors shadow-lg shadow-green-500/20"
          >
            {t("payment.tryAgain")}
          </Link>
          <Link
            href="/"
            className="block w-full bg-white border border-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
          >
            {t("payment.BackToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
