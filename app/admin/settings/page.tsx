import { User, Shield, KeyRound, BellRing, MonitorSmartphone } from "lucide-react";

export const metadata = {
    title: "Sozlamalar | QuantumUz Admin",
};

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Sozlamalar</h1>
                <p className="text-muted-foreground">Tizim va shaxsiy profil sozlamalarini boshqarish.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                {/* Sidebar Nav (Static for now) */}
                <div className="col-span-1 border rounded-2xl bg-card/50 p-4 space-y-1 h-fit">
                    <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium bg-primary/10 text-primary rounded-lg transition-colors">
                        <User className="w-4 h-4" />
                        Profil sozlamalari
                    </button>
                    <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors">
                        <Shield className="w-4 h-4" />
                        Xavfsizlik
                    </button>
                    <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors">
                        <BellRing className="w-4 h-4" />
                        Bildirishnomalar
                    </button>
                    <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors">
                        <MonitorSmartphone className="w-4 h-4" />
                        Tizim ko&apos;rinishi
                    </button>
                </div>

                {/* Content Area */}
                <div className="col-span-1 md:col-span-3 space-y-6">

                    <div className="border rounded-2xl bg-card/50 p-6">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <User className="w-5 h-5 text-primary" /> Shaxsiy Ma&apos;lumotlar
                        </h2>
                        <div className="space-y-5 max-w-md">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground/90">To&apos;liq ism</label>
                                <input type="text" defaultValue="Admin User" className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all shadow-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground/90">Email manzil</label>
                                <input type="email" defaultValue="admin@quantumuz.com" className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all shadow-sm" />
                            </div>
                            <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all text-sm shadow-lg shadow-primary/20 active:scale-[0.98]">
                                Saqlash
                            </button>
                        </div>
                    </div>

                    <div className="border rounded-2xl bg-card/50 p-6">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <KeyRound className="w-5 h-5 text-primary" /> Parolni o&apos;zgartirish
                        </h2>
                        <div className="space-y-5 max-w-md">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground/90">Joriy parol</label>
                                <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all shadow-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground/90">Yangi parol</label>
                                <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all shadow-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground/90">Yangi parolni tasdiqlash</label>
                                <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all shadow-sm" />
                            </div>
                            <button className="px-6 py-3 border border-border/50 font-semibold rounded-xl hover:bg-muted/50 transition-all text-sm shadow-sm active:scale-[0.98]">
                                Parolni yangilash
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
