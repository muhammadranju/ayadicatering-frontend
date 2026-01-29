import { Skeleton } from "@/components/ui/skeleton";

export const OrderCardSkeleton = () => {
  return (
    <div className="flex h-[280px] w-full flex-col justify-between rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div>
            <Skeleton className="mt-1 h-6 w-48" />
            <Skeleton className="mt-2 h-3 w-32" />
          </div>
        </div>
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>

      <div className="my-4 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>

      <div className="flex items-end justify-between border-t border-gray-50 pt-4">
        <div>
          <Skeleton className="h-3 w-16" />
          <Skeleton className="mt-1 h-5 w-24" />
        </div>
        <Skeleton className="h-9 w-32 rounded-lg" />
      </div>
    </div>
  );
};
