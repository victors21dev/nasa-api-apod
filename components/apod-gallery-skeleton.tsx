import { Skeleton } from "@/components/ui/skeleton";

export function ApodGallerySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-2 py-10 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="p-2">
          <div className="rounded-2xl border border-transparent bg-black p-4">
            <Skeleton className="h-44 w-full rounded-xl" />
            <Skeleton className="mt-4 h-4 w-3/4" />
            <Skeleton className="mt-2 h-3 w-1/2" />
            <Skeleton className="mt-3 h-3 w-full" />
            <Skeleton className="mt-2 h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
