import { Suspense } from "react";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { CoursesSection } from "@/components/courses-section";
import { DashboardSkeleton } from "@/components/skeleton-card";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 px-4 pb-24 pt-6 sm:px-6 md:px-10 md:pb-10 md:pt-10">
        <div className="mx-auto max-w-6xl">
          <Suspense fallback={<DashboardSkeleton />}>
            <CoursesSection />
          </Suspense>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
