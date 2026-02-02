"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/i18n";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize direction based on current language
    const dir = i18n.dir(i18n.language);
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;

    const handleLanguageChanged = (lng: string) => {
      document.documentElement.dir = i18n.dir(lng);
      document.documentElement.lang = lng;
      localStorage.setItem("i18nextLng", lng);
    };

    i18n.on("languageChanged", handleLanguageChanged);

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, []);

  if (!mounted) {
    // Avoid hydration mismatch by rendering nothing or a loader until client-side hydration
    // For SEO-critical text, this might be a concern, but for a pure client-side switch validation it's safest.
    // However, to keep server content visible, we can just render children.
    // But since i18n is client-only here, we let it mount.
    return <>{children}</>;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
