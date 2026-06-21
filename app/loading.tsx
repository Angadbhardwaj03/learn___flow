import { DashboardSkeleton } from "@/components/skeleton-card";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:px-10">
      <DashboardSkeleton />
    </div>
  );
}
