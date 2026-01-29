"use client";

import React from "react";
import { OrderDetails } from "./OrderDetails";

interface SingleOrderPageProps {
  orderId: string;
}

function SingleOrderPage({ orderId }: SingleOrderPageProps) {
  return (
    <>
      <OrderDetails orderId={orderId} />
    </>
  );
}

export default SingleOrderPage;
