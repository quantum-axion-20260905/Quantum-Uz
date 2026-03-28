import { fetchPublic } from "@/lib/api";
import JournalBrowser from "@/components/journal/journal-browser";
import { Article } from "@/lib/article-content";

export const revalidate = 60;

type CategorySummary = {
    name: string;
    count: number;
};

export default async function JournalPage() {
    let articles: Article[] = [];

    try {
        const res = await fetchPublic("/api/articles/", { next: { revalidate: 60 } });
        if (res.ok) {
            articles = ((await res.json()) as Article[]).sort((left, right) => {
                const leftTime = left.created_at ? new Date(left.created_at).getTime() : 0;
                const rightTime = right.created_at ? new Date(right.created_at).getTime() : 0;
                return rightTime - leftTime;
            });
        }
    } catch (error) {
        console.error("Failed to fetch articles", error);
    }

    const categoryMap = new Map<string, number>();

    for (const article of articles) {
        const categoryName = article.category_name || "Kategoriyasiz";
        categoryMap.set(categoryName, (categoryMap.get(categoryName) ?? 0) + 1);
    }

    const categories: CategorySummary[] = [...categoryMap.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name))
        .slice(0, 10);

    const averageReadTime = articles.length
        ? Math.round(
              articles.reduce((total, article) => total + (article.read_time_minutes || 5), 0) / articles.length,
          )
        : 0;

    return (
        <div className="relative w-full overflow-hidden bg-background">
            <div className="absolute left-1/2 top-0 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-foreground/5 blur-[120px]" />

            <section className="relative mx-auto w-full max-w-[1440px] px-4 pb-10 pt-14 md:px-12 lg:px-20">
                <div className="max-w-4xl space-y-4">
                    <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
                        QuantumUz Journal
                    </p>
                    <h1 className="font-playfair text-4xl font-semibold leading-tight text-foreground md:text-6xl">
                        Jurnal sahifasi endi qidirish, top 10 kategoriya va to&apos;liq arxiv bilan ishlaydi.
                    </h1>
                    <p className="max-w-3xl text-base leading-8 text-muted-foreground">
                        Endi bitta maqola ajratilib, qolganlari yo&apos;qolib ketmaydi. Sahifa ichida qidirish,
                        kategoriya bo&apos;yicha saralash, ko&apos;proq yuklash va barcha maqolalarni bir joyda ko&apos;rish
                        mumkin.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2 text-sm text-muted-foreground">
                        <span className="rounded-full border border-border bg-background px-4 py-2">
                            {articles.length} ta maqola
                        </span>
                        <span className="rounded-full border border-border bg-background px-4 py-2">
                            {categories.length} ta faol kategoriya
                        </span>
                        <span className="rounded-full border border-border bg-background px-4 py-2">
                            O&apos;rtacha o&apos;qish: {averageReadTime || 0} daqiqa
                        </span>
                    </div>
                </div>
            </section>

            <section className="relative mx-auto w-full max-w-[1440px] px-4 pb-24 md:px-12 lg:px-20">
                <JournalBrowser articles={articles} categories={categories} />
            </section>
        </div>
    );
}
