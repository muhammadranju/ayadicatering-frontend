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
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { ChefOrderPDF } from "./ChefOrderPDF";
import { Download, Printer } from "lucide-react";
import { buttonVariants, Button } from "@/components/ui/button";
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
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePrint = async () => {
    if (!order) return;
    setIsPrinting(true);
    try {
      const blob = await pdf(<ChefOrderPDF order={order} />).toBlob();
      const url = URL.createObjectURL(blob);
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.width = "0px";
      iframe.style.height = "0px";
      iframe.style.border = "none";
      iframe.src = url;
      document.body.appendChild(iframe);

      iframe.onload = () => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      };
    } catch (error) {
      console.error("Print failed:", error);
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Export Kitchen Ticket</AlertDialogTitle>
          <AlertDialogDescription>
            Choose an action for Order #{order?._id?.slice(-6)}. You can
            download the PDF or print it directly.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-between">
          <div className="flex w-full gap-2 sm:justify-end">
            <AlertDialogCancel className="rounded-md">Cancel</AlertDialogCancel>

            <Button
              variant="outline"
              onClick={handlePrint}
              disabled={isPrinting}
              className="gap-2 rounded-md"
            >
              <Printer className="h-4 w-4" />
              {isPrinting ? "Preparing..." : "Print"}
            </Button>

            {isClient && order && (
              <PDFDownloadLink
                document={<ChefOrderPDF order={order} />}
                fileName={`kitchen-ticket-${order._id.slice(-6)}.pdf`}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "bg-orange-600 hover:bg-orange-700 text-white no-underline gap-2 rounded-md",
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
                      <Download className="h-4 w-4" /> Download PDF
                    </>
                  )
                }
              </PDFDownloadLink>
            )}
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
