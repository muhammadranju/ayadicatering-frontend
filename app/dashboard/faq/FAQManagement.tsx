"use client";

import React, { useState } from "react";
import { Search, MoreVertical, Plus, Edit, Trash } from "lucide-react";
import { FAQModal } from "./FAQModal";
import {
  useDeleteFaqMutation,
  useGetFaqListQuery,
} from "@/lib/redux/features/api/faq/faqApiSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { TableRowSkeleton } from "@/components/skeletons/TableRowSkeleton";
import { Button } from "@/components/ui/button";

export const FAQManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"ADD" | "EDIT">("ADD");
  const [selectedFaq, setSelectedFaq] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<string | null>(null);

  const { data: faqData, isLoading } = useGetFaqListQuery({});
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();

  // Safely extract data handling potential pagination structure
  const rawData = faqData?.data;
  const faqs = Array.isArray(rawData) ? rawData : rawData?.data || [];

  const handleOpenAdd = () => {
    setModalType("ADD");
    setSelectedFaq(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq: any) => {
    setModalType("EDIT");
    setSelectedFaq(faq);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setFaqToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!faqToDelete) return;

    try {
      await deleteFaq(faqToDelete).unwrap();
      toast.success("FAQ deleted successfully");
      setIsDeleteDialogOpen(false);
      setFaqToDelete(null);
    } catch (error) {
      console.error("Failed to delete FAQ:", error);
      toast.error("Failed to delete FAQ");
    }
  };

  const filteredFaqs = faqs.filter(
    (faq: any) =>
      faq.question?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.questionArabic?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answerArabic?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex-1 px-6 py-8 lg:px-10 relative">
      <h3 className="text-4xl font-semibold mb-6 border-b border-gray-200">
        FAQ Management
      </h3>
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-gray-300 py-3.5 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-sidebar focus:outline-none focus:ring-1 focus:ring-sidebar"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden mb-20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="py-4 px-6 text-sm font-bold text-gray-900 w-1/3">
                Question (EN / AR)
              </th>
              <th className="py-4 px-6 text-sm font-bold text-gray-900 w-1/3">
                Answer (EN / AR)
              </th>
              <th className="py-4 px-6 text-sm font-bold text-gray-900 text-right w-1/6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // Render 5 skeleton rows
              Array.from({ length: 5 }).map((_, i) => (
                <TableRowSkeleton key={i} />
              ))
            ) : filteredFaqs.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-12 text-center text-gray-500">
                  No FAQs found
                </td>
              </tr>
            ) : (
              filteredFaqs.map((faq: any) => (
                <tr
                  key={faq._id}
                  className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-6 px-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-gray-900">
                        {faq.question}
                      </span>
                      <span
                        className="text-sm text-gray-500 font-arabic"
                        dir="rtl"
                      >
                        {faq.questionArabic}
                      </span>
                    </div>
                  </td>
                  <td className="py-6 px-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-gray-600 line-clamp-2">
                        {faq.answer}
                      </span>
                      <span
                        className="text-sm text-gray-500 line-clamp-2 font-arabic"
                        dir="rtl"
                      >
                        {faq.answerArabic}
                      </span>
                    </div>
                  </td>
                  <td className="py-6 px-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 rounded-full hover:bg-gray-200 text-gray-500 transition-colors">
                          <MoreVertical size={20} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleOpenEdit(faq)}
                          className="cursor-pointer gap-2"
                        >
                          <Edit size={16} /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(faq._id)}
                          className="cursor-pointer gap-2 text-red-600 focus:text-red-700 focus:bg-red-50"
                        >
                          <Trash size={16} /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Floating Add Button */}
      <div className="fixed bottom-8 right-8 z-10">
        <Button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 rounded-lg bg-emerald-800 px-6 py-6 text-sm font-bold text-white shadow-lg hover:bg-emerald-700 transition-all"
        >
          <Plus size={18} /> Add New FAQ
        </Button>
      </div>

      <FAQModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
        initialData={selectedFaq}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete FAQ</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this FAQ? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setFaqToDelete(null)}
              className="rounded-lg"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
