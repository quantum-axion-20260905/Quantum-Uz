"use client";

import Link from "next/link";
import { BookOpen, GraduationCap, FlaskConical, Newspaper, Globe, Home, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { name: "Asosiy", href: "/", icon: <Home className="w-4 h-4" /> },
    { name: "Kutubxona", href: "/library", icon: <BookOpen className="w-4 h-4" /> },
    { name: "Ilmiy Jurnal", href: "/journal", icon: <Newspaper className="w-4 h-4" /> },
    { name: "Akademiya", href: "/academy", icon: <GraduationCap className="w-4 h-4" /> },
    { name: "Laboratoriya", href: "/laboratory", icon: <FlaskConical className="w-4 h-4" /> },
    { name: "Hamkorlik", href: "/about", icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel rounded-none border-x-0 border-t-0 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="w-full px-4 md:px-12 lg:px-20 mx-auto flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="font-playfair font-bold">Q</span>
          </div>
          <span className="font-playfair font-semibold text-lg hidden sm:block tracking-wide">
            QuantumUz
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={false}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              <span className="hidden lg:block">{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          ))}

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 ml-4 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="h-5 w-5 hidden dark:block" />
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>

        {/* Mobile menu simple */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="h-5 w-5 hidden dark:block" />
          </button>
          <span className="font-playfair font-semibold text-sm">Menu</span>
        </div>
      </div>
    </nav>
  );
}
