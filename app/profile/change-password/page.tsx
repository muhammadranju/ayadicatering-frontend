import { Metadata } from "next";
import { ChangePasswordPage } from "./ChangePasswordPage";
export const metadata: Metadata = {
  title: "Change Password - TechAdvantage",
};

const page = () => {
  return (
    <div className="min-h-screen bg-neutral-50 ">
      <ChangePasswordPage />
    </div>
  );
};

export default page;
