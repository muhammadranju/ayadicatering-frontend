"use client";
import { STEPS } from "@/components/pages/home/buildYourMenu/data";
import { MenuItem } from "@/components/pages/home/buildYourMenu/types";
import { useGetBuildPackageListQuery } from "@/lib/redux/features/api/buildPackage/buildPackageApiSlice";
import Stepper from "@/components/pages/home/buildYourMenu/Stepper";
import StepDateTime from "@/components/pages/home/buildYourMenu/steps/StepDateTime";
import StepDelivery from "@/components/pages/home/buildYourMenu/steps/StepDelivery";
import StepMenuSelection from "@/components/pages/home/buildYourMenu/steps/StepMenuSelection";
import StepPayment from "@/components/pages/home/buildYourMenu/steps/StepPayment";
import StepSuccess from "@/components/pages/home/buildYourMenu/steps/StepSuccess";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

interface BuildYourMenuProps {
  isPackageMode?: boolean;
}

const BuildYourMenu: React.FC<BuildYourMenuProps> = ({
  isPackageMode = false,
}) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(isPackageMode ? 1 : 0);

  // Update step if prop changes (though usually initial load matters most)
  useEffect(() => {
    // Scroll to top when step changes
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (isPackageMode && step === 0) {
      setStep(1);
    }
  }, [step, isPackageMode]);

  // --- STEP 0: Menu Selection ---
  const [selectedSalad, setSelectedSalad] = useState<string | null>(null);
  const [selectedAppetizers, setSelectedAppetizers] = useState<string[]>([]);
  const [selectedMains, setSelectedMains] = useState<string[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // --- STEP 1: Date & Time ---
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // --- STEP 2: Delivery Details ---
  const [deliveryDetails, setDeliveryDetails] = useState({
    street: "",
    city: "",
    area: "",
    whatsapp: "",
    email: "",
    note: "",
  });

  // --- STEP 3: Payment ---
  const [paymentMethod, setPaymentMethod] = useState("credit");

  // --- Data Fetching & Transformation ---
  const { data: buildPackagesData } = useGetBuildPackageListQuery({
    limit: 1000,
  });

  const { salads, classics, signatures, customAddons, allItemsForCalculation } =
    useMemo(() => {
      const items: any[] = buildPackagesData?.data?.data || [];

      const transformedItems: MenuItem[] = items.map((item) => {
        let category: MenuItem["category"] = "main"; // Default
        const catName = (item.categoryId?.name || "").toLowerCase().trim();

        if (catName === "salad" || catName === "salads") category = "salad";
        else if (catName === "classic" || catName === "classics")
          category = "appetizer";
        else if (
          catName === "signature item" ||
          catName === "signature items" ||
          catName === "signatures" ||
          catName === "main course"
        )
          category = "main";
        else if (catName === "add-on" || catName === "add-ons")
          category = "addon";

        return {
          id: item._id,
          name: item.platterName,
          nameArabic: item.platterNameArabic,
          description: item.description,
          descriptionArabic: item.descriptionArabic,
          price: item.price,
          image: item.image,
          category,
          platterNameArabic: item.platterNameArabic,
          isAvailable: item.isAvailable,
          relatedItems: [],
        };
      });

      const _salads = transformedItems.filter((i) => i.category === "salad");
      const _classics = transformedItems.filter(
        (i) => i.category === "appetizer",
      );
      const _signatures = transformedItems.filter((i) => i.category === "main");

      // Custom Add-ons Construction
      const _customAddons: MenuItem[] = [
        {
          id: "white-rice",
          name: "White Rice",
          platterNameArabic: "أرز أبيض",
          description: "",
          descriptionArabic: "",
          price: 60,
          category: "addon",
        },
        {
          id: "grilled-vegetables",
          name: "Grilled Vegetables",
          platterNameArabic: "خضار مشوية",
          description: "",
          descriptionArabic: "",
          price: 120,
          category: "addon",
        },
        {
          id: "sauces",
          name: "Sauces",
          platterNameArabic: "صلصات",
          description: "",
          descriptionArabic: "",
          price: 10,
          category: "addon",
        },
        {
          id: "addon-salad-dropdown",
          name: "Salad",
          platterNameArabic: "سلطة",
          category: "addon",
          price: 295,
          // Map salads to related items with overridden price
          relatedItems: _salads.map((s) => ({ ...s, price: 295 })),
        },
        {
          id: "addon-classic-dropdown",
          name: "Classic",
          platterNameArabic: "كلاسيك",
          category: "addon",
          price: 365,
          // Map classics to related items with overridden price
          relatedItems: _classics.map((c) => ({ ...c, price: 365 })),
        },
        {
          id: "addon-main-dropdown",
          name: "Main Dish",
          platterNameArabic: "طبق رئيسي",
          category: "addon",
          price: 395,
          // Map signatures to related items with overridden price
          relatedItems: _signatures.map((s) => ({ ...s, price: 395 })),
        },
      ];

      const flatAddonItems: MenuItem[] = [];
      _customAddons.forEach((addon) => {
        if (addon.relatedItems) {
          flatAddonItems.push(...addon.relatedItems);
        } else {
          flatAddonItems.push(addon);
        }
      });

      return {
        salads: _salads,
        classics: _classics,
        signatures: _signatures,
        customAddons: _customAddons,
        allItemsForCalculation: flatAddonItems,
      };
    }, [buildPackagesData]);

  // Selection Logic for Step 0
  const handleSaladSelect = (id: string) =>
    setSelectedSalad(id === selectedSalad ? null : id);

  const handleAppetizerSelect = (id: string) => {
    if (selectedAppetizers.includes(id)) {
      setSelectedAppetizers((prev) => prev.filter((item) => item !== id));
    } else if (selectedAppetizers.length < 2) {
      setSelectedAppetizers((prev) => [...prev, id]);
    }
  };

  const handleMainSelect = (id: string) => {
    if (selectedMains.includes(id)) {
      setSelectedMains((prev) => prev.filter((item) => item !== id));
    } else if (selectedMains.length < 3) {
      setSelectedMains((prev) => [...prev, id]);
    }
  };

  const handleAddonSelect = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons((prev) => prev.filter((item) => item !== id));
    } else if (selectedAddons.length < 6) {
      setSelectedAddons((prev) => [...prev, id]);
    }
  };

  // Calculations
  const selectedAddonObjects = useMemo(() => {
    return selectedAddons
      .map((id) => allItemsForCalculation.find((item) => item.id === id))
      .filter((item): item is MenuItem => !!item);
  }, [selectedAddons, allItemsForCalculation]);

  const subtotal = selectedAddonObjects.reduce(
    (acc, curr) => acc + (curr.price || 0),
    0,
  );
  const total = subtotal;

  // Navigation Logic
  const canGoNext = () => {
    if (step === 0)
      return (
        selectedSalad &&
        selectedAppetizers.length === 2 &&
        selectedMains.length === 3
      );
    if (step === 1) return selectedDate && selectedTime;
    if (step === 2)
      return (
        deliveryDetails.street &&
        deliveryDetails.city &&
        deliveryDetails.whatsapp &&
        deliveryDetails.email
      );
    if (step === 3) return true; // Payment simulation
    return false;
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };
  const handleBack = () => {
    if (step > (isPackageMode ? 1 : 0)) setStep(step - 1);
  };

  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div className="w-full max-w-7xl pb-40 mx-auto">
      {/* Header */}
      {step < 4 && (
        <div>
          <Stepper steps={STEPS} currentStep={step} />
          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-700">
              <h1 className=" text-4xl md:text-6xl lg:mt-20 mb-4 text-charcoal">
                {t("menu.title")}
              </h1>
              <p className="text-color font-light text-lg max-w-2xl mx-auto">
                {t("menu.subtitle")}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
        {step === 0 && (
          <StepMenuSelection
            selectedSalad={selectedSalad}
            handleSaladSelect={handleSaladSelect}
            selectedAppetizers={selectedAppetizers}
            handleAppetizerSelect={handleAppetizerSelect}
            selectedMains={selectedMains}
            handleMainSelect={handleMainSelect}
            selectedAddons={selectedAddons}
            handleAddonSelect={handleAddonSelect}
            salads={salads}
            classics={classics}
            signatures={signatures}
            addons={customAddons}
          />
        )}
        {step === 1 && (
          <StepDateTime
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
        )}
        {step === 2 && (
          <StepDelivery
            deliveryDetails={deliveryDetails}
            setDeliveryDetails={setDeliveryDetails}
          />
        )}
        {step === 3 && (
          <StepPayment
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedAddons={selectedAddons}
            onComplete={handleNext}
          />
        )}
        {step === 4 && <StepSuccess />}
      </div>

      {/* Navigation Footer (Static) */}
      {step < 3 && (
        <div className=" bg-white rounded-md shadow-lg mx-auto  px-10">
          <div className=" py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              {/* Selected Summary (Only Step 0) */}
              {step === 0 ? (
                <div className="flex-grow w-full">
                  <h4 className=" text-lg mb-4 text-charcoal">
                    {t("menu.selectedAddons")}
                  </h4>

                  <div className="mb-4">
                    {selectedAddonObjects.length === 0 ? (
                      <p className="text-gray-400 text-sm italic">
                        {t("menu.noAddons")}
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {selectedAddonObjects.map((addon) => (
                          <div
                            key={addon.id}
                            className="flex justify-between text-base text-gray-600"
                          >
                            <span>
                              {isArabic
                                ? addon.platterNameArabic || addon.name
                                : addon.name}
                            </span>
                            <span className="font-medium">
                              {addon.price} {t("menu.SARprice")}
                            </span>
                          </div>
                        ))}
                        <div className="flex justify-between text-sm text-gray-600 pt-4 border-t border-gray-200">
                          <span>Vat (15%)</span>
                          <span>
                            {(subtotal * 0.15).toFixed(2)} {t("menu.SARprice")}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="font-bold text-gray-800 text-lg">
                      {t("menu.totalAddons")}:
                    </span>
                    <span className="font-bold text-gray-800 text-lg">
                      {(total * 1.15).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}{" "}
                      {t("menu.SARprice")}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex-grow"></div>
              )}
            </div>
            {/* Actions */}
            <div className="flex gap-4 w-full  pt-10  justify-between items-end h-full ">
              <button
                onClick={handleBack}
                disabled={step === (isPackageMode ? 1 : 0)}
                className={`px-10 py-3 rounded-md font-medium transition-colors cursor-pointer ${
                  step === (isPackageMode ? 1 : 0)
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed "
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {t("menu.back")}
              </button>
              <button
                onClick={handleNext}
                disabled={!canGoNext()}
                className={`px-12 py-3 rounded-md font-medium transition-all shadow-md cursor-pointer ${
                  canGoNext()
                    ? "bg-green-500 text-white hover:bg-green-700 shadow-green-500/20"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                }`}
              >
                {t("menu.next")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuildYourMenu;
