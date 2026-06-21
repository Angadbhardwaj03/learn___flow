import { getCourses, CoursesFetchError } from "@/lib/courses";
import { HeroTile } from "@/components/hero-tile";
import { CourseCard } from "@/components/course-card";
import { ActivityTile } from "@/components/activity-tile";
import { ErrorState } from "@/components/error-state";
import { BentoGrid } from "@/components/bento-grid";
import { StaggerItem } from "@/components/stagger-item";

export async function CoursesSection() {
  let courses;

  try {
    courses = await getCourses();
  } catch (err) {
    const message = err instanceof CoursesFetchError ? err.message : undefined;
    return (
      <BentoGrid>
        <StaggerItem className="col-span-full">
          <ErrorState message={message} />
        </StaggerItem>
      </BentoGrid>
    );
  }

  return (
    <BentoGrid>
      <StaggerItem className="col-span-full md:col-span-2">
        <HeroTile name="Maya" streakDays={12} />
      </StaggerItem>

      {courses.map((course) => (
        <StaggerItem key={course.id}>
          <CourseCard course={course} />
        </StaggerItem>
      ))}

      <StaggerItem className="sm:col-span-2 xl:col-span-2">
        <ActivityTile />
      </StaggerItem>
    </BentoGrid>
  );
}
