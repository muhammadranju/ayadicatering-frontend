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
import { useCreateOrderMutation } from "@/lib/redux/features/api/orders/ordersApiSlice";
import { toast } from "sonner";

import { useGetSetPackageListQuery } from "@/lib/redux/features/api/set-package/setPackageApiSlice";
import { saveOrderTime } from "@/lib/utils/orderStorage";
import { format } from "date-fns";

interface BuildYourMenuProps {
  isPackageMode?: boolean;
  packageId?: string;
}

const BuildYourMenu: React.FC<BuildYourMenuProps> = ({
  isPackageMode = false,
  packageId,
}) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(isPackageMode ? 1 : 0);

  // Fetch Set Packages to find the selected one
  const { data: setPackagesData } = useGetSetPackageListQuery(undefined);
  const selectedPackage = useMemo(() => {
    if (!isPackageMode || !packageId || !setPackagesData?.data?.data)
      return null;
    return (
      setPackagesData.data.data.find((pkg: any) => pkg._id === packageId) ||
      null
    );
  }, [isPackageMode, packageId, setPackagesData]);

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

  // Calculations - Get actual selected items with their prices
  const selectedSaladObject = useMemo(() => {
    if (!selectedSalad) return null;
    return salads.find((item) => item.id === selectedSalad) || null;
  }, [selectedSalad, salads]);

  const selectedAppetizerObjects = useMemo(() => {
    return selectedAppetizers
      .map((id) => classics.find((item) => item.id === id))
      .filter((item): item is MenuItem => !!item);
  }, [selectedAppetizers, classics]);

  const selectedMainObjects = useMemo(() => {
    return selectedMains
      .map((id) => signatures.find((item) => item.id === id))
      .filter((item): item is MenuItem => !!item);
  }, [selectedMains, signatures]);

  const selectedAddonObjects = useMemo(() => {
    return selectedAddons
      .map((id) => allItemsForCalculation.find((item) => item.id === id))
      .filter((item): item is MenuItem => !!item);
  }, [selectedAddons, allItemsForCalculation]);

  // Calculate prices for Build Your Own mode
  const saladPrice = selectedSaladObject?.price || 0;
  const appetizersPrice = selectedAppetizerObjects.reduce(
    (acc, curr) => acc + (curr.price || 0),
    0,
  );
  const mainsPrice = selectedMainObjects.reduce(
    (acc, curr) => acc + (curr.price || 0),
    0,
  );
  const addonsPrice = selectedAddonObjects.reduce(
    (acc, curr) => acc + (curr.price || 0),
    0,
  );

  // Base price = salad + appetizers + mains (for Build Your Own) OR package price
  const packagePrice = selectedPackage ? selectedPackage.price : 0;
  const buildYourOwnBasePrice = isPackageMode
    ? 0
    : saladPrice + appetizersPrice + mainsPrice;
  const basePrice = isPackageMode ? packagePrice : buildYourOwnBasePrice;

  // Total = base price + addons
  const subtotal = basePrice + addonsPrice;
  const vat = subtotal * 0.15;
  const total = subtotal + vat;

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

  // ... existing imports ...

  // Inside component:
  const [createOrder, { isLoading: isSubmitting }] = useCreateOrderMutation();

  // --- NEW: Data Aggregation & Logging ---
  const handleCompleteBooking = async () => {
    // 1. Organize selected menu items
    const bookingData = {
      orderType: isPackageMode ? "SET_PACKAGE" : "BUILD_YOUR_OWN",
      // Include selected package details if in package mode
      selectedPackage: isPackageMode ? selectedPackage : null,

      menuSelection: isPackageMode
        ? null
        : {
            salad: selectedSaladObject,
            appetizers: selectedAppetizerObjects,
            mains: selectedMainObjects,
          },
      addons: selectedAddons,
      dateTime: {
        date: selectedDate,
        time: selectedTime,
      },
      deliveryDetails: deliveryDetails,
      paymentMethod: paymentMethod,
      // Pricing Breakdown
      pricing: {
        basePrice: basePrice,
        addonsPrice: addonsPrice,
        subtotal: subtotal,
        vat: vat,
        total: total,
      },
    };

    console.group("🛒 Booking Data Aggregated");
    console.log("Full Booking Payload:", bookingData);
    console.groupEnd();

    try {
      await createOrder(bookingData).unwrap();

      // Save order time to localStorage to prevent multiple orders for same date within 5 hours
      if (selectedDate) {
        saveOrderTime(format(selectedDate, "yyyy-MM-dd"));
      }

      toast.success(t("Order placed successfully!"));
      // Proceed to Success Step
      handleNext();
    } catch (error) {
      console.error("Failed to create order:", error);
      toast.error(t("Failed to place order. Please try again."));
    }
  };

  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div className="w-full max-w-7xl pb-40 mx-auto">
      {/* Header */}
      {step < 4 && (
        <>
          <div className="sticky top-0   pt-2">
            <Stepper steps={STEPS} currentStep={step} />
          </div>
          {step === 0 && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-700">
              <h1 className=" text-4xl md:text-6xl lg:mt-20 mb-4 text-charcoal  font-semibold text-center">
                {t("menu.title")}
              </h1>
              <p className="text-color font-normal text-lg max-w-3xl mx-auto text-center">
                {t("menu.subtitle")}
              </p>
            </div>
          )}
        </>
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
            subtotal={subtotal}
            vat={vat}
            total={total}
            basePrice={basePrice}
            isPackageMode={isPackageMode}
            selectedPackage={selectedPackage}
            onComplete={handleCompleteBooking}
          />
        )}
        {step === 4 && <StepSuccess />}
      </div>

      {/* Navigation Footer (Static) */}
      {step < 3 && (
        <div className="mx-auto m w-full max-w-7xl px-4 md:px-6 lg:px-8">
          {/* Selected Summary (Only Step 0) */}
          {step === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
              <h4 className="text-xl font-medium mb-6 text-charcoal">
                {t("menu.selectedAddons")}
              </h4>

              <div className="mb-6">
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
                    <div className="flex justify-between text-sm text-gray-600 pt-4 border-t border-gray-100 mt-4">
                      <span>Vat</span>
                      <span>15%</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-gray-100">
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
          )}

          {/* Actions */}
          <div className="flex justify-between w-full">
            <button
              onClick={handleBack}
              disabled={step === (isPackageMode ? 1 : 0)}
              className={`px-10 py-3 rounded-md font-medium transition-colors cursor-pointer ${
                step === (isPackageMode ? 1 : 0)
                  ? "bg-white text-gray-400 border border-gray-200 cursor-not-allowed"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm"
              }`}
            >
              {t("menu.back")}
            </button>
            <button
              onClick={handleNext}
              disabled={!canGoNext()}
              className={`px-12 py-3 rounded-md font-medium transition-all shadow-md cursor-pointer ${
                canGoNext()
                  ? "bg-[#5D6F56] text-white hover:bg-[#4A5944] shadow-[#5D6F56]/20"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
              }`}
            >
              {t("menu.next")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuildYourMenu;
