"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa6";
import LogoComponent from "../logo/Logo";
import { Button } from "../ui/button";

const MainHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const selectedLang = i18n.language; // Get current language from i18n

  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const flags = [
    { label: "EN", path: "/icons/en.png", code: "en", name: "English" },
    { label: "AR", path: "/icons/ar.png", code: "ar", name: "العربية" },
  ];

  const currentFlag = flags.find((f) => f.code === selectedLang) || flags[0];

  const navItems = [
    { href: "/", label: t("header.home") },
    { href: "/about", label: t("header.about") },
    { href: "/gallery", label: t("header.gallery") },
    { href: "/faq", label: t("header.faq") },
  ];

  const isActiveRoute = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="backdrop-blur-lg bg-[#F2EEE6]/80 py-2 px-6 md:px-12 lg:px-20 sticky top-0 z-40 border-b border-orange-100">
        <div className="lg:container md:max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <LogoComponent path="/logo/logo.png" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors duration-200 pb-1 border-b-2 ${
                  isActiveRoute(item.href)
                    ? "text-primary border-primary"
                    : "text-gray-600 border-b border-transparent hover:text-black hover:border-gray-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center border border-green-500 rounded-full px-3 py-1 cursor-pointer hover:border-gray-400 transition-colors"
                onClick={() => setIsLangOpen(!isLangOpen)}
              >
                <span className="font-bold text-sm mr-2 text-gray-700">
                  {currentFlag.label}
                </span>
                <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 flex-shrink-0 relative">
                  <Image
                    src={currentFlag.path}
                    alt={`${currentFlag.name} flag`}
                    fill
                    className="object-cover"
                  />
                </div>
              </button>

              {/* Dropdown */}
              {isLangOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30 md:hidden"
                    onClick={() => setIsLangOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-40">
                    {flags.map((flag) => (
                      <button
                        key={flag.code}
                        type="button"
                        className={`w-full flex items-center px-4 py-2.5 text-left text-sm transition-colors ${
                          selectedLang === flag.code
                            ? "bg-amber-50 text-amber-800 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          i18n.changeLanguage(flag.code);
                          setIsLangOpen(false);
                        }}
                      >
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 mr-3 relative">
                          <Image
                            src={flag.path}
                            alt={`${flag.name} flag`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span>{flag.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* CTA Button */}
            <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-5 rounded-sm font-medium transition-colors duration-200 shadow-sm">
              Whatsapp <FaWhatsapp size={24} className="ml-2" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-900 focus:outline-none hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <Link
            href="/"
            className="text-2xl font-bold tracking-widest text-black uppercase"
            style={{ fontFamily: "Tinos, serif" }}
          >
            Ayadi
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-900 hover:text-amber-700 transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col p-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                isActiveRoute(item.href)
                  ? "bg-amber-50 text-amber-700 border-l-4 border-amber-700"
                  : "text-gray-600 hover:text-black hover:bg-gray-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Language + CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-white">
          <div className="flex flex-col space-y-4">
            {/* Mobile Language Switcher */}
            <div className="relative z-50">
              <button
                type="button"
                className="w-full flex items-center justify-center border border-gray-300 rounded-full px-4 py-3 hover:bg-gray-50 transition-colors"
                onClick={() => setIsLangOpen(!isLangOpen)}
              >
                <span className="font-bold text-sm mr-2">
                  {currentFlag.label}
                </span>
                <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
                  <Image
                    src={currentFlag.path}
                    alt={`${currentFlag.name} flag`}
                    className="w-full h-full object-cover"
                    width={36} // Added width and height for Image component
                    height={36}
                  />
                </div>
              </button>

              {isLangOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsLangOpen(false)}
                  />
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    {flags.map((flag) => (
                      <button
                        key={flag.code}
                        className={`w-full flex items-center px-4 py-3 text-sm hover:bg-gray-100 transition-colors ${
                          selectedLang === flag.code
                            ? "bg-gray-50 font-medium"
                            : ""
                        }`}
                        onClick={() => {
                          i18n.changeLanguage(flag.code);
                          setIsLangOpen(false);
                        }}
                      >
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 mr-3 relative">
                          <Image
                            src={flag.path}
                            alt={`${flag.name} flag`}
                            className="object-cover"
                            fill // Use fill for responsive image within parent div
                          />
                        </div>
                        <span>{flag.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Button className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-sm font-medium transition-colors duration-200 w-full">
              {t("header.bookNow")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHeader;
