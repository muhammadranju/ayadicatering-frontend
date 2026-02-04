import React from "react";
import { Info, Map, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import MapModal from "@/components/pages/home/buildYourMenu/steps/MapModal";
import { DeliveryDetails } from "../types";

interface StepDeliveryProps {
  deliveryDetails: DeliveryDetails;
  setDeliveryDetails: React.Dispatch<React.SetStateAction<DeliveryDetails>>;
}

const StepDelivery: React.FC<StepDeliveryProps> = ({
  deliveryDetails,
  setDeliveryDetails,
}) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [isMapOpen, setIsMapOpen] = React.useState(false);

  const handleMapConfirm = (
    lat: number,
    lng: number,
    city: string,
    area: string,
    region: string,
    postalCode: string,
    country: string,
    street: string,
  ) => {
    setDeliveryDetails({
      ...deliveryDetails,
      city,
      area,
      region,
      postalCode,
      country,
      street,
    });
    setIsMapOpen(false);
  };

  return (
    <div className="mx-auto px-6 md:px-12 py-10">
      <h1 className=" text-3xl md:text-5xl text-center mb-4 text-charcoal">
        {t("menu.steps.deliveryTitle")}
      </h1>
      <p className="text-gray-500 text-center mb-10 font-light">
        {t("menu.steps.deliverySubtitle")}
      </p>

      <div className="bg-white border border-gray-100 shadow-xl shadow-gray-100/80 rounded-2xl p-8 md:p-10">
        <div className="flex items-center gap-3 mb-8 text-green-500  p-4 rounded-xl w-fit">
          <div className=" p-2 rounded-full shadow-sm bg-pink-50">
            <MapPin size={20} className="text-orange-500" />
          </div>
          <span className=" text-black font-semibold text-sm tracking-wide">
            {t("menu.steps.deliveryInfo")}
          </span>
        </div>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="name-input"
              className="block text-sm font-semibold text-charcoal mb-2"
            >
              {t("menu.steps.name") || "Full Name"}
            </label>
            <input
              id="name-input"
              type="text"
              value={deliveryDetails.name}
              onChange={(e) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  name: e.target.value,
                })
              }
              className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all placeholder:text-gray-300"
              placeholder={
                t("menu.steps.namePlaceholder") || "Enter your full name"
              }
            />
          </div>

          <div>
            <label
              htmlFor="street-input"
              className="block text-sm font-semibold text-charcoal mb-2"
            >
              {t("menu.steps.street")}
            </label>
            <div className="relative group">
              <input
                id="street-input"
                type="text"
                value={deliveryDetails.street}
                onChange={(e) =>
                  setDeliveryDetails({
                    ...deliveryDetails,
                    street: e.target.value,
                  })
                }
                className="w-full pl-4 pr-10 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all placeholder:text-gray-300 group-hover:border-gray-300"
                placeholder={t("menu.steps.streetPlaceholder")}
              />
              {isArabic ? (
                <>
                  <MapPin
                    className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-800 group-focus-within:text-green-500 transition-colors "
                    size={20}
                    aria-hidden="true"
                  />
                  <button
                    onClick={() => setIsMapOpen(true)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 hover:text-green-500 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full p-1"
                    aria-label="Open Map"
                    type="button"
                  >
                    <Map size={20} />
                  </button>
                </>
              ) : (
                <>
                  <MapPin
                    className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-800 group-focus-within:text-green-500 transition-colors "
                    size={20}
                    aria-hidden="true"
                  />
                  <button
                    onClick={() => setIsMapOpen(true)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-800 hover:text-green-500 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full p-1"
                    aria-label="Open Map"
                    type="button"
                  >
                    <Map size={20} />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                {t("menu.steps.city")}
              </label>
              <input
                type="text"
                value={deliveryDetails.city}
                onChange={(e) =>
                  setDeliveryDetails({
                    ...deliveryDetails,
                    city: e.target.value,
                  })
                }
                className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all placeholder:text-gray-300"
                placeholder={t("menu.steps.cityPlaceholder")}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                {t("menu.steps.area")}
              </label>
              <input
                type="text"
                value={deliveryDetails.area}
                onChange={(e) =>
                  setDeliveryDetails({
                    ...deliveryDetails,
                    area: e.target.value,
                  })
                }
                className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all placeholder:text-gray-300"
                placeholder={t("menu.steps.areaPlaceholder")}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">
              {t("menu.steps.whatsapp")}
            </label>
            <input
              type="number"
              value={deliveryDetails.whatsapp}
              onChange={(e) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  whatsapp: e.target.value,
                })
              }
              className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all placeholder:text-gray-300"
              placeholder={t("menu.steps.whatsappPlaceholder")}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">
              {t("menu.steps.email")}
            </label>
            <input
              type="email"
              value={deliveryDetails.email}
              onChange={(e) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  email: e.target.value,
                })
              }
              className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all placeholder:text-gray-300"
              placeholder={t("menu.steps.emailPlaceholder")}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">
              {t("menu.steps.note")}
            </label>
            <textarea
              value={deliveryDetails.note}
              onChange={(e) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  note: e.target.value,
                })
              }
              rows={3}
              className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all placeholder:text-gray-300 resize-none"
              placeholder={t("menu.steps.notePlaceholder")}
            />
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-1">
            <Info size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-700 leading-relaxed">
              🚚{t("menu.steps.deliveryNote")}
            </p>
          </div>
        </div>
      </div>

      <MapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onConfirm={handleMapConfirm}
      />
    </div>
  );
};

export default StepDelivery;
