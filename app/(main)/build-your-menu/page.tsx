import BuildYourMenu from "./BuildYourMenu";

export const metadata = {
  title: "Build Your Menu - AYADI",
  description: "Build Your Menu ",
};

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

function page({ searchParams }: PageProps) {
  const isPackageMode = searchParams?.mode === "package";

  return (
    <>
      <BuildYourMenu isPackageMode={isPackageMode} />
    </>
  );
}

export default page;
