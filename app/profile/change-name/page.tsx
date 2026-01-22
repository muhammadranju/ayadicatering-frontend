import { Metadata } from "next";
import { ChangeNamePage } from "./ChangeNamePage";
export const metadata: Metadata = {
  title: "Change Name - TechAdvantage",
};

const page = () => {
  return (
    <>
      <ChangeNamePage />
    </>
  );
};

export default page;
