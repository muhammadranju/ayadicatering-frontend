import PackagesPage from "./PackagesPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catering Packages | AYADI Catering",
  description:
    "Choose from our curated catering packages designed for groups of all sizes. Perfect for weddings, parties, and corporate events.",
  alternates: {
    canonical: "https://www.ayadicatering.com/packages",
  },
};

function page() {
  return (
    <>
      <PackagesPage />
    </>
  );
}

export default page;
