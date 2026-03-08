import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Calendar, CheckCircle2, User, Share2, Printer } from "lucide-react";
import { fetchPublic } from "@/lib/api";

export default async function JournalDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    let paper = null;
    try {
        const res = await fetchPublic(`/api/articles/${params.id}/`, { next: { revalidate: 60 } });
        if (res.ok) {
            paper = await res.json();
        }
    } catch (e) {
        console.error("Failed to fetch article", e);
    }

    if (!paper) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <BookOpen className="w-16 h-16 text-muted-foreground/30 mb-4" />
                <h1 className="text-2xl md:text-3xl font-playfair font-bold mb-2">Maqola topilmadi</h1>
                <p className="text-muted-foreground">Siz qidirayotgan sahifa mavjud emas.</p>
                <Link href="/journal" className="mt-8 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    Jurnalga qaytish
                </Link>
            </div>
        );
    }

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
                        <span className="px-2 py-1 bg-muted border border-border text-[10px] font-semibold text-foreground rounded uppercase tracking-wider">{paper?.category_name || "Jurnal"}</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground leading-[1.15]">
                        {paper?.title || "Ilmiy Tadqiqot Namoyishi"}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-muted-foreground font-inter pt-4 border-t border-border/50">
                        <div className="flex items-center gap-1.5"><User className="w-4 h-4 text-foreground" /> Muallif: <span className="font-semibold text-foreground">{paper?.author || "Noma'lum muallif"}</span></div>
                        <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-foreground" /> Nashr qilingan kun: <span className="font-semibold text-foreground">{paper?.created_at ? new Date(paper.created_at).toLocaleDateString() : ""}</span></div>
                        <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-foreground" /> O'qish davomiyligi: <span className="font-semibold text-foreground">{paper?.read_time_minutes || 5} daqiqa</span></div>
                    </div>
                </div>
            </section>

            {/* Abstract and Content Section */}
            <section className="w-full px-4 md:px-12 lg:px-20 mx-auto flex flex-col lg:flex-row gap-10">

                {/* Main Content (Article) */}
                <div className="lg:w-2/3 space-y-8 font-inter text-muted-foreground leading-relaxed text-base">

                    {paper?.summary && (
                        <div className="p-6 rounded-2xl bg-muted/20 border-l-4 border-foreground border-y border-r shadow-sm">
                            <h3 className="font-playfair text-xl font-bold text-foreground mb-3">Abstrakt</h3>
                            <p className="italic">{paper.summary}</p>
                        </div>
                    )}

                    <div className="space-y-6 pt-4 border-t border-border prose prose-neutral dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: paper?.content || "" }} />
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
                                    {paper?.author || "Noma'lum muallif"}. "{paper?.title}". QuantumUz Journal, {paper?.created_at ? new Date(paper.created_at).getFullYear() : new Date().getFullYear()}. doi: {paper?.id}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
