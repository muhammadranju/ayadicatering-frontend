import React from "react";
import Image from "next/image";
import { Edit2, Trash2 } from "lucide-react";
import { MenuCategory } from "@/types/types";
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

interface CategoriesViewProps {
  categoriesList: MenuCategory[];
  onCategoryClick: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (category: MenuCategory) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  categoriesList,
  onCategoryClick,
  onDelete,
  onEdit,
}) => {
  return (
    <>
      {categoriesList?.reverse()?.map((cat) => (
        <div
          key={cat._id}
          className="group cursor-pointer overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
          onClick={() => onCategoryClick(cat._id)}
        >
          <div className="relative h-64 w-full">
            <Image
              src={
                cat.image.startsWith("http")
                  ? cat.image
                  : `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}${cat.image}`
              }
              alt={cat.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute right-3 top-3 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(cat);
                }}
                className="rounded-full bg-white p-2 text-gray-600 shadow-md hover:text-emerald-900"
              >
                <Edit2 size={14} />
              </button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-full bg-white p-2 text-red-400 shadow-md hover:text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the category &quot;{cat.name}&quot;.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={(e) => e.stopPropagation()}
                      className="rounded-xl"
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(cat._id);
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-xl font-medium text-gray-900">{cat.name}</h3>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed text-right font-arabic">
              {cat.nameArabic}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
