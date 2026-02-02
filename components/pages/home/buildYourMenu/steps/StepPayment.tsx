import { format } from "date-fns";
import { CheckCircle2, CreditCard, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DeliveryDetails } from "../types";

interface StepPaymentProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  selectedDate: Date | null;
  selectedTime: string | null;
  selectedAddons: string[];
  subtotal: number;
  vat: number;
  total: number;
  basePrice: number;
  isPackageMode?: boolean;
  selectedPackage?: { platterName?: string; person?: number | string };
  onComplete: () => void;
  isLoading?: boolean;
  deliveryDetails: DeliveryDetails;
}

const StepPayment: React.FC<StepPaymentProps> = ({
  // paymentMethod,
  // setPaymentMethod,
  selectedDate,
  selectedTime,
  total,
  isPackageMode = false,
  selectedPackage,
  onComplete,
  isLoading = false,
}) => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className=" text-3xl md:text-5xl text-center mb-4 text-charcoal">
        {t("menu.steps.paymentTitle")}
      </h1>
      <p className="text-gray-500 text-center mb-10 font-light">
        {t("menu.steps.paymentSubtitle")}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white/90 border-2 border-gray-200 p-8 rounded-lg flex flex-col items-center justify-center min-h-[300px]">
            <CreditCard size={64} className="text-gray-300 mb-6" />
            <h3 className="font-medium text-xl mb-2 text-charcoal text-center">
              {t("menu.steps.securePayment") || "Secure Payment"}
            </h3>
            <p className="text-gray-500 text-center max-w-md mb-8">
              {t("menu.steps.paymentDescription") ||
                "You will be redirected to our secure payment gateway to complete your purchase."}
            </p>

            <button
              onClick={onComplete}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-12 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {t("menu.steps.payNow") || "Pay Now"} ({total} SAR)
                </>
              )}
            </button>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5 flex items-start gap-3 shadow-sm">
            <CheckCircle2 size={24} className="text-blue-500 mt-0.5" />
            <p className="text-sm text-gray-600 leading-relaxed">
              {t("menu.steps.refundPolicy")}
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 h-fit sticky top-6 shadow-lg shadow-gray-100/50">
          <h3 className=" text-2xl mb-6 text-charcoal">
            {t("menu.steps.orderSummary")}
          </h3>
          <div className="space-y-4">
            <div className="pb-6 border-b border-gray-100">
              <h4 className="font-semibold text-sm text-charcoal mb-3 uppercase tracking-wide">
                {isPackageMode && selectedPackage
                  ? selectedPackage.platterName
                  : t("menu.steps.buffetMenu")}
              </h4>
              <div className="text-sm text-gray-500 space-y-2">
                <p className="flex justify-between">
                  <span>{t("menu.steps.date")}</span>
                  <span className="font-medium text-gray-700">
                    {selectedDate
                      ? format(selectedDate, "dd/MM/yyyy")
                      : "Not selected"}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>{t("menu.steps.time")}</span>
                  <span className="font-medium text-gray-700">
                    {selectedTime || "Not selected"}
                  </span>
                </p>
                {isPackageMode && selectedPackage && (
                  <p className="flex justify-between">
                    <span>{t("menu.steps.guests")}</span>
                    <span className="font-medium text-gray-700">
                      {selectedPackage.person}
                    </span>
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-gray-800 text-lg">
                {t("menu.total")}:
              </span>
              <span className="font-bold text-green-600 text-xl">
                {total.toLocaleString()} SAR
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepPayment;
