import { Metadata } from "next";
import OverviewPage from "./OverviewPage";

export const metadata: Metadata = {
  title: "Overview - AYADI",
  description: "Overview - AYADI",
};

const page = () => {
  return (
    <>
      <OverviewPage />
    </>
  );
};

export default page;
