"use server";

import { fetchWithAuth } from "@/lib/api";
import { revalidatePath } from "next/cache";

/* Courses API Actions */

export async function createCourse(formData: FormData) {
    try {
        const res = await fetchWithAuth("/api/courses/", {
            method: "POST",
            body: formData, // Passing formData directly handles multipart (files) automatically
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            return { error: errorData.detail || JSON.stringify(errorData) || "Saqlashda xatolik yuz berdi" };
        }

        revalidatePath("/admin/courses");
        return { success: true };
    } catch (err) {
        return { error: "Server ulanishida xatolik" };
    }
}

export async function updateCourse(id: number, formData: FormData) {
    try {
        const res = await fetchWithAuth(`/api/courses/${id}/`, {
            method: "PATCH",
            body: formData,
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            return { error: errorData.detail || JSON.stringify(errorData) || "Tahrirlashda xatolik yuz berdi" };
        }

        revalidatePath("/admin/courses");
        return { success: true };
    } catch (err) {
        return { error: "Server ulanishida xatolik" };
    }
}

export async function deleteCourse(id: number) {
    try {
        const res = await fetchWithAuth(`/api/courses/${id}/`, {
            method: "DELETE",
        });

        if (!res.ok) {
            return { error: "O'chirishda xatolik yuz berdi" };
        }

        revalidatePath("/admin/courses");
        return { success: true };
    } catch (err) {
        return { error: "Server ulanishida xatolik" };
    }
}
