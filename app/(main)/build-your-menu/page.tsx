import BuildYourMenu from "./BuildYourMenu";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build Your Custom Menu | AYADI Catering",
  description:
    "Create your perfect catering menu. Select from salads, appetizers, main courses, and desserts to suit your event needs.",
  alternates: {
    canonical: "https://www.ayadicatering.com/build-your-menu",
  },
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function page(props: PageProps) {
  const searchParams = await props.searchParams;
  const isPackageMode = searchParams?.mode === "package";
  const packageId =
    typeof searchParams?.packageId === "string"
      ? searchParams.packageId
      : undefined;

  return (
    <>
      <BuildYourMenu isPackageMode={isPackageMode} packageId={packageId} />
    </>
  );
}

export default page;
