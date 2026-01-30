import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Ayadi Catering",
  description: "404",
  openGraph: {
    title: "404 - Ayadi Catering",
    description: "404",
    url: "https://www.ayadicatering.com/404",
    images: [
      {
        url: "https://www.ayadicatering.com/images/404.png",
        width: 1200,
        height: 630,
        alt: "404",
      },
    ],
    siteName: "Ayadi Catering",
  },
};

const notFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-2xl mx-auto">
      <Image src="/404.svg" alt="404" width={600} height={600} />
      <h1 className="uppercase text-4xl font-semibold tracking-[10px] text-center">
        Page Not Found
      </h1>
      <Link href="/" className="mt-14 w-full ">
        <Button className="w-full py-6 rounded-xl">Back to Home</Button>
      </Link>
    </div>
  );
};

export default notFound;
