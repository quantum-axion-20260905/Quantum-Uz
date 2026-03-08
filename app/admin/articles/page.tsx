import { fetchWithAuth } from "@/lib/api";
import ArticlesList from "./articles-list";

export const metadata = {
    title: "Maqolalar | QuantumUz Admin",
};

export default async function ArticlesPage() {
    let articles = [];
    let categories = [];
    let tags = [];

    try {
        const [articlesRes, catRes, tagRes] = await Promise.all([
            fetchWithAuth("/api/articles/", { cache: "no-store" }),
            fetchWithAuth("/api/categories/", { cache: "no-store" }),
            fetchWithAuth("/api/tags/", { cache: "no-store" }),
        ]);

        if (articlesRes.ok) articles = await articlesRes.json();
        if (catRes.ok) categories = await catRes.json();
        if (tagRes.ok) tags = await tagRes.json();
    } catch (error) {
        console.error("Error fetching article data:", error);
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Maqolalarni Boshqarish</h1>
                <p className="text-muted-foreground">Barcha ilmiy va ommabop maqolalarni ko&apos;rish, nashr qilish yoki tahrirlash.</p>
            </div>

            <ArticlesList initialArticles={articles} categories={categories} tags={tags} />
        </div>
    );
}
