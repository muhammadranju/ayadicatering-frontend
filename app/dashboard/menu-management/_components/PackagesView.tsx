import React from "react";
import Image from "next/image";
import { Edit2, Trash2 } from "lucide-react";
import { MenuPackage } from "@/types/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PackagesViewProps {
  packagesList: MenuPackage[];
  onDelete: (id: string) => void;
  onEdit: (pkg: MenuPackage) => void;
}

export const PackagesView: React.FC<PackagesViewProps> = ({
  packagesList,
  onDelete,
  onEdit,
}) => {
  return (
    <>
      {packagesList.map((pkg) => (
        <div
          key={pkg._id}
          className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
        >
          <div className="h-48 w-full overflow-hidden rounded-t-lg relative">
            <Image
              src={
                pkg.image.startsWith("http")
                  ? pkg.image
                  : `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}${pkg.image}`
              }
              alt={pkg.platterName}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">
              {pkg.platterName}
            </h3>
            <h4 className="mt-1 text-sm font-medium text-gray-500 text-right font-arabic">
              {pkg.platterNameArabic}
            </h4>

            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              {pkg.description}
            </p>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed text-right font-arabic">
              {pkg.descriptionArabic}
            </p>

            <div className="mt-6 mb-6">
              <span className="text-lg font-medium text-[#D48D73]">
                {pkg.price}{" "}
                <span className="text-sm font-normal text-gray-500">
                  SAR per person
                </span>
              </span>
            </div>

            <div className="flex items-center justify-between">
              <button className="w-full rounded-md bg-emerald-900 py-2.5 text-sm font-medium text-white hover:bg-emerald-800">
                {pkg.isAvailable ? "Available" : "Unavailable"}
              </button>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => onEdit(pkg)}
                  className="rounded-full border border-gray-200 p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                >
                  <Edit2 size={16} />
                </button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="rounded-full border border-red-100 p-2 text-red-400 hover:bg-red-50 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the package &quot;{pkg.platterName}&quot;.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => onDelete(pkg._id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
