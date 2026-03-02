"use client";

import { FlaskConical, MousePointerClick, BarChart3, Binary, Rotate3D, Settings2, Play, Grid2X2 } from "lucide-react";
import { useState } from "react";

export default function LaboratoryPage() {
    const [activeTab, setActiveTab] = useState('quantum');

    return (
        <div className="flex flex-col relative w-full overflow-hidden bg-background">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            {/* Header */}
            <section className="w-full px-4 md:px-12 lg:px-20 mx-auto pt-16 pb-10">
                <div className="max-w-4xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs text-foreground/80 font-medium font-inter backdrop-blur-md">
                        <FlaskConical className="w-3.5 h-3.5" />
                        <span>Virtual Eksperimentlar</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-5xl font-playfair font-bold text-foreground leading-[1.15]">
                        Ilm-fan qonuniyatlarini <br className="hidden md:block" />
                        <span className="italic text-muted-foreground text-2xl md:text-4xl lg:text-4xl">amaliyotga tadbiq eting</span>
                    </h1>
                    <p className="text-base text-muted-foreground font-inter bg-muted/20 p-3 rounded-lg border-l-2 border-foreground max-w-xl">
                        Kvant mantig'ini yig'ish, atom qatlamlari bilan ishlash va ma'lumotlarni tahlil qilish uchun yagona interaktiv sandbox. Tajriba stolini sozlang.
                    </p>
                </div>
            </section>

            <section className="w-full px-4 md:px-12 lg:px-20 mx-auto pb-20 flex flex-col xl:flex-row gap-6 items-start">

                {/* Sidebar Controls */}
                <div className="w-full xl:w-72 flex flex-col gap-4 shrink-0 lg:sticky lg:top-20">
                    <div className="bg-background rounded-2xl border border-border p-5 shadow-sm shadow-muted/50 hover:border-foreground/20 transition-all font-inter">
                        <h3 className="text-lg font-playfair font-bold text-foreground mb-3">Rejimlar</h3>
                        <div className="flex flex-col gap-1.5 border-l border-border pl-3">
                            {[
                                { id: 'quantum', label: 'Kvant Arxitektura', icon: <Binary className="w-3.5 h-3.5" /> },
                                { id: 'physics', label: 'Fizik Dvigatel', icon: <Rotate3D className="w-3.5 h-3.5" /> },
                                { id: 'data', label: 'Statistik Qism', icon: <BarChart3 className="w-3.5 h-3.5" /> },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all text-left ${activeTab === tab.id
                                            ? 'bg-foreground text-background shadow-sm translate-x-1'
                                            : 'bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground hover:translate-x-1'
                                        }`}
                                >
                                    {tab.icon}
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-muted/30 rounded-2xl border border-border p-5 font-inter hidden xl:block">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-base font-playfair font-bold text-foreground">Asboblar</h3>
                            <Settings2 className="w-3.5 h-3.5 text-muted-foreground" />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px] text-center font-medium text-foreground">
                            <div className="p-2 bg-background border border-border rounded-lg cursor-not-allowed opacity-50"><Grid2X2 className="w-4 h-4 mx-auto mb-1" /> Setka</div>
                            <div className="p-2 bg-background border border-border rounded-lg cursor-not-allowed opacity-50"><MousePointerClick className="w-4 h-4 mx-auto mb-1" /> Tanlash</div>
                        </div>
                    </div>
                </div>

                {/* Interactive Canvas Area */}
                <div className="w-full flex-1 aspect-square md:aspect-video xl:aspect-auto xl:h-[550px] rounded-3xl border border-border bg-muted/20 relative overflow-hidden flex flex-col items-center justify-center group animate-in zoom-in-95 duration-700 shadow-lg">

                    {/* Grid Background */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHYxSDB6bTAgMHY0MGgxVjB6IiBmaWxsPSJyZ2JhKDE1MCwxNTAsMTUwLDAuMSkiLz4KPC9zdmc+')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHYxSDB6bTAgMHY0MGgxVjB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+Cjwvc3ZnPg==')] opacity-50 z-0 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />

                    <div className="z-10 text-center space-y-4 max-w-sm mx-auto p-8 rounded-2xl bg-background/90 backdrop-blur-xl border border-border group-hover:border-foreground/30 transition-shadow shadow-xl relative">
                        <div className="absolute -top-4 -left-4 w-8 h-8 bg-background border border-border rounded-xl rotate-12 -z-10 shadow-sm" />
                        <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-muted border border-border rounded-full -z-10 shadow-sm" />

                        <div className="w-14 h-14 mx-auto rounded-full bg-foreground border-4 border-background flex items-center justify-center animate-pulse drop-shadow-md">
                            <Play className="w-6 h-6 text-background ml-1" />
                        </div>

                        <h3 className="font-playfair text-2xl font-bold text-foreground">
                            {activeTab === 'quantum' && "Kvant muhiti tayyor"}
                            {activeTab === 'physics' && "Simulyatsiya xonasi kutmoqda"}
                            {activeTab === 'data' && "Ma'lumotlar moduli ulangan"}
                        </h3>

                        <p className="font-inter text-muted-foreground text-[11px] md:text-sm leading-relaxed border-t border-border/50 pt-3">
                            Dastlabki komponentlarni sudrab tushiring. Algoritm vizuallashtiriladi va natijalar o'ng paneldagi interfeysga uzatiladi.
                        </p>

                        <button className="w-full py-2.5 rounded-lg bg-foreground hover:bg-foreground/90 text-background text-sm font-semibold transition-all flex items-center justify-center gap-1.5 shadow-md scale-100 hover:scale-[1.02]">
                            <FlaskConical className="w-4 h-4" />
                            Ishni boshlash
                        </button>
                    </div>

                    {/* Decorative elements for 'science' feel */}
                    <div className="absolute top-1/4 left-1/4 w-24 h-24 border border-foreground/10 rounded-full animate-[spin_10s_linear_infinite] opacity-50 z-0" />
                    <div className="absolute bottom-1/4 right-1/4 w-32 h-32 border border-muted-foreground/10 rounded-3xl animate-[spin_15s_linear_infinite] opacity-50 z-0" />
                </div>

            </section>
        </div>
    );
}
