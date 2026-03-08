"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "./actions";

export default function AdminLogin() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const result = await loginAdmin(formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        }
        // if successful, loginAdmin redirects to /admin
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
            <div className="w-full max-w-md p-8 rounded-2xl border bg-card/50 backdrop-blur shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="font-playfair font-bold text-3xl tracking-tight text-primary mb-2">
                        Quantum<span className="text-muted-foreground">Uz</span> <span className="text-sm uppercase bg-primary text-primary-foreground px-2 py-0.5 rounded-full align-top">Admin</span>
                    </h1>
                    <p className="text-muted-foreground">Boshqaruv paneliga kirish</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1.5" htmlFor="email">Email yoki Username</label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            required
                            className="w-full px-4 py-2.5 rounded-lg border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            placeholder="admin"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1.5" htmlFor="password">Parol</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-2.5 rounded-lg border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></span>
                        ) : "Tizimga kirish"}
                    </button>
                </form>
            </div>
        </div>
    );
}
