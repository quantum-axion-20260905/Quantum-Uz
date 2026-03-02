import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Star, Download, Bookmark, Share2 } from "lucide-react";

export default function BookDetailPage({ params }: { params: { id: string } }) {
    // In a real app, you would fetch data using params.id

    return (
        <div className="flex flex-col relative w-full overflow-hidden bg-background min-h-screen">
            <div className="w-full px-4 md:px-12 lg:px-20 mx-auto py-12">
                <Link href="/library" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> Kutubxonaga qaytish
                </Link>

                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    {/* Left Cover Image */}
                    <div className="w-full lg:w-1/3 xl:w-1/4 shrink-0">
                        <div className="w-full aspect-[3/4] rounded-2xl bg-muted/30 border border-border flex items-center justify-center relative overflow-hidden shadow-lg group">
                            <div className="w-3/4 h-5/6 bg-gradient-to-tr from-foreground/80 to-muted-foreground rounded-lg flex items-center justify-center border border-border shadow-md">
                                <BookOpen className="w-12 h-12 text-background/50 mix-blend-difference" />
                            </div>
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform">
                                <div className="flex justify-center gap-4">
                                    <button className="p-3 bg-background border border-border rounded-full hover:bg-muted text-foreground transition-colors"><Bookmark className="w-4 h-4" /></button>
                                    <button className="p-3 bg-background border border-border rounded-full hover:bg-muted text-foreground transition-colors"><Share2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Details */}
                    <div className="w-full lg:w-2/3 xl:w-3/4 space-y-6">
                        <div className="space-y-3">
                            <div className="flex gap-2 items-center">
                                <span className="text-[10px] uppercase tracking-widest bg-foreground text-background font-semibold px-2 py-1 rounded">Kvant Fizika</span>
                                <span className="text-[10px] uppercase tracking-widest bg-muted text-foreground border border-border font-semibold px-2 py-1 rounded">Darslik</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-playfair font-bold text-foreground leading-[1.15]">
                                Xatoliksiz Hisoblash: <br className="hidden md:block" />
                                <span className="text-muted-foreground italic">Nazariyadan tortib to amaliyotgacha</span>
                            </h1>
                            <p className="font-inter text-foreground/80 text-sm md:text-base font-medium">Asosiy Muallif: Dr. Alisher Vohidov</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 md:gap-8 pb-6 border-b border-border text-sm text-muted-foreground font-inter">
                            <div className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-foreground text-foreground" /> 4.8 / 5.0 (120 sharh)</div>
                            <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 2023-yil Nashr</div>
                            <div className="px-2 py-1 bg-background border border-border rounded text-xs font-semibold">PDF format, 15 MB</div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-playfair font-bold text-foreground">Kitob haqida</h3>
                            <p className="font-inter text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
                                Ushbu kitobda kvant hisoblash faniga oid zamonaviy arxitekturalar o'zbek tilida mantiqiy tarzda tushuntirilgan. Fundamental kubit mantiqlaridan tortib to xatoliklarni tuzatish (quantum error correction) jarayonlarigacha to'liq qamrab olingan. Har bir bo'lim oxirida laboratoriya ishlari mavjud.
                            </p>
                        </div>

                        <div className="pt-6 flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-3 bg-foreground text-background font-semibold rounded-xl shadow-md hover:bg-foreground/90 transition-colors flex justify-center items-center gap-2">
                                <BookOpen className="w-4 h-4" /> Kitobni o'qish (Online)
                            </button>
                            <button className="px-8 py-3 bg-background border border-border text-foreground font-semibold rounded-xl hover:bg-muted transition-colors flex justify-center items-center gap-2">
                                <Download className="w-4 h-4" /> Yuklab olish (.pdf)
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
