import Link from "next/link";
import { Newspaper, FileText, ArrowUpRight, Calendar, Clock, Bookmark, Search, ArrowRight } from "lucide-react";
import { fetchPublic } from "@/lib/api";

export const revalidate = 60;

export default async function JournalPage() {
    let articles: any[] = [];
    try {
        const res = await fetchPublic("/api/articles/", { next: { revalidate: 60 } });
        if (res.ok) articles = await res.json();
    } catch (e) {
        console.error("Failed to fetch articles", e);
    }

    const categories = ["Kvant Fizikasi", "Matematika", "Materialshunoslik", "Nanotexnologiya", "Informatika"];

    const featuredPaper = articles.length > 0 ? articles[0] : null;
    const recentPapers = articles.slice(1);

    return (
        <div className="flex flex-col relative w-full overflow-hidden bg-background">
            <div className="absolute top-0 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-foreground/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            {/* Header section w-full layout */}
            <section className="w-full px-4 md:px-12 lg:px-20 mx-auto pt-16 pb-12">
                <div className="max-w-4xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs text-foreground/80 font-medium font-inter backdrop-blur-md">
                        <Newspaper className="w-3.5 h-3.5" />
                        <span>Ochiq Jurnal Integratsiyasi</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-5xl font-playfair font-bold text-foreground leading-[1.15]">
                        Keng ko'lamli <br />
                        <span className="italic text-foreground/80 text-muted-foreground w-full block mt-2 text-2xl md:text-4xl lg:text-4xl">Ilmiy nashrlar va maqolalar</span>
                    </h1>

                    <p className="text-base text-muted-foreground font-inter max-w-2xl pt-2">
                        Xalqaro standartlarda tekshiriluvchi materiallarni to'g'ridan to'g'ri tizimning o'zida tahlil qiling va O'zbekistonning boy ilmiy tadqiqotlari bilan tanishing. Barcha maqolalar DOI asosida indekslanadi.
                    </p>
                </div>
            </section>

            <section className="w-full px-4 md:px-12 lg:px-20 mx-auto pb-12 border-b border-border">
                {/* Categories Track */}
                <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-hide text-xs font-inter">
                    <button className="px-3 py-1.5 rounded-full border border-foreground bg-foreground text-background font-semibold shrink-0">Barchasi</button>
                    {categories.map((c, i) => (
                        <button key={i} className="px-3 py-1.5 rounded-full border border-border bg-muted/40 hover:bg-muted text-foreground transition-colors shrink-0">
                            {c}
                        </button>
                    ))}
                </div>
            </section>

            {/* Featured Paper w-full */}
            {featuredPaper && (
                <section className="w-full px-4 md:px-12 lg:px-20 mx-auto py-12">
                    <div className="mb-10 group cursor-pointer relative lg:flex items-stretch gap-0 rounded-2xl overflow-hidden glass-panel border border-border glow-effect animate-in fade-in slide-in-from-bottom-8 duration-700 shadow-lg w-full">
                        <div className="lg:w-2/5 min-h-[300px] bg-muted/50 border-r border-border relative overflow-hidden flex items-center justify-center p-6 m-1 rounded-l-[0.9rem]">
                            {featuredPaper.cover_image ? (
                                <img src={featuredPaper.cover_image} alt={featuredPaper.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                            ) : (
                                <>
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(150,150,150,0.1)_0%,transparent_100%)] opacity-50 block dark:hidden" />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)] opacity-50 hidden dark:block" />
                                    <FileText className="w-16 h-16 text-foreground/40 group-hover:scale-110 transition-transform duration-700 drop-shadow-md relative z-10" />
                                </>
                            )}
                        </div>
                        <div className="lg:w-3/5 p-6 lg:p-10 space-y-4 flex flex-col justify-center">
                            <div className="flex items-center gap-2 text-xs text-foreground font-medium font-inter">
                                <span className="bg-foreground text-background shadow-sm px-2 py-1 rounded-md border border-border">Muharrir Tanlovi</span>
                                <span className="text-muted-foreground border-b border-muted-foreground/30 border-dashed">{featuredPaper.category_name || "Jurnal"}</span>
                            </div>

                            <h2 className="text-2xl lg:text-3xl font-playfair font-bold text-foreground group-hover:text-foreground/80 transition-colors leading-tight line-clamp-3">
                                {featuredPaper.title}
                            </h2>

                            <div className="font-inter text-muted-foreground text-sm line-clamp-4 leading-relaxed bg-muted/20 p-3 rounded-lg border border-border/50 border-l-[3px] border-l-foreground shadow-sm" dangerouslySetInnerHTML={{ __html: featuredPaper.summary || featuredPaper.content?.substring(0, 150) || "" }} />

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-5 border-t border-border mt-auto gap-3">
                                <div className="flex items-center gap-3 text-xs text-muted-foreground font-inter">
                                    <div className="flex items-center gap-1.5 bg-background px-2 py-1 rounded-md border border-border shadow-sm">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span className="font-medium">{new Date(featuredPaper.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{featuredPaper.read_time_minutes || 5} o&apos;qish</span>
                                    </div>
                                </div>
                                <Link href={`/journal/${featuredPaper.slug || featuredPaper.id}`} className="flex items-center justify-center gap-1 text-background text-xs font-semibold hover:bg-foreground/90 transition-colors bg-foreground px-4 py-2 rounded-lg shadow-sm w-full sm:w-auto shrink-0 transition-transform hover:scale-105 active:scale-95 cursor-pointer">
                                    Maqolaga o&apos;tish <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Recent Papers Layout */}
            <section className="w-full px-4 md:px-12 lg:px-20 mx-auto pb-20 border-t border-border pt-12 bg-muted/10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 w-full">
                    <h3 className="text-2xl font-playfair font-bold text-foreground">Eng so'nggi chop etilganlar</h3>

                    <div className="relative w-full md:w-64 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-9 pr-3 py-2 border border-border rounded-lg leading-5 bg-background text-foreground placeholder-muted-foreground ring-foreground focus:outline-none focus:ring-1 sm:text-sm shadow-sm transition-all font-inter"
                            placeholder="Maqola qidiring..."
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {recentPapers.map((paper, idx) => (
                        <Link href={`/journal/${paper.slug || paper.id}`} key={paper.id} className="group flex flex-col p-6 rounded-2xl border border-border bg-background shadow-sm hover:shadow-md hover:border-foreground/40 transition-all cursor-pointer h-full animate-in zoom-in-95 duration-700" style={{ animationDelay: `${idx * 150}ms` }}>
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground bg-muted border border-border px-2 py-1 rounded inline-block shadow-sm">
                                    {paper.category_name || "Jurnal"}
                                </span>
                                <Bookmark className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:fill-foreground transition-all" />
                            </div>

                            <h4 className="font-playfair text-lg font-bold text-foreground line-clamp-3 group-hover:text-foreground/70 transition-colors mb-2 flex-1 leading-tight">
                                {paper.title}
                            </h4>

                            <div className="font-inter text-[11px] md:text-xs text-muted-foreground mb-6 line-clamp-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: paper.summary || paper.content?.substring(0, 100) || "" }} />

                            <div className="mt-auto bg-muted/30 p-3 rounded-lg border border-border/50 flex flex-col gap-2">
                                <div className="flex justify-between items-center w-full">
                                    <span className="text-[10px] md:text-xs font-semibold text-foreground font-inter">{paper.author || "Noma'lum muallif"}</span>
                                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-background rounded border border-border text-muted-foreground border-dashed">ID: {paper.id}</span>
                                </div>
                                <div className="flex items-center justify-between text-[10px] md:text-xs text-muted-foreground font-inter w-full">
                                    <span className="font-medium">{new Date(paper.created_at).toLocaleDateString()}</span>
                                    <span className="flex items-center gap-1 text-foreground font-semibold hover:underline cursor-pointer group-hover:translate-x-1 transition-transform">
                                        Ko'rish <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                    {articles.length === 0 && (
                        <div className="col-span-full py-12 text-center text-muted-foreground">
                            Xozircha maqolalar mavjud emas.
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
