"use server";

import { fetchWithAuth } from "@/lib/api";
import { revalidatePath } from "next/cache";

/* Books API Actions */
function parseApiError(errorData: unknown, fallback: string) {
    if (!errorData) return fallback;
    if (typeof errorData === "string") return errorData;
    if (typeof errorData !== "object") return fallback;
    const record = errorData as Record<string, unknown>;
    if (typeof record.detail === "string") return record.detail;

    const firstKey = Object.keys(record)[0];
    if (firstKey && Array.isArray(record[firstKey]) && record[firstKey].length > 0) {
        return `${firstKey}: ${String(record[firstKey][0])}`;
    }
    return fallback;
}

export async function createBook(formData: FormData) {
    try {
        const res = await fetchWithAuth("/api/books/", {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            return { error: parseApiError(errorData, "Saqlashda xatolik yuz berdi") };
        }

        revalidatePath("/admin/books");
        return { success: true };
    } catch {
        return { error: "Server ulanishida xatolik" };
    }
}

export async function updateBook(id: number, formData: FormData) {
    try {
        const res = await fetchWithAuth(`/api/books/${id}/`, {
            method: "PATCH",
            body: formData,
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            return { error: parseApiError(errorData, "Tahrirlashda xatolik yuz berdi") };
        }

        revalidatePath("/admin/books");
        return { success: true };
    } catch {
        return { error: "Server ulanishida xatolik" };
    }
}

export async function deleteBook(id: number) {
    try {
        const res = await fetchWithAuth(`/api/books/${id}/`, {
            method: "DELETE",
        });

        if (!res.ok) {
            return { error: "O'chirishda xatolik yuz berdi" };
        }

        revalidatePath("/admin/books");
        return { success: true };
    } catch {
        return { error: "Server ulanishida xatolik" };
    }
}
