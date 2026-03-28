import Link from "next/link";
import { type ReactNode } from "react";
import { ArrowLeft, CalendarDays, Clock3, Files, UserRound } from "lucide-react";
import ArticleActions from "@/components/journal/article-actions";
import { fetchPublic, getMediaUrl } from "@/lib/api";
import {
    Article,
    formatArticleDate,
    getArticleExcerpt,
    getArticleHref,
    renderArticleContent,
} from "@/lib/article-content";

export const revalidate = 60;

export default async function JournalDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    let paper: Article | null = null;
    let relatedArticles: Article[] = [];

    try {
        const [paperRes, articlesRes] = await Promise.all([
            fetchPublic(`/api/articles/${params.id}/`, { next: { revalidate: 60 } }),
            fetchPublic("/api/articles/", { next: { revalidate: 60 } }),
        ]);

        if (paperRes.ok) {
            paper = (await paperRes.json()) as Article;
        }

        if (articlesRes.ok) {
            const allArticles = (await articlesRes.json()) as Article[];
            relatedArticles = allArticles
                .filter((article) => article.id !== paper?.id)
                .sort((left, right) => {
                    if ((left.category_name || "") === (paper?.category_name || "") && (right.category_name || "") !== (paper?.category_name || "")) {
                        return -1;
                    }
                    if ((right.category_name || "") === (paper?.category_name || "") && (left.category_name || "") !== (paper?.category_name || "")) {
                        return 1;
                    }

                    const leftTime = left.created_at ? new Date(left.created_at).getTime() : 0;
                    const rightTime = right.created_at ? new Date(right.created_at).getTime() : 0;
                    return rightTime - leftTime;
                })
                .slice(0, 4);
        }
    } catch (error) {
        console.error("Failed to fetch article", error);
    }

    if (!paper) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <Files className="mb-4 h-16 w-16 text-muted-foreground/30" />
                <h1 className="font-playfair text-3xl font-semibold text-foreground">Maqola topilmadi</h1>
                <p className="mt-2 text-muted-foreground">Siz qidirayotgan sahifa mavjud emas.</p>
                <Link
                    href="/journal"
                    className="mt-8 rounded-2xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90"
                >
                    Jurnalga qaytish
                </Link>
            </div>
        );
    }

    const citationText = `${paper.author || "Noma'lum muallif"}. "${paper.title}". QuantumUz Journal, ${
        paper.created_at ? new Date(paper.created_at).getFullYear() : new Date().getFullYear()
    }. DOI: ${paper.slug || paper.id}.`;

    return (
        <div className="relative w-full overflow-hidden bg-background pb-24">
            <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-foreground/5 blur-[120px]" />

            <section className="relative mx-auto w-full max-w-[1440px] px-4 pb-10 pt-12 md:px-12 lg:px-20">
                <Link
                    href="/journal"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Maqolalarga qaytish
                </Link>

                <div className="mt-6 grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
                    <div className="space-y-5">
                        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            <span className="rounded-full bg-foreground px-3 py-1 text-background">Jurnal</span>
                            <span className="rounded-full border border-border px-3 py-1">
                                {paper.category_name || "Kategoriyasiz"}
                            </span>
                        </div>

                        <h1 className="max-w-4xl font-playfair text-4xl font-semibold leading-tight text-foreground md:text-6xl">
                            {paper.title}
                        </h1>

                        <p className="max-w-3xl text-base leading-8 text-muted-foreground">
                            {getArticleExcerpt(paper, 240)}
                        </p>

                        <div className="flex flex-wrap gap-4 border-t border-border pt-5 text-sm text-muted-foreground">
                            <MetaPill icon={<UserRound className="h-4 w-4" />} label={paper.author || "Muallif ko'rsatilmagan"} />
                            <MetaPill icon={<CalendarDays className="h-4 w-4" />} label={formatArticleDate(paper.created_at)} />
                            <MetaPill icon={<Clock3 className="h-4 w-4" />} label={`${paper.read_time_minutes || 5} daqiqa`} />
                        </div>
                    </div>

                    {paper.cover_image ? (
                        <div className="overflow-hidden rounded-[2rem] border border-border bg-muted shadow-sm">
                            <img
                                src={getMediaUrl(paper.cover_image)}
                                alt={paper.title}
                                className="h-full min-h-[280px] w-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="rounded-[2rem] border border-border bg-[radial-gradient(circle_at_top,rgba(24,24,27,0.08),transparent_65%)] p-8">
                            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">QuantumUz Journal</p>
                            <p className="mt-6 font-playfair text-3xl font-semibold leading-tight text-foreground">
                                Tartibli o&apos;qish, iqtibos va maqola navigatsiyasi qo&apos;shildi.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <section className="relative mx-auto grid w-full max-w-[1440px] gap-8 px-4 md:px-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-20">
                <article className="min-w-0 rounded-[2rem] border border-border bg-background p-6 shadow-sm md:p-8">
                    {paper.summary && (
                        <div className="mb-8 rounded-[1.5rem] border border-border bg-muted/20 p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                Abstrakt
                            </p>
                            <p className="mt-3 text-base leading-8 text-foreground/85">{paper.summary}</p>
                        </div>
                    )}

                    <div
                        className="article-body"
                        dangerouslySetInnerHTML={{ __html: renderArticleContent(paper.content) }}
                    />
                </article>

                <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                    <div className="rounded-[2rem] border border-border bg-background p-6 shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground">Amallar</p>
                        <h2 className="mt-1 font-playfair text-2xl font-semibold text-foreground">Foydali tugmalar</h2>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            Ishlamaydigan PDF tugmasi olib tashlandi. Endi ulashish, chop etish va iqtibos nusxalash ishlaydi.
                        </p>

                        <div className="mt-5">
                            <ArticleActions pathname={getArticleHref(paper)} citationText={citationText} />
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-border bg-background p-6 shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground">Maqola ma&apos;lumotlari</p>
                        <dl className="mt-4 space-y-4 text-sm">
                            <MetaRow term="Kategoriya" value={paper.category_name || "Kategoriyasiz"} />
                            <MetaRow term="ID / slug" value={paper.slug || String(paper.id)} />
                            <MetaRow term="Ko'rishlar" value={String(paper.views || 0)} />
                            <MetaRow term="Yangilangan" value={formatArticleDate(paper.updated_at || paper.created_at)} />
                        </dl>
                    </div>

                    <div className="rounded-[2rem] border border-border bg-background p-6 shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground">Iqtibos</p>
                        <div className="mt-4 rounded-[1.5rem] border border-border bg-muted/20 p-4 text-sm leading-7 text-foreground/85">
                            {citationText}
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-border bg-background p-6 shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground">Yana o&apos;qing</p>
                        <div className="mt-4 space-y-4">
                            {relatedArticles.map((article) => (
                                <Link
                                    key={article.id}
                                    href={getArticleHref(article)}
                                    className="block rounded-[1.5rem] border border-border bg-muted/15 p-4 transition hover:border-foreground/30 hover:bg-muted/30"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                        {article.category_name || "Kategoriyasiz"}
                                    </p>
                                    <h3 className="mt-2 font-playfair text-xl font-semibold leading-snug text-foreground">
                                        {article.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                        {getArticleExcerpt(article, 100)}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>
            </section>
        </div>
    );
}

function MetaPill({ icon, label }: { icon: ReactNode; label: string }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2">
            {icon}
            {label}
        </span>
    );
}

function MetaRow({ term, value }: { term: string; value: string }) {
    return (
        <div className="rounded-[1.25rem] border border-border bg-muted/15 px-4 py-3">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{term}</dt>
            <dd className="mt-1 text-sm leading-6 text-foreground">{value}</dd>
        </div>
    );
}
