import { Metadata } from "next";
import { ChangePhotoPage } from "./ChangePhotoPage";

export const metadata: Metadata = {
  title: "Change Photo - Ayadi Catering",
};

const page = () => {
  return (
    <div className="min-h-screen bg-white ">
      <ChangePhotoPage />
    </div>
  );
};

export default page;
