import { Skeleton } from "@/components/ui/skeleton";

export const TableRowSkeleton = () => {
  return (
    <tr className="border-b border-gray-50 bg-white">
      <td className="py-6 px-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </td>
      <td className="py-6 px-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </td>
      <td className="py-6 px-6 text-right">
        <div className="flex justify-end">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </td>
    </tr>
  );
};
