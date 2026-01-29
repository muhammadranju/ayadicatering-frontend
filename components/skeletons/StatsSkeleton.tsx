import { Skeleton } from "@/components/ui/skeleton";

export const StatsSkeleton = () => {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
      <div>
        <Skeleton className="mb-2 h-8 w-32" />
        <span className="flex items-center gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-3 w-20" />
        </span>
      </div>
    </div>
  );
};
