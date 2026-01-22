import { Metadata } from "next";
import { ChangePhoto } from "./ChangePhotoPage";
export const metadata: Metadata = {
  title: "Change Photo - TechAdvantage",
};
const page = () => {
  return (
    <div className="min-h-screen bg-white ">
      <ChangePhoto />
    </div>
  );
};

export default page;
