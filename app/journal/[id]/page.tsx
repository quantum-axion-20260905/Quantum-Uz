import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Calendar, CheckCircle2, User, Share2, Printer } from "lucide-react";
import { scientificPapers } from "@/lib/mockData";

export default function JournalDetailPage({ params }: { params: { id: string } }) {
    const paper = scientificPapers[0]; // fallback mock data

    return (
        <div className="flex flex-col relative w-full overflow-hidden bg-background min-h-screen pb-24">
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-foreground/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            {/* Header Info */}
            <section className="w-full px-4 md:px-12 lg:px-20 mx-auto pt-12 pb-8">
                <Link href="/journal" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4" /> Maqolalarga qaytish
                </Link>

                <div className="max-w-4xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex flex-wrap gap-2 items-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-foreground text-background text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md shadow-sm">
                            Muharrir Tanlovi
                        </div>
                        <span className="px-2 py-1 bg-muted border border-border text-[10px] font-semibold text-foreground rounded uppercase tracking-wider">{paper?.category}</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground leading-[1.15]">
                        {paper?.title || "Ilmiy Tadqiqot Namoyishi"}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-muted-foreground font-inter pt-4 border-t border-border/50">
                        <div className="flex items-center gap-1.5"><User className="w-4 h-4 text-foreground" /> Hissadorlar: <span className="font-semibold text-foreground">{paper?.authors.join(', ')}</span></div>
                        <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-foreground" /> Nashr qilingan kun: <span className="font-semibold text-foreground">{paper?.publishedDate}</span></div>
                        <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-foreground" /> O'qish davomiyligi: <span className="font-semibold text-foreground">{paper?.readTime}</span></div>
                    </div>
                </div>
            </section>

            {/* Abstract and Content Section */}
            <section className="w-full px-4 md:px-12 lg:px-20 mx-auto flex flex-col lg:flex-row gap-10">

                {/* Main Content (Article) */}
                <div className="lg:w-2/3 space-y-8 font-inter text-muted-foreground leading-relaxed text-base">

                    <div className="p-6 rounded-2xl bg-muted/20 border-l-4 border-foreground border-y border-r shadow-sm">
                        <h3 className="font-playfair text-xl font-bold text-foreground mb-3">Abstrakt</h3>
                        <p className="italic">{paper?.abstract}</p>
                    </div>

                    <div className="space-y-6 pt-4 border-t border-border">
                        <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">1. Kirish qismi</h3>
                        <p>
                            O'zbekistonning ta'lim tizimini rivojlantirish va unga yosh mutantlarni (mutaxassislarni) jalb qilish yo'lidagi asosiy qonuniyatlardan biri - zamonaviy texnologiyalarni amaliyotda uzluksiz integratsiya qilishdir. Kvant texnologiyasi bugunki kunda...
                        </p>

                        <p>
                            Shu o'rinda "QuantumUz" axborot tizimi asosiy axborot portalli sifatida butun Respublikani markazlashgan axiyonal resurs bilan taminlab kelmoqda.
                        </p>

                        <div className="my-8 rounded-xl overflow-hidden border border-border">
                            <div className="w-full h-[300px] bg-muted flex items-center justify-center italic text-xs">
                                Diagramma/Grafik joylashish o'rni (Vizuallashuv)
                            </div>
                            <div className="bg-background border-t border-border p-3 text-[10px] text-center">
                                Rasm 1. O'zgaruvchan algoritmlar modeli vizualligi va vaqt davomiyligi ustidagi ta'siri (Fig 1.)
                            </div>
                        </div>

                        <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">2. Analiz va Natijalar</h3>
                        <p>
                            Olingan malumotlar tahlili shuni ko'rsatadiki, standart klasikka nisbatan o'tkazilgan testlar:
                        </p>
                        <ul className="space-y-2 pl-4 border-l-2 border-muted">
                            <li>— Vazifalarni hal etish vaqti 34% ga tezlashdi;</li>
                            <li>— Modelning hajmi deyarli teng, lekin ma'lumot qamrovi 2 barobar ko'proq chiqdi;</li>
                            <li>— Error Correction (xato isloh qilish) protokoli odatdagi tizimlardan farqli o'laroq ko'proq zaxira parametrlarini talab qildi.</li>
                        </ul>

                        <h3 className="font-playfair text-xl font-bold text-foreground mb-4 pt-4 border-t border-border">Xulosa</h3>
                        <p>
                            Natijalar ko'rsatmoqdaki, integratsiya barqaror va amaliy. Kelgusida shu yo'nalish bo'yicha yana-da batafsil...
                        </p>
                    </div>
                </div>

                {/* Right Sidebar (Cite / Metrics) */}
                <div className="lg:w-1/3 space-y-6">
                    <div className="bg-muted/10 border border-border rounded-3xl p-6 lg:sticky lg:top-24 space-y-6">

                        <div className="space-y-2">
                            <h4 className="font-playfair font-bold text-foreground text-lg mb-4">Foydali tugmalar</h4>
                            <div className="flex flex-col gap-2 font-inter text-sm font-medium">
                                <button className="flex items-center gap-2 py-3 px-4 bg-foreground text-background rounded-xl shadow-md transition-colors hover:bg-foreground/90 justify-center">
                                    <BookOpen className="w-4 h-4" /> PDF o'qish (To'liq format)
                                </button>
                                <div className="flex gap-2">
                                    <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-background border border-border rounded-xl text-foreground hover:bg-muted transition-colors">
                                        <Share2 className="w-4 h-4" /> Ulashish
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-background border border-border rounded-xl text-foreground hover:bg-muted transition-colors">
                                        <Printer className="w-4 h-4" /> Bosmaxona
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-6 border-t border-border font-inter text-xs text-muted-foreground">
                            <div className="flex flex-col">
                                <span className="font-semibold text-foreground mb-1">DOI Indeks:</span>
                                <span className="bg-background border border-border rounded px-2 py-1 font-mono">{paper?.id}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-foreground mb-1">Havoladan foydalanish (Cite):</span>
                                <div className="bg-background border border-border rounded p-3 select-all">
                                    {paper?.authors.join(', ')}. "{paper?.title}". QuantumUz Journal, {new Date().getFullYear()}. doi: {paper?.id}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
