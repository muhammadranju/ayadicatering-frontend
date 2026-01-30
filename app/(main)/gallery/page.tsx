import GalleryPage from "./GalleryPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Gallery | AYADI Catering",
  description:
    "Explore our gallery of exquisite dishes and elegant catering setups. See the quality and presentation that define AYADI Catering.",
  alternates: {
    canonical: "https://www.ayadicatering.com/gallery",
  },
};

function page() {
  return (
    <>
      <GalleryPage />
    </>
  );
}

export default page;
