import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, GraduationCap, Microscope, Network, Globe } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Microscope className="w-6 h-6 text-foreground" />,
      title: "Interaktiv Laboratoriya",
      description: "Murakkab fizik va kvant jarayonlarni real vaqt rejimida vizuallashtiring va sinab ko'ring."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-foreground" />,
      title: "Raqamli Kutubxona",
      description: "Jahonning top universitetlari darsliklari va maqolalaridan iborat katta arxivga avtomatik kirish."
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-foreground" />,
      title: "Modulli Akademiya",
      description: "Kvant hisoblash, sun'iy intellekt va nanotehnologiya bo'yicha professional videodarslar."
    },
    {
      icon: <Network className="w-6 h-6 text-foreground" />,
      title: "Hamkorlik Ekotizimi",
      description: "Xalqaro olimlar, tadqiqotchilar va O'zbekistondagi yosh talabalar uchun maxsus maydon."
    }
  ];

  return (
    <div className="flex flex-col relative overflow-hidden bg-background">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[85vh] px-4 md:px-12 lg:px-20 py-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-[100px] -z-10" />

        <div className="text-center max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-sm text-foreground/80 font-medium mb-2 backdrop-blur-md shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>Markaziy Ilm-Fan Platformasi</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-playfair leading-[1.15]">
            Kvant olami va <br className="hidden md:block" />
            <span className="text-foreground/70 italic">
              kelajak chegaralari
            </span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-inter">
            O'zbekistonning markazlashgan kvant va zamonaviy ilm-fan platformasi.
            Global darajadagi ta'lim va tadqiqotlar endi o'zbek tilida, bir joyda va barchaga ochiq.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href="/academy"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-foreground text-background hover:bg-foreground/90 font-medium transition-all shadow-md flex items-center justify-center gap-2 group text-sm md:text-base"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Akademiyaga kirish</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/library"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-background hover:bg-muted border border-border text-foreground font-medium transition-all flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <BookOpen className="w-5 h-5" />
              <span>Kutubxonani ko'rish</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 md:px-12 lg:px-20 py-20 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground">Platforma Imkoniyatlari</h2>
            <p className="text-base text-muted-foreground font-inter">Har bir detal kelajakdagi katta ilmiy ishlar, ma'ruzalar va laboratoriya izlanishlari uchun hisoblab chiqilgan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="p-6 md:p-8 rounded-2xl bg-background border border-border hover:shadow-lg transition-all group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-5 group-hover:bg-foreground group-hover:text-background transition-colors">
                  {React.cloneElement(feature.icon, { className: 'w-5 h-5 transition-colors text-foreground group-hover:text-background' })}
                </div>
                <h3 className="text-lg font-playfair font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm font-inter leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access / CTA */}
      <section className="px-4 md:px-12 lg:px-20 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHYxSDB6bTAgMHY0MGgxVjB6IiBmaWxsPSJyZ2JhKDE1MCwxNTAsMTUwLDAuMSkiLz4KPC9zdmc+')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHYxSDB6bTAgMHY0MGgxVjB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+Cjwvc3ZnPg==')] opacity-50 z-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />

        <div className="relative z-10 max-w-5xl mx-auto rounded-3xl p-8 md:p-12 border border-border bg-background backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-3 md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground">Global jamiyatga qo'shiling</h2>
            <p className="text-base text-muted-foreground font-inter max-w-xl">
              Talabalar, katta ilmiy xodimlar va mustaqil izlanuvchilar uchun yaratilgan tarmoq. Har qanday vaqtda barcha ma'lumotlarga bepul va ochiq tarzda ulaning.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center md:justify-end w-full">
            <Link href="/about" className="w-full sm:w-auto px-6 py-3 rounded-xl bg-foreground text-background font-medium hover:bg-foreground/90 transition-all flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base">
              <Globe className="w-5 h-5" />
              Platforma haqida
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
