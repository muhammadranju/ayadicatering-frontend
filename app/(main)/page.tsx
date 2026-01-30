import HomePage from "./HomePage";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "AYADI Catering | Best Catering Service in Riyadh",
  description:
    "Welcome to AYADI Catering. We provide top-tier food catering services for weddings, corporate events, and private gatherings. Customize your menu today.",
  alternates: {
    canonical: "https://www.ayadicatering.com",
  },
};

function page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AYADI Catering",
    url: "https://www.ayadicatering.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.ayadicatering.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Script
        id="home-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage />
    </>
  );
}

export default page;
