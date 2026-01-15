"use client";
import {
  ADDONS,
  CLASSICS,
  SALADS,
  SIGNATURES,
  STEPS,
  TIME_SLOTS,
} from "@/components/pages/home/buildYourMenu/data";
import MenuCard from "@/components/pages/home/buildYourMenu/MenuCard";
import Stepper from "@/components/pages/home/buildYourMenu/Stepper";
import { MenuItem } from "@/components/pages/home/buildYourMenu/types";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  Info,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaApple, FaCcVisa, FaRegCreditCard } from "react-icons/fa6"; // Using react-icons for specific brands

const BuildYourMenu: React.FC = () => {
  const [step, setStep] = useState(0);

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

  // Selection Logic for Step 0
  const handleSaladSelect = (id: string) =>
    setSelectedSalad(id === selectedSalad ? null : id);

  const handleAppetizerSelect = (id: string) => {
    if (selectedAppetizers.includes(id)) {
      setSelectedAppetizers((prev) => prev.filter((item) => item !== id));
    } else if (selectedAppetizers.length < 3) {
      setSelectedAppetizers((prev) => [...prev, id]);
    }
  };

  const handleMainSelect = (id: string) => {
    if (selectedMains.includes(id)) {
      setSelectedMains((prev) => prev.filter((item) => item !== id));
    } else if (selectedMains.length < 2) {
      setSelectedMains((prev) => [...prev, id]);
    }
  };

  const handleAddonSelect = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedAddons((prev) => [...prev, id]);
    }
  };

  // Calculations
  const selectedAddonObjects = ADDONS.filter((addon) =>
    selectedAddons.includes(addon.id)
  );
  const subtotal = selectedAddonObjects.reduce(
    (acc, curr) => acc + (curr.price || 0),
    0
  );
  const total = subtotal;

  // Navigation Logic
  const canGoNext = () => {
    if (step === 0)
      return (
        selectedSalad &&
        selectedAppetizers.length === 3 &&
        selectedMains.length === 2
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
    if (step > 0) setStep(step - 1);
  };

  // ---- RENDER HELPERS ----

  const renderSection = (
    title: string,
    subtitle: string,
    items: MenuItem[],
    selectedIds: string[] | string | null,
    onSelect: (id: string) => void,
    limit?: number
  ) => {
    return (
      <div className="mb-16">
        <h2 className="font-tinos text-3xl md:text-4xl text-charcoal mb-2">
          {title}
        </h2>
        <div className="flex items-center gap-2 mb-6">
          <p className="text-gray-500 font-light text-lg">{subtitle}</p>
          {limit && (
            <div className="h-1 flex-grow bg-gray-100 rounded-full max-w-[100px] ml-4">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    ((Array.isArray(selectedIds) ? selectedIds.length : 0) /
                      limit) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const isSelected = Array.isArray(selectedIds)
              ? selectedIds.includes(item.id)
              : selectedIds === item.id;
            const isDisabled =
              limit && Array.isArray(selectedIds)
                ? selectedIds.length >= limit && !isSelected
                : false;
            return (
              <MenuCard
                key={item.id}
                item={item}
                isSelected={isSelected}
                onSelect={() => onSelect(item.id)}
                disabled={isDisabled as boolean}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    return (
      <div className="p-4 bg-white rounded-lg select-none">
        <div className="flex items-center justify-between mb-8 px-2">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-gray-600"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="font-tinos text-xl text-charcoal font-medium">
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-gray-600"
          >
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-7 text-center gap-y-6 text-sm text-gray-400 mb-4 font-medium">
          {weekDays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-2">
          {dateRange.map((day, idx) => {
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            return (
              <div
                key={idx}
                onClick={() => isCurrentMonth && setSelectedDate(day)}
                className={`
                  text-center text-sm cursor-pointer rounded-full transition-all w-10 h-10 flex items-center justify-center mx-auto
                  ${
                    !isCurrentMonth
                      ? "text-gray-300 pointer-events-none"
                      : "text-charcoal hover:bg-gray-100"
                  }
                  ${
                    isSelected
                      ? "!bg-green-500 font-semibold !text-white shadow-md transform scale-105"
                      : ""
                  }
                `}
              >
                {format(day, "d")}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // --- VIEWS ---

  const Step0View = (
    <div className="lg:container md:max-w-7xl mx-auto px-6 md:px-12 py-10">
      {renderSection(
        "Salad",
        "Select 1 salad",
        SALADS,
        selectedSalad,
        handleSaladSelect
      )}
      {renderSection(
        "Classics",
        "Select 3 appetizers",
        CLASSICS,
        selectedAppetizers,
        handleAppetizerSelect,
        3
      )}
      {renderSection(
        "Signature Items",
        "Select 2 main courses",
        SIGNATURES,
        selectedMains,
        handleMainSelect,
        2
      )}
      {renderSection(
        "Add ons",
        "Optional extras to enhance your gathering",
        ADDONS,
        selectedAddons,
        handleAddonSelect
      )}
    </div>
  );

  const Step1View = (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
      <h1 className="font-tinos text-3xl md:text-5xl text-center mb-4 text-charcoal">
        Select Date & Time
      </h1>
      <p className="text-gray-500 text-center mb-10 font-light">
        Choose your preferred delivery date and time
      </p>

      <div className="bg-[#FFF4F2] border border-[#FCD7D7] rounded-md p-4 flex items-center gap-3 text-[#B34545] mb-10">
        <Clock size={20} />
        <span className="text-sm font-medium">
          Please book at least 24 hours in advance. We deliver between 9:00 AM
          and 8:00 PM.
        </span>
      </div>

      <div className="bg-white border border-gray-100 shadow-lg shadow-gray-100/50 rounded-xl p-6 md:p-10 mb-10">
        {renderCalendar()}
      </div>

      <div className="mb-10">
        <h3 className="flex items-center gap-2 font-medium text-lg mb-6 text-charcoal">
          <Clock size={20} className="text-green-500" /> Delivery Time
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedTime(slot)}
              className={`py-4 px-4 rounded-lg text-sm border transition-all duration-200 ${
                selectedTime === slot
                  ? "bg-[#E6FAF2] border-green-500 text-green-500 font-semibold shadow-sm"
                  : "bg-white border-gray-200 text-gray-600 hover:border-green-500/50 hover:bg-gray-50"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {selectedDate && selectedTime && (
        <div className="bg-[#EAF6F2] border border-[#A4D8C4] rounded-lg p-6 flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="w-1 bg-green-500 h-12 rounded-full hidden md:block"></div>
          <div>
            <h4 className="font-medium mb-1 text-charcoal">
              Your Selected Slot:
            </h4>
            <div className="flex flex-col md:flex-row gap-1 md:gap-6 text-gray-700 text-sm">
              <p>
                <span className="font-semibold text-green-500">Date:</span>{" "}
                {format(selectedDate, "EEEE, MMMM d, yyyy")}
              </p>
              <p>
                <span className="font-semibold text-green-500">Time:</span>{" "}
                {selectedTime}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const Step2View = (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
      <h1 className="font-tinos text-3xl md:text-5xl text-center mb-4 text-charcoal">
        Delivery Address
      </h1>
      <p className="text-gray-500 text-center mb-10 font-light">
        Where should we deliver your order and how many guests will be
        attending?
      </p>

      <div className="bg-white border border-gray-100 shadow-xl shadow-gray-100/80 rounded-2xl p-8 md:p-10">
        <div className="flex items-center gap-3 mb-8 text-green-500 bg-[#FEF2F2] p-4 rounded-xl w-fit">
          <div className="bg-white p-2 rounded-full shadow-sm">
            <MapPin size={20} className="text-[#B34545]" />
          </div>
          <span className="text-[#B34545] font-semibold text-sm tracking-wide">
            Delivery Information
          </span>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">
              Street Address *
            </label>
            <div className="relative group">
              <input
                type="text"
                value={deliveryDetails.street}
                onChange={(e) =>
                  setDeliveryDetails({
                    ...deliveryDetails,
                    street: e.target.value,
                  })
                }
                className="w-full pl-4 pr-10 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all placeholder:text-gray-300 group-hover:border-gray-300"
                placeholder="Building number, street name"
              />
              <MapPin
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors"
                size={20}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                City *
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
                placeholder="e.g., Riyadh"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Area *
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
                placeholder="e.g., Al Malqa"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">
              Whats-app Number *
            </label>
            <input
              type="text"
              value={deliveryDetails.whatsapp}
              onChange={(e) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  whatsapp: e.target.value,
                })
              }
              className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all placeholder:text-gray-300"
              placeholder="Enter whats-app number"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">
              Email *
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
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">
              Note
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
              placeholder="e.g., Gate code, Special instructions"
            />
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
            <Info size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-700 leading-relaxed">
              Free delivery within city limits. Additional charges may apply for
              remote areas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const Step3View = (
    <div className="max-w-7xl mx-auto  py-10">
      <h1 className="font-tinos text-3xl md:text-5xl text-center mb-4 text-charcoal">
        Payment
      </h1>
      <p className="text-gray-500 text-center mb-10 font-light">
        Review your order and complete payment
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white/90 border-2 border-gray-200 p-6 rounded-lg">
            <h3 className="font-medium text-lg mb-4 text-charcoal">
              Payment Method
            </h3>
            <div className="flex gap-4">
              <button
                onClick={() => setPaymentMethod("credit")}
                className={`flex-1 py-6 border rounded-xl flex flex-col items-center gap-3 transition-all duration-200 cursor-pointer ${
                  paymentMethod === "credit"
                    ? "border-green-500 bg-[#E6FAF2] text-green-500 ring-1 ring-green-500"
                    : "border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-600"
                }`}
              >
                <FaRegCreditCard size={28} />
                <span className="text-sm font-semibold">Credit/Debit</span>
              </button>
              <button
                onClick={() => setPaymentMethod("mada")}
                className={`flex-1 py-6 border rounded-xl flex flex-col items-center gap-3 transition-all duration-200 cursor-pointer ${
                  paymentMethod === "mada"
                    ? "border-green-500 bg-[#E6FAF2] text-green-500 ring-1 ring-green-500"
                    : "border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-600"
                }`}
              >
                <FaCcVisa size={28} />{" "}
                {/* Visual placeholder for Mada if missing specific icon */}
                <span className="text-sm font-semibold">Mada</span>
              </button>
              <button
                onClick={() => setPaymentMethod("apple")}
                className={`flex-1 py-6 border rounded-xl flex flex-col items-center gap-3 transition-all duration-200 cursor-pointer ${
                  paymentMethod === "apple"
                    ? "border-green-500 bg-[#E6FAF2] text-green-500 ring-1 ring-green-500"
                    : "border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-600"
                }`}
              >
                <FaApple size={28} />
                <span className="text-sm font-semibold">Apple Pay</span>
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h4 className="font-medium mb-6 text-charcoal text-lg">
              Card Details
            </h4>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                  />
                  <CreditCard
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="Name on card"
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-3 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0 animate-pulse"></div>
              Your payment information is secure and encrypted.
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5 flex items-start gap-3 shadow-sm">
            <CheckCircle2 size={24} className="text-blue-500 mt-0.5" />
            <p className="text-sm text-gray-600 leading-relaxed">
              No refunds are applicable. Once an order is confirmed, the payment
              is non-refundable. All payments must be made via PayTabs. No other
              payment methods are accepted.
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 h-fit sticky top-6 shadow-lg shadow-gray-100/50">
          <h3 className="font-tinos text-2xl mb-6 text-charcoal">
            Order Summary
          </h3>
          <div className="space-y-4">
            <div className="pb-6 border-b border-gray-100">
              <h4 className="font-semibold text-sm text-charcoal mb-3 uppercase tracking-wide">
                Buffet Menu
              </h4>
              <div className="text-sm text-gray-500 space-y-2">
                <p className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium text-gray-700">
                    {selectedDate
                      ? format(selectedDate, "dd/MM/yyyy")
                      : "Not selected"}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-medium text-gray-700">
                    {selectedTime || "Not selected"}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>Guests:</span>
                  <span className="font-medium text-gray-700">20</span>
                </p>
              </div>
              <div className="flex justify-between mt-4 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                <span>Price per person:</span>
                <span className="font-medium">45 SAR</span>
              </div>
              <div className="flex justify-between px-2 pt-2 text-sm text-gray-800 font-medium">
                <span>20 guests × 45 SAR</span>
                <span>900 SAR</span>
              </div>
            </div>

            <div className="pb-6 border-b border-gray-100 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{900 + subtotal} SAR</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>VAT (15%)</span>
                <span>{((900 + subtotal) * 0.15).toFixed(2)} SAR</span>
              </div>
              <div className="flex justify-between text-sm text-green-500 font-bold">
                <span>Delivery</span>
                <span>Free</span>
              </div>
            </div>

            <div className="flex justify-between items-end pt-2">
              <span className="font-tinos text-xl text-charcoal">Total</span>
              <div className="text-right">
                <span className="font-bold text-2xl text-[#B34545] block">
                  {(900 + subtotal * 1.15).toFixed(2)} SAR
                </span>
                <span className="text-xs text-gray-400 font-light">
                  Inclusive of VAT
                </span>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-4 bg-green-500 text-white rounded-lg font-medium hover:bg-[#14452F] hover:shadow-lg hover:shadow-green-500/20 transition-all mt-6 text-lg"
            >
              Complete Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const Step4View = (
    <div className="flex flex-col items-center justify-center animate-in zoom-in duration-500">
      {/* 3D Chef Illustration Simulation */}
      <div className=" relative mb-8">
        <Image
          src="/do-it.png"
          alt="Chef Success"
          width={600}
          height={200}
          className="object-cover mt-20 w-[900px] h-full"
          unoptimized
        />
      </div>

      <h1 className=" font-semibold text-5xl md:text-4xl text-green-500 mb-6">
        Your Order is Confirmed!
      </h1>
      <p className=" text-xl text-center max-w-3xl font-light">
        Thank you for choosing Ayadi for your stress-free hosting experience. We
        handle every order with attention to detail, from preparation to
        delivery, so you can enjoy the moments around your table.
      </p>

      <Link
        href="/"
        className="mt-12 px-10 py-4 bg-green-500 text-white rounded-md font-medium hover:bg-[#14452F] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-green-500/20 sr-only"
      >
        Back to Home
      </Link>
    </div>
  );

  return (
    <div className=" min-h-screen pb-40">
      {/* Header */}
      {step < 4 && (
        <div className="pt-10 pb-6 text-center px-4 container mx-auto">
          <Stepper steps={STEPS} currentStep={step} />
          {step === 0 && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-700">
              <h1 className="font-tinos text-4xl md:text-6xl lg:mt-20 mb-4 text-charcoal">
                Build Your Menu
              </h1>
              <p className="text-color font-light text-lg max-w-2xl mx-auto">
                Gatherings by Ayadi serves up to 10 guests. Select your perfect
                combination.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
        {step === 0 && Step0View}
        {step === 1 && Step1View}
        {step === 2 && Step2View}
        {step === 3 && Step3View}
        {step === 4 && Step4View}
      </div>

      {/* Navigation Footer (Static) */}
      {step < 3 && (
        <div className="w-full bg-white rounded-md  mt-20 shadow-lg max-w-7xl mx-auto">
          <div className="px-6  py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              {/* Selected Summary (Only Step 0) */}
              {step === 0 ? (
                <div className="flex-grow w-full">
                  <h4 className="font-tinos text-lg mb-4 text-charcoal">
                    Selected Add-ons
                  </h4>

                  <div className="mb-4">
                    {selectedAddonObjects.length === 0 ? (
                      <p className="text-gray-400 text-sm italic">
                        No add-ons selected
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {selectedAddonObjects.map((addon) => (
                          <div
                            key={addon.id}
                            className="flex justify-between text-sm text-gray-600"
                          >
                            <span>{addon.name}</span>
                            {/* <span>{addon.price} SAR</span> */}
                          </div>
                        ))}
                        <div className="flex justify-between text-sm text-gray-600 pt-2 border-t border-gray-200 sr-only">
                          <span>Vat (15%)</span>
                          {/* <span>{(subtotal * 0.15).toFixed(2)} SAR</span> */}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 sr-only">
                    <span className="font-bold text-green-500 text-lg">
                      Total Add-ons:
                    </span>
                    <span className="font-bold text-green-500 text-lg">
                      {(total * 1.15).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}{" "}
                      SAR
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
                disabled={step === 0}
                className={`px-10 py-3 rounded-md font-medium transition-colors cursor-pointer ${
                  step === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed "
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Back
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
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuildYourMenu;
