"use client";

import { useState, useRef } from "react";
import { Search, Plus, Edit2, Trash2, X, Image as ImageIcon, UploadCloud, AtSign, FileText, Tag, Book } from "lucide-react";
import { createBook, updateBook, deleteBook } from "./actions";
import { getMediaUrl } from "@/lib/api";

type CategoryType = { id: number; name: string };
type TagType = { id: number; name: string };

type BookType = {
    id: number;
    title: string;
    slug?: string;
    author: string;
    category: number | null;
    category_name?: string;
    tags: number[];
    tags_names?: string[];
    is_published: boolean;
    cover_image?: string | null;
    pdf_file?: string | null;
    description: string;
    download_count: number;
};

export default function BooksList({
    initialBooks,
    categories,
    tags
}: {
    initialBooks: BookType[];
    categories: CategoryType[];
    tags: TagType[];
}) {
    const [books, setBooks] = useState<BookType[]>(initialBooks);
    const [search, setSearch] = useState("");

    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<BookType | null>(null);

    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

    const [loading, setLoading] = useState(false);
    const [errorMSG, setErrorMSG] = useState("");

    // Form inputs state for better UI control
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [pdfFileName, setPdfFileName] = useState<string | null>(null);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);

    const coverInputRef = useRef<HTMLInputElement>(null);
    const pdfInputRef = useRef<HTMLInputElement>(null);

    const filteredBooks = books.filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        (b.author && b.author.toLowerCase().includes(search.toLowerCase()))
    );

    const openCreatePanel = () => {
        setEditingBook(null);
        setErrorMSG("");
        setPreviewImage(null);
        setPdfFileName(null);
        setSelectedTags([]);
        setIsPanelOpen(true);
    };

    const openEditPanel = (book: BookType) => {
        setEditingBook(book);
        setErrorMSG("");
        setPreviewImage(book.cover_image || null);
        setPdfFileName(book.pdf_file ? "Mavjud fayl yuklangan" : null);
        setSelectedTags(book.tags || []);
        setIsPanelOpen(true);
    };

    const handleDelete = async (id: number) => {
        setLoading(true);
        const res = await deleteBook(id);
        if (res?.error) {
            alert("Xatolik: " + res.error);
        } else {
            setBooks(books.filter(b => b.id !== id));
            setDeleteConfirmId(null);
        }
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMSG("");

        const formData = new FormData(e.currentTarget);
        formData.set("is_published", formData.get("is_published") ? "1" : "0");

        formData.delete("tags");
        selectedTags.forEach(tagId => {
            formData.append("tags", tagId.toString());
        });

        if (!formData.get("category")) {
            formData.delete("category");
        }

        const coverInput = formData.get("cover_image") as File;
        if (coverInput && coverInput.size === 0) {
            formData.delete("cover_image");
        }

        const pdfInput = formData.get("pdf_file") as File;
        if (pdfInput && pdfInput.size === 0) {
            formData.delete("pdf_file");
        }

        let res;
        if (editingBook) {
            res = await updateBook(editingBook.id, formData);
        } else {
            res = await createBook(formData);
        }

        if (res?.error) {
            setErrorMSG(res.error);
            setLoading(false);
            return;
        }

        window.location.reload();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(editingBook?.cover_image || null);
        }
    };

    const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPdfFileName(file.name);
        } else {
            setPdfFileName(editingBook?.pdf_file ? "Mavjud fayl yuklangan" : null);
        }
    };

    const toggleTag = (tagId: number) => {
        setSelectedTags(prev =>
            prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
        );
    };

    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card/60 border border-border/50 p-6 rounded-2xl shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Elektron Kutubxona</h1>
                    <p className="text-sm text-muted-foreground mt-1">Noyob ilmiy adabiyotlar va qo&apos;llanmalar bazasi boshqaruvi.</p>
                </div>
                <button
                    onClick={openCreatePanel}
                    className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-200 bg-primary border border-transparent rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
                    <span>Yangi Kitob</span>
                </button>
            </div>

            {/* List Area */}
            <div className="bg-card/40 rounded-2xl border border-border/50 shadow-sm flex flex-col overflow-hidden">
                <div className="p-4 border-b border-border/50 bg-muted/20">
                    <div className="relative w-full sm:max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Kitob nomi yoki muallif..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-background/50 border border-border/50 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground shadow-sm placeholder:text-muted-foreground/70"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto w-full">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border/50">
                            <tr>
                                <th className="px-6 py-4 font-semibold tracking-wider">Kitob Nomi</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Turkum</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Muallif</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Statistika</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Holati</th>
                                <th className="px-6 py-4 font-semibold tracking-wider text-right">Amallar</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {filteredBooks.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
                                                <Search className="w-6 h-6 text-muted-foreground/50" />
                                            </div>
                                            <p>Kitoblar topilmadi.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredBooks.map((book) => (
                                <tr key={book.id} className="hover:bg-muted/30 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            {book.cover_image ? (
                                                <div className="w-10 h-14 rounded-md overflow-hidden flex-shrink-0 bg-muted border shadow-sm group-hover:shadow-md transition-shadow">
                                                    <img src={getMediaUrl(book.cover_image)} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                </div>
                                            ) : (
                                                <div className="w-10 h-14 rounded-md bg-muted/50 flex-shrink-0 flex items-center justify-center text-muted-foreground border shadow-sm">
                                                    <Book className="w-5 h-5 opacity-50" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-semibold text-foreground text-base tracking-tight max-w-[280px] line-clamp-2">{book.title}</p>
                                                {book.pdf_file && (
                                                    <a href={book.pdf_file} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 mt-1 text-xs text-blue-500 hover:text-blue-600 font-medium group/link w-fit">
                                                        <FileText className="w-3 h-3 group-hover/link:animate-pulse" />
                                                        <span>PDF</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-sm">
                                        <div className="flex items-center gap-1.5 font-medium text-foreground bg-primary/5 px-2.5 py-1 rounded-md w-fit border border-primary/10">
                                            <Tag className="w-3.5 h-3.5 text-primary/70" /> 
                                            {book.category_name || "Kategoriyasiz"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-muted-foreground font-medium">
                                        <div className="flex items-center gap-1.5">
                                            <AtSign className="w-3.5 h-3.5 opacity-50" />
                                            {book.author || "Noma'lum"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-1 text-sm font-medium">
                                            <span className="text-foreground">{book.download_count || 0} <span className="text-xs text-muted-foreground font-normal">yuklash</span></span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        {book.is_published ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                                <span className="text-sm font-medium text-foreground">Ochiq</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-destructive/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                                                <span className="text-sm font-medium text-destructive">Yopiq</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 outline-none">
                                            {deleteConfirmId === book.id ? (
                                                <div className="flex items-center gap-1.5 bg-destructive/10 border border-destructive/20 rounded-xl p-1.5 animate-in slide-in-from-right-4">
                                                    <button onClick={() => handleDelete(book.id)} disabled={loading} className="px-3 py-1.5 text-xs font-bold bg-destructive text-white hover:bg-destructive/90 rounded-lg shadow-sm transition-colors">Tasdiq</button>
                                                    <button onClick={() => setDeleteConfirmId(null)} className="px-3 py-1.5 text-xs font-medium bg-background text-foreground hover:bg-muted border border-border/50 rounded-lg shadow-sm transition-colors">Bekor</button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1 bg-background/50 border rounded-xl p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => openEditPanel(book)}
                                                        className="p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
                                                        title="Tahrirlash"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <div className="w-px h-4 bg-border/50"></div>
                                                    <button
                                                        onClick={() => setDeleteConfirmId(book.id)}
                                                        className="p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-destructive/30"
                                                        title="O'chirish"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Create/Edit */}
            {isPanelOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
                        onClick={() => setIsPanelOpen(false)}
                    ></div>

                    {/* Panel */}
                    <div className="relative w-full max-w-5xl bg-card border border-white/10 shadow-2xl flex flex-col max-h-[92vh] rounded-3xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-gradient-to-r from-primary/10 via-transparent to-primary/5">
                            <div>
                                <h2 className="text-xl font-bold text-foreground">
                                    {editingBook ? "Kitobni Tahrirlash" : "Yangi Kitob Qo&apos;shish"}
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1">Kutubxonaga yangi nashrni kiritish va sozlash</p>
                            </div>
                            <button
                                onClick={() => setIsPanelOpen(false)}
                                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                            {errorMSG && (
                                <div className="p-4 mb-6 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium flex items-center gap-3 animate-in shake">
                                    <div className="p-1 rounded-full bg-destructive/20 text-destructive"><X className="w-4 h-4" /></div>
                                    {errorMSG}
                                </div>
                            )}

                            <form id="book-form" onSubmit={handleSubmit} className="space-y-8">
                                {/* Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5 md:col-span-2">
                                        <label className="text-sm font-semibold text-foreground">Kitob Nomi <span className="text-destructive">*</span></label>
                                        <input required defaultValue={editingBook?.title} name="title" className="w-full px-3 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground" placeholder="Oliy Matematika 1-qism..." />
                                    </div>
                                    
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-foreground">Muallif <span className="text-destructive">*</span></label>
                                        <input required defaultValue={editingBook?.author} name="author" className="w-full px-3 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground" placeholder="Ism Familiya" />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-foreground">Kategoriya</label>
                                        <select defaultValue={editingBook?.category || ""} name="category" className="w-full px-3 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                                            <option value="">Tanlamaslik...</option>
                                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                                            Elektron nusxa (PDF)
                                        </label>
                                        <div 
                                            onClick={() => pdfInputRef.current?.click()}
                                            className="relative group border-2 border-dashed border-border/60 rounded-xl hover:border-primary/50 transition-colors cursor-pointer overflow-hidden bg-muted/10 h-[52px] flex items-center"
                                        >
                                            <input 
                                                ref={pdfInputRef}
                                                type="file" 
                                                name="pdf_file" 
                                                accept=".pdf" 
                                                onChange={handlePdfChange}
                                                className="hidden" 
                                            />
                                            {pdfFileName ? (
                                                <div className="flex items-center gap-3 px-3 w-full">
                                                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                                                        <FileText className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-sm font-medium text-foreground truncate flex-1">{pdfFileName}</span>
                                                    <button type="button" className="text-xs text-primary font-bold px-2 py-1 bg-primary/10 rounded">O&apos;zgartirish</button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center gap-2 w-full text-muted-foreground group-hover:text-primary transition-colors">
                                                    <UploadCloud className="w-4 h-4" />
                                                    <span className="text-sm font-medium">PDF yuklash</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                                            Muqova Rasmi
                                        </label>
                                        <div 
                                            onClick={() => coverInputRef.current?.click()}
                                            className="relative group border-2 border-dashed border-border/60 rounded-xl hover:border-primary/50 transition-colors cursor-pointer overflow-hidden bg-muted/10 h-[52px] flex items-center"
                                        >
                                            <input 
                                                ref={coverInputRef}
                                                type="file" 
                                                name="cover_image" 
                                                accept="image/*" 
                                                onChange={handleImageChange}
                                                className="hidden" 
                                            />
                                            {previewImage ? (
                                                <div className="flex items-center gap-3 px-3 w-full">
                                                    <img src={getMediaUrl(previewImage)} alt="Preview" className="w-8 h-8 rounded object-cover" />

                                                    <span className="text-sm font-medium text-foreground truncate flex-1">Rasm yuklandi</span>
                                                    <button type="button" className="text-xs text-primary font-bold px-2 py-1 bg-primary/10 rounded">O&apos;zgartirish</button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center gap-2 w-full text-muted-foreground group-hover:text-primary transition-colors">
                                                    <ImageIcon className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Rasmni yuklang</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-3 md:col-span-2">
                                        <label className="text-sm font-semibold flex items-center gap-2">
                                            <Tag className="w-4 h-4 text-primary/70" />
                                            Teglar (Tags)
                                        </label>
                                        <div className="flex flex-wrap gap-2 p-4 rounded-xl border bg-muted/10 min-h-[80px]">
                                            {tags.map(tag => {
                                                const isSelected = selectedTags.includes(tag.id);
                                                return (
                                                    <button
                                                        key={tag.id}
                                                        type="button"
                                                        onClick={() => toggleTag(tag.id)}
                                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                                            isSelected 
                                                                ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20 scale-105" 
                                                                : "bg-background border hover:border-primary/50 hover:bg-muted text-muted-foreground"
                                                        }`}
                                                    >
                                                        {tag.name}
                                                    </button>
                                                );
                                            })}
                                            {tags.length === 0 && <p className="text-sm text-muted-foreground my-auto italic">Teglar mavjud emas.</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 md:col-span-2">
                                        <label className="text-sm font-semibold text-foreground">Tavsifi (Description) <span className="text-destructive">*</span></label>
                                        <textarea required defaultValue={editingBook?.description} name="description" rows={6} className="w-full px-3 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-y transition-all placeholder:text-muted-foreground" placeholder="Kitobning tarkibi va asosiy tushunchalari..." />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border bg-muted/20 max-w-sm">
                                    <label className="relative flex items-center gap-3 cursor-pointer group flex-1">
                                        <div className="flex items-center justify-center">
                                            <input type="checkbox" defaultChecked={editingBook ? editingBook.is_published : true} name="is_published" className="peer sr-only" />
                                            <div className="w-10 h-5 bg-muted-foreground/30 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-foreground">Ommaga e&apos;lon qilish</span>
                                            <span className="text-xs text-muted-foreground">Kutubxonada darhol ko&apos;rinadi</span>
                                        </div>
                                    </label>
                                </div>

                                <div className="h-4"></div>
                            </form>
                        </div>

                        {/* Footer / Actions */}
                        <div className="p-5 border-t border-white/10 bg-muted/20 flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setIsPanelOpen(false)}
                                className="flex-1 px-4 py-2.5 rounded-lg border bg-background hover:bg-muted font-medium text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                Bekor qilish
                            </button>
                            <button
                                type="submit"
                                form="book-form"
                                disabled={loading}
                                className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:pointer-events-none"
                            >
                                {loading ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></span>
                                        <span>Saqlanmoqda...</span>
                                    </>
                                ) : (
                                    <span>{editingBook ? "Saqlash" : "Yaratish"}</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
