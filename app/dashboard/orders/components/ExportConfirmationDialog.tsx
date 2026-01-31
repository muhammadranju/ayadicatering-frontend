"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ChefOrderPDF } from "./ChefOrderPDF";
import { Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExportConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  order: any;
}

export const ExportConfirmationDialog: React.FC<
  ExportConfirmationDialogProps
> = ({ open, onOpenChange, order }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Export Kitchen Ticket</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to download the kitchen ticket for Order #
            {order?._id?.slice(-6)}? This PDF is formatted for the chef and
            kitchen staff.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {isClient && order && (
            <PDFDownloadLink
              document={<ChefOrderPDF order={order} />}
              fileName={`kitchen-ticket-${order._id.slice(-6)}.pdf`}
              className={cn(
                buttonVariants({ variant: "default" }),
                "bg-orange-600 hover:bg-orange-700 text-white no-underline",
              )}
              onClick={() => {
                // Close the dialog after a short delay to allow download to start
                setTimeout(() => onOpenChange(false), 1000);
              }}
            >
              {({ loading }) =>
                loading ? (
                  "Preparing..."
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" /> Download PDF
                  </>
                )
              }
            </PDFDownloadLink>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
