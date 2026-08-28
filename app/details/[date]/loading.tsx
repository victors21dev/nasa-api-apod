import { Skeleton } from "@/components/ui/skeleton";

export default function DetailsLoading() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Skeleton className="h-4 w-48" />

      <article className="mt-8">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="mt-3 h-4 w-72" />

        <div className="mt-8 aspect-video w-full rounded-2xl">
          <Skeleton className="h-full w-full rounded-2xl" />
        </div>

        <section className="mt-8 max-w-prose">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-4/5" />
        </section>

        <div className="mt-10 grid grid-cols-1 gap-4 rounded-2xl border border-white/10 p-6 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="h-3 w-20" />
              <Skeleton className="mt-2 h-4 w-32" />
            </div>
          ))}
        </div>
      </article>
    </main>
  );
}
