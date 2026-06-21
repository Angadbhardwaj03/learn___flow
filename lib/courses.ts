import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/lib/types";

export class CoursesFetchError extends Error {}

export async function getCourses(): Promise<Course[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("id, title, progress, icon_name, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    throw new CoursesFetchError(error.message);
  }

  return data ?? [];
}
