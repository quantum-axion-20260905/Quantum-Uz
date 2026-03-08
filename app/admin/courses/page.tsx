import { fetchWithAuth } from "@/lib/api";
import CoursesList from "./courses-list";

export const metadata = {
    title: "Kurslar | QuantumUz Admin",
};

export default async function CoursesPage() {
    let courses = [];
    let categories = [];
    let tags = [];

    try {
        const [coursesRes, catRes, tagRes] = await Promise.all([
            fetchWithAuth("/api/courses/", { cache: "no-store" }),
            fetchWithAuth("/api/categories/", { cache: "no-store" }),
            fetchWithAuth("/api/tags/", { cache: "no-store" }),
        ]);

        if (coursesRes.ok) courses = await coursesRes.json();
        if (catRes.ok) categories = await catRes.json();
        if (tagRes.ok) tags = await tagRes.json();
    } catch (error) {
        console.error("Error fetching course data:", error);
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Kurslarni Boshqarish</h1>
                <p className="text-muted-foreground">Barcha video kurslarni ko&apos;rish, yangi qo&apos;shish va tahrirlash.</p>
            </div>

            <CoursesList initialCourses={courses} categories={categories} tags={tags} />
        </div>
    );
}
