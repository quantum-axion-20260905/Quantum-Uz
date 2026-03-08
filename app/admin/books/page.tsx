import { fetchWithAuth } from "@/lib/api";
import BooksList from "./books-list";

export const metadata = {
    title: "Kitoblar | QuantumUz Admin",
};

export default async function BooksPage() {
    let books = [];
    let categories = [];
    let tags = [];

    try {
        const [booksRes, catRes, tagRes] = await Promise.all([
            fetchWithAuth("/api/books/", { cache: "no-store" }),
            fetchWithAuth("/api/categories/", { cache: "no-store" }),
            fetchWithAuth("/api/tags/", { cache: "no-store" }),
        ]);

        if (booksRes.ok) books = await booksRes.json();
        if (catRes.ok) categories = await catRes.json();
        if (tagRes.ok) tags = await tagRes.json();
    } catch (error) {
        console.error("Error fetching book data:", error);
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Kutubxonani Boshqarish</h1>
                <p className="text-muted-foreground">Kutubxonadagi barcha PDF kitoblarni ko&apos;rish, yuklash yoki tahrirlash.</p>
            </div>

            <BooksList initialBooks={books} categories={categories} tags={tags} />
        </div>
    );
}
