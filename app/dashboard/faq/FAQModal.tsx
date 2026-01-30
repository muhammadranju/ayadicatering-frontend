import React, { useEffect, useState } from "react";
import {
  useCreateFaqMutation,
  useUpdateFaqMutation,
} from "@/lib/redux/features/api/faq/faqApiSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "ADD" | "EDIT";
  initialData?: any;
}

export const FAQModal: React.FC<FAQModalProps> = ({
  isOpen,
  onClose,
  type,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    question: "",
    questionArabic: "",
    answer: "",
    answerArabic: "",
  });

  const [createFaq, { isLoading: isCreating }] = useCreateFaqMutation();
  const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();

  useEffect(() => {
    if (type === "EDIT" && initialData) {
      setFormData({
        question: initialData.question || "",
        questionArabic: initialData.questionArabic || "",
        answer: initialData.answer || "",
        answerArabic: initialData.answerArabic || "",
      });
    } else {
      setFormData({
        question: "",
        questionArabic: "",
        answer: "",
        answerArabic: "",
      });
    }
  }, [type, initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (type === "ADD") {
        await createFaq(formData).unwrap();
        toast.success("FAQ added successfully");
      } else {
        await updateFaq({
          id: initialData._id,
          data: formData,
        }).unwrap();
        toast.success("FAQ updated successfully");
      }
      onClose();
    } catch (error) {
      console.error("Failed to save FAQ:", error);
      toast.error("Failed to save FAQ");
    }
  };

  if (!isOpen) return null;

  const isLoading = isCreating || isUpdating;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[600px] rounded-xl bg-white p-12 shadow-2xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-semibold text-gray-800 tracking-tight">
            {type === "ADD" ? "Add New FAQ" : "Edit FAQ"}
          </h2>
        </div>

        {/* Form Content */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* English Fields */}
          <div className="space-y-2">
            <CustomInput
              type="text"
              id="question"
              label="Question (English)"
              value={formData.question}
              onChange={handleChange}
              placeholder="Enter question in English"
            />
          </div>

          <div className="space-y-2">
            <CustomInput
              label="Answer (English)"
              type="text"
              id="answer"
              value={formData.answer}
              onChange={handleChange}
              placeholder="Enter answer in English"
            />
          </div>

          {/* Arabic Fields */}
          <div className="space-y-2">
            {/* Question (Arabic) */}
            <CustomInput
              id="questionArabic"
              label="Question (Arabic)"
              value={formData.questionArabic}
              onChange={handleChange}
              placeholder="أدخل السؤال باللغة العربية"
              type="text"
              dir="rtl"
            />
          </div>

          <div className="space-y-2">
            <CustomInput
              id="answerArabic"
              label="Answer (Arabic)"
              value={formData.answerArabic}
              onChange={handleChange}
              placeholder="أدخل الإجابة باللغة العربية"
              type="text"
              dir="rtl"
            />
          </div>

          <div className="pt-6 flex justify-center gap-4">
            <Button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="w-48 rounded-md border border-gray-300 bg-white py-6 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-48 rounded-md bg-emerald-800 py-6 text-base font-medium text-white shadow-sm hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Saving..." : type === "ADD" ? "Add" : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

function CustomInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  type,
  dir,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  dir?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={true}
        dir={dir}
        className="w-full rounded-md border border-gray-200 px-4 text-sm text-gray-700 placeholder-gray-400 focus:border-sidebar focus:outline-none focus:ring-1 focus:ring-sidebar transition-shadow"
      />
    </div>
  );
}
