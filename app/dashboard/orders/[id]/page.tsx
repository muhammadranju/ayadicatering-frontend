import React from "react";
import SingleOrderPage from "./SingleOrderPage";

export const metadata = {
  title: "Order - AYADI",
  description: "Order - AYADI",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

async function page(props: PageProps) {
  const params = await props.params;

  return (
    <>
      <SingleOrderPage orderId={params.id} />
    </>
  );
}

export default page;
