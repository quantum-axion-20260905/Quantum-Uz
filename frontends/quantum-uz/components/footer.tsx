import Link from "next/link";
import { Globe, Mail, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-background border-t border-border mt-auto">
            <div className="w-full px-4 md:px-12 lg:px-20 py-16 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center transition-transform group-hover:scale-105">
                                <span className="font-playfair font-bold">Q</span>
                            </div>
                            <span className="font-playfair font-semibold text-xl tracking-wide">
                                QuantumUz
                            </span>
                        </Link>
                        <p className="text-muted-foreground font-inter text-sm leading-relaxed mt-4">
                            O'zbekiston miqyosida ilk markazlashgan kvant va ilm-fan axborot tizimi. Biz kelajak ilmini osonroq qilamiz.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-playfair font-semibold text-foreground mb-4 text-lg">Platforma</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground font-inter">
                            <li><Link href="/library" className="hover:text-foreground transition-colors">Kutubxona</Link></li>
                            <li><Link href="/journal" className="hover:text-foreground transition-colors">Ilmiy Jurnal</Link></li>
                            <li><Link href="/academy" className="hover:text-foreground transition-colors">Akademiya (Kurslar)</Link></li>
                            <li><Link href="/laboratory" className="hover:text-foreground transition-colors">Interaktiv Laboratoriya</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-playfair font-semibold text-foreground mb-4 text-lg">Ma'lumotlar</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground font-inter">
                            <li><Link href="/about" className="hover:text-foreground transition-colors">Biz Haqimizda</Link></li>
                            <li><Link href="/about" className="hover:text-foreground transition-colors">Xalqaro Hamkorlar</Link></li>
                            <li><Link href="#" className="hover:text-foreground transition-colors">Qoidalar va Shartlar</Link></li>
                            <li><Link href="#" className="hover:text-foreground transition-colors">Maxfiylik Siyosati</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-playfair font-semibold text-foreground mb-4 text-lg">Aloqa</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground font-inter">
                            <li className="flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                <span className="hover:text-foreground cursor-pointer transition-colors">Toshkent, O'zbekiston</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span className="hover:text-foreground cursor-pointer transition-colors">Texnopark, X-Blok</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span className="hover:text-foreground cursor-pointer transition-colors">uzquantum@ilm.org</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground font-inter">
                    <p>© {new Date().getFullYear()} Global Science & Education Hub. All rights reserved.</p>
                    <p>Developed with Precision & Minimalism.</p>
                </div>
            </div>
        </footer>
    );
}
