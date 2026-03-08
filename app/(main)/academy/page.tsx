import { Sparkles, PlayCircle, Clock, BookOpen, User, Star } from "lucide-react";
import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from "@/components/ui/card";
import { YouTubePlayer } from "@/components/youtube-player";
import Link from "next/link";
import { fetchPublic } from "@/lib/api";

export const revalidate = 60;

export default async function AcademyPage() {
    let courses: any[] = [];
    try {
        const res = await fetchPublic("/api/courses/", { next: { revalidate: 60 } });
        if (res.ok) courses = await res.json();
    } catch (e) {
        console.error("Failed to fetch courses", e);
    }

    const instructors = [
        { name: "Dr. Alisher Vohidov", role: "Kvant Fizikasi", rating: "4.9", students: "2,500+" },
        { name: "Prof. Malika Karimova", role: "Sun'iy Intellekt", rating: "4.8", students: "3,100+" },
        { name: "Dr. Rustam Zoirov", role: "Materiallar Ilmi", rating: "5.0", students: "1,200+" },
    ];

    return (
        <div className="flex flex-col relative w-full overflow-hidden bg-background">
            <div className="absolute top-1/4 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-foreground/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            {/* Header section */}
            <section className="w-full px-4 md:px-12 lg:px-20 mx-auto pt-16 pb-12">
                <div className="max-w-4xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs text-foreground/80 font-medium backdrop-blur-md">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Kvant Akademiyasi</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-5xl font-playfair font-bold text-foreground leading-[1.15]">
                        Ilmiy izlanishga asoslangan <br />
                        <span className="italic text-foreground/80 text-2xl md:text-4xl lg:text-4xl text-muted-foreground font-semibold">Tugallangan modulli kurslar</span>
                    </h1>
                    <p className="text-base text-muted-foreground font-inter max-w-2xl pt-2">
                        Boshlang'ich noldan tortib to amaliyotchi mutaxassis bo'lgunga qadar, tizimli fanlar orqali o'z bilimlaringizni oshiring.
                    </p>
                </div>
            </section>

            {/* Courses Loop */}
            <section className="w-full px-4 md:px-12 lg:px-20 mx-auto pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course, idx) => {
                        let previewVideoId = "dQw4w9WgXcQ"; // Placeholder video
                        
                        return (
                            <Card key={course.id} className="overflow-hidden flex flex-col group animate-in zoom-in-95 duration-700" style={{ animationDelay: `${idx * 150}ms` }}>
                                <div className="p-4 bg-muted/30">
                                    {course.thumbnail ? (
                                        <div className="aspect-video w-full rounded-xl overflow-hidden relative">
                                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <PlayCircle className="w-12 h-12 text-white/80" />
                                            </div>
                                        </div>
                                    ) : (
                                        <YouTubePlayer videoId={previewVideoId} title={course.title} />
                                    )}
                                </div>
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded-md">
                                            {course.level_type || "Beginner"}
                                        </span>
                                        <div className="flex items-center text-muted-foreground text-xs gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{course.duration_hours || "0"} soat</span>
                                        </div>
                                    </div>
                                    <CardTitle className="text-lg md:text-xl mt-1 text-foreground font-playfair leading-tight">{course.title}</CardTitle>
                                    <CardDescription className="text-sm mt-2 text-muted-foreground font-inter line-clamp-2">{course.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1 mt-auto pb-4">
                                    <div className="flex flex-wrap gap-2">
                                        {course.tags_names && course.tags_names.map((tag: string, tid: number) => (
                                            <span key={tid} className="text-[10px] text-muted-foreground bg-background border border-border px-2 py-1 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="border-t border-border pt-4 pb-4 bg-muted/10">
                                    <div className="flex items-center gap-2 text-muted-foreground w-full justify-between">
                                        <div className="flex items-center gap-2">
                                            <User className="w-3.5 h-3.5" />
                                            <span className="text-xs font-medium">{course.instructor}</span>
                                        </div>
                                        <Link href={`#`} className="text-xs opacity-75 cursor-not-allowed text-foreground bg-background hover:bg-muted transition-colors px-3 py-1.5 rounded-lg border border-border font-medium shadow-sm">
                                            Boshlash
                                        </Link>
                                    </div>
                                </CardFooter>
                            </Card>
                        )
                    })}
                    {courses.length === 0 && (
                        <div className="col-span-full py-12 text-center text-muted-foreground">
                            Xozircha kurslar mavjud emas.
                        </div>
                    )}
                </div>
            </section>

            {/* Instructors Section */}
            <section className="w-full bg-muted/10 border-t border-border py-20">
                <div className="px-4 md:px-12 lg:px-20 mx-auto">
                    <h2 className="text-2xl md:text-3xl font-playfair font-bold text-foreground mb-10 text-center">Top Ustozlarimiz</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {instructors.map((prof, i) => (
                            <div key={i} className="flex flex-col items-center p-6 bg-background border border-border rounded-2xl hover:border-foreground/20 transition-colors text-center shadow-sm">
                                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-5 shadow-sm shadow-muted-foreground/10 border border-border relative overflow-hidden group">
                                    <User className="w-8 h-8 text-muted-foreground group-hover:scale-110 transition-transform" />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-foreground/5 to-transparent pointer-events-none" />
                                </div>
                                <h3 className="font-playfair text-lg font-bold text-foreground mb-1">{prof.name}</h3>
                                <p className="text-xs text-foreground/70 mb-4">{prof.role}</p>
                                <div className="flex items-center gap-3 text-[10px] font-inter text-muted-foreground mt-auto pt-4 border-t border-border w-full justify-center lg:text-xs">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-foreground text-foreground" />
                                        <span>{prof.rating} reyting</span>
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                                    <div>{prof.students} talaba</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
