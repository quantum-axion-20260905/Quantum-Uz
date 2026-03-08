"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const LOGIN_TIMEOUT_MS = 8000;

export async function loginAdmin(formData: FormData) {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        return { error: "Email va parolni kiriting" };
    }

    try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), LOGIN_TIMEOUT_MS);
        const res = await fetch(`${API_URL}/api/token/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: email, password }), // using email as username here for DRF, or just username
            signal: controller.signal,
        }).finally(() => clearTimeout(timer));

        const data = await res.json();

        if (!res.ok) {
            return { error: data.detail || "Login yoki parol noto'g'ri" };
        }

        // Set cookies
        const cookieStore = await cookies();
        cookieStore.set("admin_access_token", data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24, // 1 day
        });

    } catch (err) {
        return { error: "Server bilan ulanishda xatolik yuz berdi" };
    }

    redirect("/admin");
}

export async function logoutAdmin() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_access_token");
    redirect("/admin/login");
}
