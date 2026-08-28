export default function Loading() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-8">
        <div className="h-9 w-72 animate-pulse rounded-lg bg-neutral-800" />
        <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-neutral-800" />
        <div className="mt-5 h-10 w-72 animate-pulse rounded-lg border border-white/10 bg-neutral-900" />
      </header>

      <div className="grid grid-cols-1 gap-2 py-10 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="p-2">
            <div className="rounded-2xl border border-transparent bg-black p-4">
              <div className="h-44 w-full animate-pulse rounded-xl bg-neutral-800" />
              <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-neutral-800" />
              <div className="mt-2 h-3 w-full animate-pulse rounded bg-neutral-800" />
              <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-neutral-800" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
