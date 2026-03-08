import { fetchWithAuth } from "@/lib/api";
import UsersList from "./users-list";

export const metadata = {
    title: "Foydalanuvchilar | QuantumUz Admin",
};

export default async function UsersPage() {
    const res = await fetchWithAuth("/api/users/", { cache: "no-store" });

    let users = [];
    if (res.ok) {
        users = await res.json();
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Foydalanuvchilar Ro&apos;yxati</h1>
                <p className="text-muted-foreground">Tizimdagi barcha foydalanuvchilarni boshqarish va rollarini o&apos;zgartirish.</p>
            </div>

            <UsersList initialUsers={users} />
        </div>
    );
}
