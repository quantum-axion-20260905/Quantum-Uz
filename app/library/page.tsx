import { LayoutGrid, List, Search, Star, BookOpen, ChevronRight, Bookmark } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function LibraryPage() {
    const categories = [
        { title: "Kvant Fizikasi", count: 120 },
        { title: "Dasturlash / Algoritmlar", count: 85 },
        { title: "Nanotexnologiyalar", count: 42 },
        { title: "Sun'iy Intellekt", count: 67 },
        { title: "Astronomiya", count: 34 },
        { title: "Kvant Kimyosi", count: 21 },
    ];

    const highlights = [
        "Niels Bohr - Atom tuzilishi nazariyasi",
        "Richard Feynman - QED: KvantElektrodinamika",
        "Albert Eynshteyn - Nisbiylik",
        "Alan Turing - Hisoblash mashinalari"
    ];

    return (
        <div className="flex flex-col relative w-full overflow-hidden bg-background">
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-foreground/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            {/* Hero Header */}
            <section className="w-full px-4 md:px-12 lg:px-20 mx-auto pt-16 pb-12">
                <div className="max-w-4xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs text-foreground/80 font-medium font-inter backdrop-blur-md">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Elektron Kutubxona</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-5xl font-playfair font-bold text-foreground leading-[1.15]">
                        Noyob asarlar va <br />
                        <span className="italic text-foreground/80 text-muted-foreground w-full block mt-2 text-2xl md:text-3xl lg:text-4xl">ilmiy darsliklar markazi</span>
                    </h1>
                    <p className="text-base text-muted-foreground font-inter max-w-2xl pt-2">
                        Jahon andozalaridagi eng sara ilmiy kitoblar va tadqiqotlar elektron arxivi.
                    </p>
                </div>
            </section>

            {/* Bestsellers Row / Highlight Carousel */}
            <section className="w-full px-4 md:px-12 lg:px-20 mx-auto pb-12">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                    {highlights.map((h, i) => (
                        <div key={i} className="min-w-[280px] md:min-w-[320px] p-5 rounded-2xl bg-foreground text-background flex flex-col justify-between shrink-0 snap-start relative overflow-hidden group cursor-pointer shadow-md hover:shadow-lg transition-shadow border border-foreground">
                            <div className="absolute top-0 right-0 p-3 opacity-50 group-hover:scale-110 transition-transform">
                                <Bookmark className="w-8 h-8" />
                            </div>
                            <div className="mb-6">
                                <span className="text-[10px] uppercase tracking-widest bg-background/20 font-semibold px-2 py-1 rounded">Klassik Asar</span>
                            </div>
                            <div>
                                <h3 className="font-playfair text-lg md:text-xl font-bold leading-tight line-clamp-2">{h}</h3>
                                <p className="mt-2 text-xs text-background/70 font-inter">Global bestseller to'plamdan</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Main Content Area */}
            <section className="w-full px-4 md:px-12 lg:px-20 mx-auto pb-20">

                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8 border-b border-border pb-6">
                    <h2 className="text-2xl font-playfair font-semibold text-foreground">Barcha Kategoriyalar</h2>

                    <div className="relative w-full md:w-80 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-9 pr-3 py-2.5 border border-border rounded-lg leading-5 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground text-sm shadow-sm transition-all font-inter"
                            placeholder="Kitob yoki muallif..."
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-10">

                    {/* Sidebar Categories */}
                    <div className="md:col-span-1 border-r border-border pr-5 hidden md:block">
                        <h3 className="font-playfair text-base font-bold text-foreground mb-4">Mavzular</h3>
                        <ul className="space-y-3 font-inter text-xs">
                            {categories.map(c => (
                                <li key={c.title} className="flex items-center justify-between text-muted-foreground hover:text-foreground cursor-pointer transition-colors group">
                                    <span className="font-medium mr-2">{c.title}</span>
                                    <span className="text-[10px] bg-muted/50 px-1.5 py-0.5 rounded border border-border/50">{c.count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Books Grid */}
                    <div className="md:col-span-3 lg:col-span-4 space-y-5">
                        <div className="flex items-center justify-between bg-muted/20 px-3 py-2 rounded-lg mb-4 border border-border shadow-sm">
                            <span className="text-xs font-inter text-muted-foreground">Eng ko'p o'qilganlar, Yangilar...</span>
                            <div className="flex items-center gap-1 border border-border rounded p-0.5 bg-background">
                                <button className="p-1 rounded bg-muted text-foreground"><LayoutGrid className="w-3.5 h-3.5" /></button>
                                <button className="p-1 rounded hover:bg-muted text-muted-foreground transition-colors"><List className="w-3.5 h-3.5" /></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                                <Card key={item} className="flex flex-col group cursor-pointer hover:border-foreground/30 transition-all hover:bg-muted/10 h-full rounded-xl overflow-hidden shadow-none border-border">
                                    <Link href={`/library/book-${item}`} className="flex-1 flex flex-col h-full">
                                        <div className="aspect-[3/4] p-4 flex flex-col items-center justify-center bg-muted/30 relative overflow-hidden backdrop-blur-md shrink-0 border-b border-border/50">
                                            <div className="w-2/3 h-5/6 bg-gradient-to-tr from-foreground/80 to-muted-foreground rounded-md flex items-center justify-center border border-border shadow-md transform group-hover:scale-105 transition-transform duration-500 group-hover:-rotate-3">
                                                <BookOpen className="w-8 h-8 text-background/50 mix-blend-difference" />
                                            </div>
                                        </div>
                                        <CardHeader className="flex-1 p-3 pb-2 bg-transparent">
                                            <h3 className="font-playfair font-bold text-sm md:text-base text-foreground group-hover:text-foreground/80 transition-colors line-clamp-2 leading-tight">
                                                Xatoliksiz Hisoblash Kitobi
                                            </h3>
                                            <p className="font-inter text-[10px] md:text-xs text-foreground/60 mt-1 font-medium">Asosiy Muallif</p>
                                        </CardHeader>
                                        <CardContent className="p-3 pt-0 mt-auto bg-transparent">
                                            <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/50">
                                                <div className="flex items-center gap-1 text-foreground">
                                                    <Star className="w-3 h-3 fill-foreground text-foreground" />
                                                    <span className="text-[10px] font-semibold">4.8</span>
                                                </div>
                                                <span className="text-muted-foreground text-[10px] md:text-xs font-medium bg-background px-1.5 py-0.5 rounded border border-border">PDF</span>
                                            </div>
                                            <button className="w-full flex justify-center items-center gap-1.5 py-1.5 text-[10px] md:text-xs font-semibold rounded text-background bg-foreground hover:bg-foreground/90 transition-colors">
                                                O'qish <ChevronRight className="w-3 h-3" />
                                            </button>
                                        </CardContent>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
