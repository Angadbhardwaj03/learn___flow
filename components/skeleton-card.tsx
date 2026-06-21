export function SkeletonCard() {
  return (
    <div className="rounded-tile border border-ink-700 bg-ink-900 p-5">
      <div className="flex items-start justify-between">
        <div className="h-9 w-9 animate-shimmer rounded-lg shimmer" />
        <div className="h-3 w-8 animate-shimmer rounded shimmer" />
      </div>
      <div className="mt-4 h-4 w-3/4 animate-shimmer rounded shimmer" />
      <div className="mt-2 h-4 w-1/2 animate-shimmer rounded shimmer" />
      <div className="mt-4 h-1.5 w-full animate-shimmer rounded-full shimmer" />
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="col-span-full overflow-hidden rounded-tile border border-ink-700 bg-ink-900 p-6 sm:p-8 md:col-span-2">
      <div className="h-3 w-32 animate-shimmer rounded shimmer" />
      <div className="mt-3 h-8 w-64 animate-shimmer rounded shimmer" />
      <div className="mt-2 h-4 w-72 animate-shimmer rounded shimmer" />
      <div className="mt-8 h-16 w-full animate-shimmer rounded shimmer" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <SkeletonHero />
      <SkeletonCard />
      <SkeletonCard />
      <div className="rounded-tile border border-ink-700 bg-ink-900 p-5 sm:col-span-2 xl:col-span-2">
        <div className="h-4 w-32 animate-shimmer rounded shimmer" />
        <div className="mt-4 h-20 w-full animate-shimmer rounded shimmer" />
      </div>
    </div>
  );
}
