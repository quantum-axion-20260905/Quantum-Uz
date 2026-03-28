"use client";

import Link from "next/link";
import { type ReactNode, startTransition, useDeferredValue, useState } from "react";
import {
    ArrowRight,
    BookOpenText,
    CalendarDays,
    Clock3,
    Layers3,
    Search,
    Sparkles,
} from "lucide-react";
import { Article, formatArticleDate, getArticleExcerpt, getArticleHref, stripHtml } from "@/lib/article-content";
import { getMediaUrl } from "@/lib/api";
import { cn } from "@/lib/utils";

type CategoryStat = {
    name: string;
    count: number;
};

type JournalBrowserProps = {
    articles: Article[];
    categories: CategoryStat[];
};

const INITIAL_ARCHIVE_COUNT = 6;
const ARCHIVE_STEP = 6;

export default function JournalBrowser({ articles, categories }: JournalBrowserProps) {
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("Barchasi");
    const [visibleArchiveCount, setVisibleArchiveCount] = useState(INITIAL_ARCHIVE_COUNT);
    const deferredQuery = useDeferredValue(query.trim().toLowerCase());

    const filteredArticles = articles.filter((article) => {
        const matchesCategory =
            activeCategory === "Barchasi" || (article.category_name || "Kategoriyasiz") === activeCategory;

        if (!matchesCategory) {
            return false;
        }

        if (!deferredQuery) {
            return true;
        }

        const searchableContent = [
            article.title,
            article.author,
            article.category_name,
            article.summary,
            stripHtml(article.content),
            ...(article.tags_names ?? []),
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        return searchableContent.includes(deferredQuery);
    });

    const featuredArticle = filteredArticles[0];
    const spotlightArticles = filteredArticles.slice(1, 4);
    const archiveArticles = filteredArticles.slice(4);
    const visibleArchiveArticles = archiveArticles.slice(0, visibleArchiveCount);
    const canLoadMore = visibleArchiveArticles.length < archiveArticles.length;

    return (
        <div className="space-y-10">
            <section className="grid gap-4 md:grid-cols-3">
                <StatCard
                    label="Jami maqolalar"
                    value={articles.length.toString()}
                    description="Barcha nashrlar bitta joyda jamlangan."
                    icon={<BookOpenText className="h-5 w-5" />}
                />
                <StatCard
                    label="Top kategoriyalar"
                    value={Math.min(categories.length, 10).toString()}
                    description="Filtrlash uchun eng faol yo'nalishlar."
                    icon={<Layers3 className="h-5 w-5" />}
                />
                <StatCard
                    label="Hozirgi natija"
                    value={filteredArticles.length.toString()}
                    description="Qidiruv va filter bo'yicha topilgan maqolalar."
                    icon={<Sparkles className="h-5 w-5" />}
                />
            </section>

            <section className="rounded-[2rem] border border-border bg-muted/20 p-5 md:p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Jurnal arxivi</p>
                        <h2 className="font-playfair text-3xl font-semibold text-foreground">Maqolalarni qidirish va saralash</h2>
                        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                            Barcha maqolalarni sarlavha, muallif, kategoriya va kontent bo&apos;yicha ko&apos;rish mumkin.
                            Top 10 kategoriya alohida chiqarildi.
                        </p>
                    </div>

                    <label className="relative block w-full lg:max-w-sm">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            value={query}
                            onChange={(event) =>
                                startTransition(() => {
                                    setQuery(event.target.value);
                                    setVisibleArchiveCount(INITIAL_ARCHIVE_COUNT);
                                })
                            }
                            placeholder="Sarlavha, muallif yoki matndan qidiring"
                            className="w-full rounded-2xl border border-border bg-background px-12 py-3 text-sm text-foreground outline-none transition focus:border-foreground/40"
                        />
                    </label>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                    <FilterChip
                        active={activeCategory === "Barchasi"}
                        label={`Barchasi (${articles.length})`}
                        onClick={() =>
                            startTransition(() => {
                                setActiveCategory("Barchasi");
                                setVisibleArchiveCount(INITIAL_ARCHIVE_COUNT);
                            })
                        }
                    />
                    {categories.map((category) => (
                        <FilterChip
                            key={category.name}
                            active={activeCategory === category.name}
                            label={`${category.name} (${category.count})`}
                            onClick={() =>
                                startTransition(() => {
                                    setActiveCategory(category.name);
                                    setVisibleArchiveCount(INITIAL_ARCHIVE_COUNT);
                                })
                            }
                        />
                    ))}
                </div>
            </section>

            {featuredArticle ? (
                <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
                    <Link
                        href={getArticleHref(featuredArticle)}
                        className="group overflow-hidden rounded-[2rem] border border-border bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div className="grid h-full gap-0 lg:grid-cols-[minmax(240px,0.9fr)_minmax(0,1.1fr)]">
                            <div className="relative min-h-[260px] overflow-hidden bg-muted">
                                {featuredArticle.cover_image ? (
                                    <img
                                        src={getMediaUrl(featuredArticle.cover_image)}
                                        alt={featuredArticle.title}
                                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(24,24,27,0.12),transparent_60%)]" />
                                )}
                            </div>

                            <div className="flex flex-col p-6 md:p-8">
                                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
                                    <span className="rounded-full bg-foreground px-3 py-1 text-background">Ajratilgan maqola</span>
                                    <span>{featuredArticle.category_name || "Kategoriyasiz"}</span>
                                </div>
                                <h3 className="mt-4 font-playfair text-3xl font-semibold leading-tight text-foreground">
                                    {featuredArticle.title}
                                </h3>
                                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                                    {getArticleExcerpt(featuredArticle, 260)}
                                </p>
                                <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <MetaItem icon={<CalendarDays className="h-4 w-4" />} label={formatArticleDate(featuredArticle.created_at)} />
                                    <MetaItem icon={<Clock3 className="h-4 w-4" />} label={`${featuredArticle.read_time_minutes || 5} daqiqa`} />
                                </div>
                                <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                                    Maqolani ochish
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    <div className="rounded-[2rem] border border-border bg-background p-5 md:p-6">
                        <div className="mb-5 flex items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Tez kirish</p>
                                <h3 className="font-playfair text-2xl font-semibold text-foreground">Ko&apos;p ko&apos;riladigan maqolalar</h3>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {spotlightArticles.map((article) => (
                                <Link
                                    key={article.id}
                                    href={getArticleHref(article)}
                                    className="block rounded-2xl border border-border bg-muted/15 p-4 transition hover:border-foreground/30 hover:bg-muted/30"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                        {article.category_name || "Kategoriyasiz"}
                                    </p>
                                    <h4 className="mt-2 font-playfair text-xl font-semibold leading-snug text-foreground">
                                        {article.title}
                                    </h4>
                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                        {getArticleExcerpt(article, 120)}
                                    </p>
                                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                                        <span>{article.author || "Muallif ko'rsatilmagan"}</span>
                                        <span>{formatArticleDate(article.created_at)}</span>
                                    </div>
                                </Link>
                            ))}

                            {spotlightArticles.length === 0 && (
                                <div className="rounded-2xl border border-dashed border-border p-5 text-sm text-muted-foreground">
                                    Tanlangan filter bo&apos;yicha qo&apos;shimcha maqolalar topilmadi.
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            ) : (
                <EmptyState query={query} />
            )}

            {featuredArticle && (
                <section className="space-y-5">
                    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Arxiv</p>
                            <h3 className="font-playfair text-3xl font-semibold text-foreground">Boshqa maqolalar</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {filteredArticles.length} ta natija, shundan {archiveArticles.length} tasi arxiv kartalarda.
                        </p>
                    </div>

                    {archiveArticles.length > 0 ? (
                        <>
                            <div className="grid gap-5 md:grid-cols-2">
                                {visibleArchiveArticles.map((article) => (
                                    <Link
                                        key={article.id}
                                        href={getArticleHref(article)}
                                        className="group flex h-full flex-col rounded-[1.75rem] border border-border bg-background p-6 transition hover:-translate-y-1 hover:border-foreground/30 hover:shadow-md"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                                    {article.category_name || "Kategoriyasiz"}
                                                </p>
                                                <h4 className="mt-3 font-playfair text-2xl font-semibold leading-tight text-foreground">
                                                    {article.title}
                                                </h4>
                                            </div>
                                            <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                                                #{article.id}
                                            </span>
                                        </div>

                                        <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">
                                            {getArticleExcerpt(article, 180)}
                                        </p>

                                        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-sm text-muted-foreground">
                                            <span>{article.author || "Muallif ko'rsatilmagan"}</span>
                                            <div className="flex items-center gap-4">
                                                <span>{formatArticleDate(article.created_at)}</span>
                                                <span className="inline-flex items-center gap-2 font-medium text-foreground">
                                                    Ochish
                                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {canLoadMore && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            startTransition(() => {
                                                setVisibleArchiveCount((current) => current + ARCHIVE_STEP);
                                            })
                                        }
                                        className="rounded-2xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
                                    >
                                        Yana ko&apos;rsat
                                    </button>
                                )}
                                {archiveArticles.length > visibleArchiveArticles.length && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            startTransition(() => {
                                                setVisibleArchiveCount(archiveArticles.length);
                                            })
                                        }
                                        className="rounded-2xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90"
                                    >
                                        Hammasini ko&apos;rish
                                    </button>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="rounded-[1.75rem] border border-dashed border-border p-6 text-sm text-muted-foreground">
                            Filterdan keyin barcha mos maqolalar yuqorida chiqdi, qo&apos;shimcha arxiv yo&apos;q.
                        </div>
                    )}
                </section>
            )}
        </div>
    );
}

function StatCard({
    label,
    value,
    description,
    icon,
}: {
    label: string;
    value: string;
    description: string;
    icon: ReactNode;
}) {
    return (
        <div className="rounded-[1.75rem] border border-border bg-background p-5">
            <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">{label}</p>
                <div className="rounded-full bg-muted p-2 text-foreground">{icon}</div>
            </div>
            <p className="mt-4 font-playfair text-4xl font-semibold text-foreground">{value}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
    );
}

function FilterChip({
    active,
    label,
    onClick,
}: {
    active: boolean;
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "rounded-full border px-4 py-2 text-sm transition",
                active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
        >
            {label}
        </button>
    );
}

function MetaItem({ icon, label }: { icon: ReactNode; label: string }) {
    return (
        <span className="inline-flex items-center gap-2">
            {icon}
            {label}
        </span>
    );
}

function EmptyState({ query }: { query: string }) {
    return (
        <div className="rounded-[2rem] border border-dashed border-border bg-background p-10 text-center">
            <h3 className="font-playfair text-3xl font-semibold text-foreground">Maqola topilmadi</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                {query
                    ? `“${query}” bo'yicha mos maqola topilmadi. Boshqa kalit so'z yoki kategoriyani sinab ko'ring.`
                    : "Jurnal bo'limida hozircha maqolalar yo'q."}
            </p>
        </div>
    );
}
