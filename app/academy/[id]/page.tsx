import Link from "next/link";
import { ArrowLeft, GraduationCap, Clock, Star, Play, CheckCircle2, User } from "lucide-react";
import { YouTubePlayer } from "@/components/youtube-player";
import { courses } from "@/lib/mockData";

export default function AcademyDetailPage({ params }: { params: { id: string } }) {
    // Normally fetch data by params.id
    const course = courses[0]; // mock fallback

    return (
        <div className="flex flex-col relative w-full overflow-hidden bg-background min-h-screen">
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-foreground/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            {/* Header Info */}
            <section className="w-full px-4 md:px-12 lg:px-20 mx-auto pt-12 pb-8">
                <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4" /> Barcha kurslar
                </Link>

                <div className="max-w-4xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex flex-wrap gap-2 items-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-muted border border-border text-[10px] text-foreground font-semibold uppercase tracking-wider backdrop-blur-md">
                            <GraduationCap className="w-3.5 h-3.5" />
                            {course?.level || "Boshlang'ich"}
                        </div>
                        {course?.tags.map(t => (
                            <span key={t} className="px-2 py-1 bg-background border border-border text-[10px] font-semibold text-muted-foreground rounded uppercase tracking-wider">{t}</span>
                        ))}
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-5xl font-playfair font-bold text-foreground leading-[1.15]">
                        {course?.title || "Kvant Hisoblash Asoslari"}
                    </h1>
                    <p className="text-base text-muted-foreground font-inter max-w-2xl pt-2">
                        {course?.description || "Kvant mexanikasi va kvant algoritmlariga kirish."}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-inter pt-4 border-t border-border">
                        <div className="flex items-center gap-1.5"><User className="w-4 h-4 text-foreground" /> Ustoz: <span className="font-semibold text-foreground">{course?.instructor}</span></div>
                        <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-foreground" /> Davomiyligi: <span className="font-semibold text-foreground">{course?.duration}</span></div>
                        <div className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-foreground text-foreground" /> 4.9 Reyting (2.5k O'quvchi)</div>
                    </div>
                </div>
            </section>

            {/* Main Content Layout */}
            <section className="w-full px-4 md:px-12 lg:px-20 mx-auto pb-20 flex flex-col lg:flex-row gap-10">

                {/* Focus Area: Player / Intro */}
                <div className="lg:w-2/3 space-y-8">
                    <div className="rounded-2xl overflow-hidden border border-border shadow-xl bg-muted/40 p-4">
                        {/* Use the first module's video as main trailer if needed */}
                        <YouTubePlayer videoId="dQw4w9WgXcQ" title="Trailer" />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-playfair font-bold text-foreground">Siz nimalarni o'rganasiz?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "Atom mantig'ini amalda hisoblash",
                                "Murakkab shifrlarni yechish poydevori",
                                "Kubitlar o'rtasidagi superpozitsiya",
                                "Ket Studio orqali o'z sxemalarini tuzish"
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm md:text-base font-inter text-muted-foreground leading-relaxed">
                                    <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar: Course Content / Curriculum */}
                <div className="lg:w-1/3">
                    <div className="bg-muted/10 border border-border rounded-3xl p-6 lg:sticky lg:top-24">
                        <h3 className="font-playfair text-xl font-bold text-foreground mb-6">Mundarija (Syllabus)</h3>

                        <div className="space-y-4 font-inter text-sm">
                            {/* Module 1 */}
                            <div className="space-y-2">
                                <div className="font-semibold text-foreground flex justify-between items-center">
                                    <span>1. Kirish</span>
                                    <span className="text-muted-foreground text-[10px] uppercase font-bold bg-background border border-border px-2 py-1 rounded">2 Dars</span>
                                </div>
                                <div className="flex flex-col gap-1 pl-3 border-l-2 border-border/50">
                                    <button className="flex items-center gap-2 py-2 px-3 text-left hover:bg-muted/50 rounded-lg text-foreground transition-colors group">
                                        <Play className="w-3.5 h-3.5 group-hover:text-foreground/80 shrink-0" />
                                        <span className="font-medium">1.1 Kvant tushunchasi va Kubitlar</span>
                                        <span className="ml-auto text-xs text-muted-foreground">15:00</span>
                                    </button>
                                    <button className="flex items-center gap-2 py-2 px-3 text-left hover:bg-muted/50 rounded-lg text-muted-foreground hover:text-foreground transition-colors group">
                                        <Play className="w-3.5 h-3.5 opacity-50 shrink-0" />
                                        <span>1.2 Superpozitsiya fenomeni</span>
                                        <span className="ml-auto text-xs opacity-50">21:40</span>
                                    </button>
                                </div>
                            </div>

                            {/* Module 2 */}
                            <div className="space-y-2">
                                <div className="font-semibold text-muted-foreground flex justify-between items-center opacity-70">
                                    <span>2. Asosiy Gate (Ventillar)</span>
                                    <span className="text-muted-foreground text-[10px] uppercase font-bold bg-background border border-border px-2 py-1 rounded">3 Dars</span>
                                </div>
                                <div className="flex flex-col gap-1 pl-3 border-l-2 border-border/20">
                                    <div className="py-2 px-3 text-left text-muted-foreground/50 italic text-xs">
                                        Keyingi modulni ochish o'tish darslarini yakunlang
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-border">
                            <button className="w-full py-4 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 transition-colors shadow-lg">
                                Kursga yozilish (Bepul)
                            </button>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}
