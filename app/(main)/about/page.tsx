import Link from "next/link";
import { Globe, Users, Trophy, Network, Mail, ArrowRight, BookOpen, Star } from "lucide-react";

export default function AboutPage() {
    const stats = [
        { label: "Faol a'zolar", value: "10,000+", icon: <Users className="w-6 h-6 text-foreground" /> },
        { label: "Ilmiy maqolalar", value: "500+", icon: <Trophy className="w-6 h-6 text-foreground" /> },
        { label: "Xorijiy institutlar", value: "25+", icon: <Network className="w-6 h-6 text-foreground" /> },
        { label: "O'quv materiallari", value: "1,200+", icon: <BookOpen className="w-6 h-6 text-foreground" /> },
    ];

    const partners = [
        "MIT", "Oxford", "Harvard", "Cambridge", "Stanford", "Caltech",
        "Max Planck Institute", "CERN", "JAXA", "NASA"
    ];

    return (
        <div className="flex flex-col relative w-full overflow-hidden bg-background">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-foreground/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            {/* Hero Section w-full */}
            <section className="w-full px-4 md:px-12 lg:px-20 mx-auto pt-16 pb-20 border-b border-border">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

                    <div className="lg:w-1/2 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs text-foreground/80 font-medium font-inter backdrop-blur-md shadow-sm">
                            <Globe className="w-3.5 h-3.5" />
                            <span>Global platforma</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-5xl font-playfair font-bold text-foreground leading-[1.15]">
                            Ilm-fanda <br />
                            <span className="italic text-muted-foreground w-full block mt-2 text-2xl md:text-4xl lg:text-4xl">chegarasiz integratsiya</span>
                        </h1>

                        <p className="text-base text-muted-foreground font-inter leading-relaxed max-w-xl bg-muted/20 p-4 rounded-xl border-l-[3px] border-foreground">
                            QuantumUz loyihasining asosi — yosh tadqiqotchilar va olimlar uchun markazlashgan, bepul va xolis axborot resurs tizimini yaratishdir. Maqsadimiz xalqaro nufuzli axborot markazlari bilan integratsiyalashgan holda O'zbekistonning ilmiy salohiyatini global platformaga chiqarish.
                        </p>

                        <button className="px-6 py-3 rounded-xl bg-foreground hover:bg-foreground/90 text-background font-medium transition-all flex items-center justify-center gap-2 w-full sm:w-auto text-sm md:text-base">
                            <Mail className="w-4 h-4" />
                            <span>Hamkorlik o'rnatish</span>
                            <ArrowRight className="w-4 h-4 transition-transform ml-1 group-hover:translate-x-1" />
                        </button>
                    </div>

                    <div className="lg:w-1/2 w-full aspect-square md:aspect-video lg:aspect-square max-w-[450px] rounded-[2rem] bg-muted/20 border border-border flex items-center justify-center relative shadow-lg overflow-hidden group animate-in zoom-in-95 duration-700">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(150,150,150,0.1)_0%,transparent_100%)] opacity-50 block dark:hidden" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)] opacity-50 hidden dark:block" />

                        <div className="absolute top-4 left-4 w-16 h-16 border border-foreground/10 rounded-full animate-[spin_10s_linear_infinite]" />
                        <div className="absolute bottom-4 right-4 w-24 h-24 border border-foreground/10 rounded-full animate-[spin_15s_linear_infinite]" />

                        <Globe className="w-32 h-32 lg:w-48 lg:h-48 text-foreground/40 group-hover:scale-105 transition-transform duration-1000 animate-[spin_40s_linear_infinite]" />

                        <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-foreground rounded-full drop-shadow-md animate-pulse" />
                        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-muted-foreground rounded-full shadow-sm animate-[pulse_2s_infinite]" />
                    </div>
                </div>
            </section>

            {/* Stats Section w-full */}
            <section className="w-full bg-muted/10 py-20 px-4 md:px-12 lg:px-20 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-2xl lg:text-3xl font-playfair font-bold text-foreground mb-3">Metrikalar va raqamlar</h2>
                    <p className="text-muted-foreground font-inter text-sm md:text-base">Kundan kunga o'sib borayotgan ilmiy hamjamiyat platformasi.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-center group cursor-default">
                            <div className="w-14 h-14 rounded-xl bg-muted/50 group-hover:bg-foreground group-hover:text-background flex items-center justify-center mb-5 border border-border transition-colors">
                                {stat.icon}
                            </div>
                            <div className="text-2xl md:text-3xl font-playfair font-bold text-foreground mb-1 group-hover:scale-105 transition-transform">{stat.value}</div>
                            <div className="font-inter text-muted-foreground font-medium uppercase tracking-wider text-[10px] md:text-xs">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Global Partners Carousel / Grid w-full */}
            <section className="w-full px-4 md:px-12 lg:px-20 mx-auto pb-24 text-center">
                <div className="max-w-2xl mx-auto mb-12 space-y-4">
                    <div className="w-12 h-1 mx-auto bg-foreground/20 rounded-full" />
                    <h2 className="text-2xl lg:text-4xl font-playfair font-bold text-foreground">Ilmiy hamkorlar</h2>
                    <p className="font-inter text-base text-muted-foreground">
                        Jahonning top universitetlari, xalqaro tadqiqot markazlari tahliliy va axborot bazasi bilan to'g'ridan to'g'ri bog'liqlik.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 lg:gap-6 items-center cursor-default max-w-4xl mx-auto">
                    {partners.map((partner, i) => (
                        <div key={i} className="px-6 py-3 rounded-xl bg-muted/40 border border-border/50 text-foreground/70 font-playfair text-lg lg:text-xl tracking-wide hover:text-foreground hover:bg-background hover:border-foreground/20 hover:shadow-md transition-all">
                            {partner}
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-6 md:p-8 rounded-2xl bg-foreground text-background max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-left shadow-xl relative overflow-hidden group hover:scale-[1.01] transition-transform">
                    <div className="absolute inset-0 bg-background/5 -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out" />
                    <div className="md:w-2/3 relative z-10">
                        <div className="flex items-center gap-2 mb-2 text-background/80 font-inter text-xs font-semibold uppercase tracking-wider">
                            <Star className="w-3.5 h-3.5" /> Kelajak avlod uchun
                        </div>
                        <h3 className="text-2xl font-playfair font-bold leading-tight">Ta'lim siyosatini <br className="hidden md:block" /> birgalikda o'zgartiramiz</h3>
                    </div>
                    <div className="md:w-1/3 relative z-10 w-full">
                        <button className="w-full py-3 px-5 bg-background text-foreground text-sm font-semibold rounded-lg hover:bg-muted transition-colors flex justify-center gap-2">
                            Xomiylik va grantlar <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
