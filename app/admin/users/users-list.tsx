"use client";

import { useState } from "react";
import { Search, ShieldAlert, Edit, X } from "lucide-react";
import { updateUserRole } from "./actions";

type UserType = {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
    is_superuser: boolean;
    is_active: boolean;
    date_joined: string;
};

export default function UsersList({ initialUsers }: { initialUsers: UserType[] }) {
    const [users, setUsers] = useState<UserType[]>(initialUsers);
    const [search, setSearch] = useState("");
    const [editingUser, setEditingUser] = useState<UserType | null>(null);

    // Modal states
    const [isStaff, setIsStaff] = useState(false);
    const [isSuperuser, setIsSuperuser] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMSG, setErrorMSG] = useState("");

    const filteredUsers = users.filter(u =>
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    const openEditModal = (user: UserType) => {
        setEditingUser(user);
        setIsStaff(user.is_staff);
        setIsSuperuser(user.is_superuser);
        setErrorMSG("");
    };

    const saveRoles = async () => {
        if (!editingUser) return;
        setLoading(true);
        setErrorMSG("");

        const res = await updateUserRole(editingUser.id, { is_staff: isStaff, is_superuser: isSuperuser });

        if (res?.error) {
            setErrorMSG(res.error);
            setLoading(false);
            return;
        }

        // update local state
        setUsers(users.map(u =>
            u.id === editingUser.id
                ? { ...u, is_staff: isStaff, is_superuser: isSuperuser }
                : u
        ));

        setLoading(false);
        setEditingUser(null);
    };

    const getRoleBadge = (user: UserType) => {
        if (user.is_superuser) return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary">Super Admin</span>;
        if (user.is_staff) return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-500">Admin</span>;
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-muted text-muted-foreground">User</span>;
    };

    return (
        <div className="bg-card/50 rounded-2xl border shadow-sm flex flex-col overflow-hidden">

            {/* Table Toolbar */}
            <div className="p-4 border-b flex items-center justify-between gap-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Username yoki Email bo'yicha qidiruv..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-muted/50 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground"
                    />
                </div>
            </div>

            {/* Modern Table */}
            <div className="overflow-x-auto w-full">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b">
                        <tr>
                            <th className="px-6 py-4 font-medium">Foydalanuvchi</th>
                            <th className="px-6 py-4 font-medium">Email</th>
                            <th className="px-6 py-4 font-medium">Rol</th>
                            <th className="px-6 py-4 font-medium">Holati</th>
                            <th className="px-6 py-4 font-medium text-right">Amallar</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                                    Foydalanuvchilar topilmadi.
                                </td>
                            </tr>
                        ) : filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-muted/20 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center text-primary-foreground font-bold shadow-sm">
                                            {user.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{user.username}</p>
                                            <p className="text-xs text-muted-foreground">{user.first_name} {user.last_name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-muted-foreground">
                                    {user.email || "Kiritilmagan"}
                                </td>
                                <td className="px-6 py-4">
                                    {getRoleBadge(user)}
                                </td>
                                <td className="px-6 py-4">
                                    {user.is_active ? (
                                        <span className="flex items-center gap-1.5 text-emerald-500 font-medium text-xs">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                            Faol
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1.5 text-muted-foreground font-medium text-xs">
                                            <span className="w-2 h-2 rounded-full bg-muted-foreground"></span>
                                            Nofaol
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => openEditModal(user)}
                                        className="p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-colors inline-flex"
                                        title="Rolni o'zgartirish"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Role Modal */}
            {editingUser && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    <div 
                        className="fixed inset-0 bg-black/50 transition-opacity animate-in fade-in duration-200"
                        onClick={() => setEditingUser(null)}
                    ></div>
                    
                    <div className="relative bg-card w-full max-w-md rounded-3xl shadow-2xl border border-border/50 p-8 m-4 animate-in fade-in zoom-in-95 duration-300">
                        <button
                            onClick={() => setEditingUser(null)}
                            className="absolute top-6 right-6 p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background border border-border/50 shadow-sm"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="mb-8 flex flex-col items-center text-center mt-2">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 text-primary flex items-center justify-center mb-5 shadow-inner">
                                <ShieldAlert className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent tracking-tight">Huquqlarni Boshqarish</h3>
                            <p className="text-sm text-muted-foreground mt-2 font-medium">
                                <span className="font-bold text-foreground px-2 py-1 bg-muted/50 rounded-md border border-border/50">{editingUser.username}</span> uchun ruxsatlar
                            </p>
                        </div>

                        {errorMSG && (
                            <div className="p-4 mb-6 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium flex items-center justify-center gap-2 animate-in shake">
                                <X className="w-4 h-4" />
                                {errorMSG}
                            </div>
                        )}

                        <div className="space-y-4 mb-8">
                            <label className="flex items-center justify-between p-4 rounded-2xl border border-border/50 bg-background/50 hover:bg-muted/30 cursor-pointer transition-all shadow-sm group">
                                <div className="flex flex-col">
                                    <p className="font-semibold text-foreground">Super Admin</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">Barcha funksiyalarga to&apos;liq ruxsat</p>
                                </div>
                                <div className="relative flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={isSuperuser}
                                        onChange={(e) => setIsSuperuser(e.target.checked)}
                                        className="peer sr-only"
                                    />
                                    <div className="w-11 h-6 bg-muted-foreground/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                                </div>
                            </label>

                            <label className="flex items-center justify-between p-4 rounded-2xl border border-border/50 bg-background/50 hover:bg-muted/30 cursor-pointer transition-all shadow-sm group">
                                <div className="flex flex-col">
                                    <p className="font-semibold text-foreground">Admin (<span className="font-mono text-[10px] bg-muted px-1 py-0.5 rounded">is_staff</span>)</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">Admin panelga kirish huquqi</p>
                                </div>
                                <div className="relative flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={isStaff}
                                        onChange={(e) => setIsStaff(e.target.checked)}
                                        className="peer sr-only"
                                    />
                                    <div className="w-11 h-6 bg-muted-foreground/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500 shadow-inner"></div>
                                </div>
                            </label>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setEditingUser(null)}
                                className="flex-1 px-4 py-3 rounded-xl border border-border/50 bg-background hover:bg-muted/50 font-semibold text-foreground transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={saveRoles}
                                disabled={loading}
                                className="flex-1 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-[0.98]"
                            >
                                {loading ? (
                                    <>
                                        <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></span>
                                        <span>Saqlanmoqda...</span>
                                    </>
                                ) : "Saqlash"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
