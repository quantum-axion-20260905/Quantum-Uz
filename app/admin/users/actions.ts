"use server";

import { fetchWithAuth } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function updateUserRole(userId: number, data: { is_staff: boolean; is_superuser: boolean }) {
    try {
        const res = await fetchWithAuth(`/api/users/${userId}/`, {
            method: "PATCH",
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { error: errorData.detail || "Ruxsatlarni o'zgartirishda xatolik" };
        }

        revalidatePath("/admin/users");
        return { success: true };
    } catch (err) {
        return { error: "Server ulanishida xatolik" };
    }
}
