"use client";

import { useState, useRef } from "react";
import { Search, Plus, Edit2, Trash2, X, Image as ImageIcon, UploadCloud, BookOpen, Clock, Tag, Award } from "lucide-react";
import { createCourse, updateCourse, deleteCourse } from "./actions";

type CategoryType = { id: number; name: string };
type TagType = { id: number; name: string };

type CourseType = {
    id: number;
    title: string;
    slug?: string;
    instructor: string;
    price: string;
    is_free: boolean;
    level_type: string;
    duration_hours?: string;
    category: number | null;
    category_name?: string;
    tags: number[];
    tags_names?: string[];
    is_published: boolean;
    thumbnail?: string | null;
    description: string;
};

export default function CoursesList({
    initialCourses,
    categories,
    tags
}: {
    initialCourses: CourseType[];
    categories: CategoryType[];
    tags: TagType[];
}) {
    const [courses, setCourses] = useState<CourseType[]>(initialCourses);
    const [search, setSearch] = useState("");

    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<CourseType | null>(null);

    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

    const [loading, setLoading] = useState(false);
    const [errorMSG, setErrorMSG] = useState("");

    // Form inputs state for better UI control
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const filteredCourses = courses.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.instructor.toLowerCase().includes(search.toLowerCase())
    );

    const openCreatePanel = () => {
        setEditingCourse(null);
        setErrorMSG("");
        setPreviewImage(null);
        setSelectedTags([]);
        setIsPanelOpen(true);
    };

    const openEditPanel = (course: CourseType) => {
        setEditingCourse(course);
        setErrorMSG("");
        setPreviewImage(course.thumbnail || null);
        setSelectedTags(course.tags || []);
        setIsPanelOpen(true);
    };

    const handleDelete = async (id: number) => {
        setLoading(true);
        const res = await deleteCourse(id);
        if (res?.error) {
            alert("Xatolik: " + res.error);
        } else {
            setCourses(courses.filter(c => c.id !== id));
            setDeleteConfirmId(null);
        }
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMSG("");

        const formData = new FormData(e.currentTarget);

        formData.set("is_free", formData.get("is_free") ? "1" : "0");
        formData.set("is_published", formData.get("is_published") ? "1" : "0");

        // Clear existing tags in formData and append the ones from our state
        formData.delete("tags");
        selectedTags.forEach(tagId => {
            formData.append("tags", tagId.toString());
        });

        if (!formData.get("category")) {
            formData.delete("category");
        }

        const thumbnailInput = formData.get("thumbnail") as File;
        if (thumbnailInput && thumbnailInput.size === 0) {
            formData.delete("thumbnail");
        }

        let res;
        if (editingCourse) {
            res = await updateCourse(editingCourse.id, formData);
        } else {
            res = await createCourse(formData);
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
            setPreviewImage(editingCourse?.thumbnail || null);
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
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Kurslar Boshqaruvi</h1>
                    <p className="text-sm text-muted-foreground mt-1">Platformadagi barcha kurslarni ko&apos;rish, tahrirlash va yangi qo&apos;shish.</p>
                </div>
                <button
                    onClick={openCreatePanel}
                    className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-200 bg-primary border border-transparent rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
                    <span>Yangi Kurs</span>
                </button>
            </div>

            {/* List Area */}
            <div className="bg-card/40 rounded-2xl border border-border/50 shadow-sm flex flex-col overflow-hidden">
                <div className="p-4 border-b border-border/50 bg-muted/20">
                    <div className="relative w-full sm:max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Kurs nomi yoki o'qituvchi bo'yicha qidiruv..."
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
                                <th className="px-6 py-4 font-semibold tracking-wider">Kurs Nomi</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Turkum / Daraja</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">O&apos;qituvchi</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Narxi</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Holati</th>
                                <th className="px-6 py-4 font-semibold tracking-wider text-right">Amallar</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {filteredCourses.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
                                                <Search className="w-6 h-6 text-muted-foreground/50" />
                                            </div>
                                            <p>Kurslar topilmadi.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredCourses.map((course) => (
                                <tr key={course.id} className="hover:bg-muted/30 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            {course.thumbnail ? (
                                                <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted border shadow-sm group-hover:shadow-md transition-shadow">
                                                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                </div>
                                            ) : (
                                                <div className="w-16 h-12 rounded-lg bg-muted/50 flex-shrink-0 flex items-center justify-center text-muted-foreground border shadow-sm">
                                                    <ImageIcon className="w-5 h-5 opacity-50" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-semibold text-foreground text-base tracking-tight truncate max-w-[250px]">{course.title}</p>
                                                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration_hours} soat</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-sm">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-foreground font-medium flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-primary/70" /> {course.category_name || "Kategoriyasiz"}</span>
                                            <span className="text-muted-foreground text-xs flex items-center gap-1.5"><Award className="w-3.5 h-3.5" /> {course.level_type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-muted-foreground font-medium">
                                        {course.instructor}
                                    </td>
                                    <td className="px-6 py-5">
                                        {course.is_free ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                                Bepul
                                            </span>
                                        ) : (
                                            <span className="font-semibold text-foreground tracking-tight">{course.price} <span className="text-xs text-muted-foreground font-normal">UZS</span></span>
                                        )}
                                    </td>
                                    <td className="px-6 py-5">
                                        {course.is_published ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                                <span className="text-sm font-medium text-foreground">Aktiv</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-muted-foreground/50"></div>
                                                <span className="text-sm font-medium text-muted-foreground">Qoralama</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 outline-none">
                                            {deleteConfirmId === course.id ? (
                                                <div className="flex items-center gap-1.5 bg-destructive/10 border border-destructive/20 rounded-xl p-1.5 animate-in slide-in-from-right-4">
                                                    <button onClick={() => handleDelete(course.id)} disabled={loading} className="px-3 py-1.5 text-xs font-bold bg-destructive text-white hover:bg-destructive/90 rounded-lg shadow-sm transition-colors">Tasdiq</button>
                                                    <button onClick={() => setDeleteConfirmId(null)} className="px-3 py-1.5 text-xs font-medium bg-background text-foreground hover:bg-muted border border-border/50 rounded-lg shadow-sm transition-colors">Bekor</button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1 bg-background/50 border rounded-xl p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => openEditPanel(course)}
                                                        className="p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
                                                        title="Tahrirlash"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <div className="w-px h-4 bg-border/50"></div>
                                                    <button
                                                        onClick={() => setDeleteConfirmId(course.id)}
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

            {/* Slide-over Panel for Create/Edit */}
            {isPanelOpen && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black/50 transition-opacity animate-in fade-in duration-200"
                        onClick={() => setIsPanelOpen(false)}
                    ></div>

                    {/* Panel */}
                    <div className="relative w-full max-w-2xl bg-card border-l shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
                        <div className="flex items-center justify-between px-6 py-5 border-b bg-muted/30">
                            <div>
                                <h2 className="text-xl font-bold text-foreground">
                                    {editingCourse ? "Kursni Tahrirlash" : "Yangi Kurs Qo&apos;shish"}
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1">Kurs ma&apos;lumotlarini {editingCourse ? "yangilang" : "kiriting"}</p>
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

                            <form id="course-form" onSubmit={handleSubmit} className="space-y-8">
                                {/* Thumbnail Upload Area */}
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                                        Muqova Rasmi
                                        <span className="px-2 py-0.5 rounded text-[10px] bg-muted text-muted-foreground uppercase font-bold tracking-wider">Ixtiyoriy</span>
                                    </label>
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="relative group border-2 border-dashed border-border/60 rounded-2xl hover:border-primary/50 transition-colors cursor-pointer overflow-hidden bg-muted/10 h-48 flex flex-col items-center justify-center"
                                    >
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            name="thumbnail"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />

                                        {previewImage ? (
                                            <>
                                                <img src={previewImage} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="px-4 py-2 bg-black/40 text-white rounded-lg text-sm font-medium flex items-center gap-2">
                                                        <UploadCloud className="w-4 h-4" /> Rasmni almashtirish
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center p-6 flex flex-col items-center gap-3 text-muted-foreground group-hover:text-primary transition-colors">
                                                <div className="p-3 rounded-full bg-background border shadow-sm group-hover:shadow-md transition-all">
                                                    <UploadCloud className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">Rasm yuklash uchun bosing</p>
                                                    <p className="text-xs opacity-70 mt-1">PNG, JPG, WEBP (Maks. 5MB)</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5 col-span-1 md:col-span-2">
                                        <label className="text-sm font-semibold text-foreground">Sarlavha <span className="text-destructive">*</span></label>
                                        <input required defaultValue={editingCourse?.title} name="title" className="w-full px-3 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground" placeholder="Kurs nomini kiriting..." />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-foreground">O&apos;qituvchi <span className="text-destructive">*</span></label>
                                        <input required defaultValue={editingCourse?.instructor} name="instructor" className="w-full px-3 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground" placeholder="Alisher Navoiy" />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-foreground">Turkum (Kategoriya)</label>
                                        <select defaultValue={editingCourse?.category || ""} name="category" className="w-full px-3 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                                            <option value="">Tanlamaslik...</option>
                                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-foreground">Narxi (UZS)</label>
                                        <div className="relative">
                                            <input type="number" step="0.01" defaultValue={editingCourse?.price} name="price" className="w-full pl-3 pr-14 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground" placeholder="0.00" />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">UZS</span>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-foreground">Daraja & Davomiylik</label>
                                        <div className="flex gap-2">
                                            <select defaultValue={editingCourse?.level_type || "Beginner"} name="level_type" className="flex-1 px-3 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer">
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Advanced">Advanced</option>
                                            </select>
                                            <div className="relative flex-1">
                                                <input type="number" step="0.1" defaultValue={editingCourse?.duration_hours} name="duration_hours" className="w-full pl-3 pr-12 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground" placeholder="12.5" />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">soat</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
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
                                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isSelected
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

                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-foreground">Tafsif <span className="text-destructive">*</span></label>
                                    <textarea required defaultValue={editingCourse?.description} name="description" rows={5} className="w-full px-3 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-y transition-all placeholder:text-muted-foreground" placeholder="Kurs haqida batafsil ma'lumot..." />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border bg-muted/20">
                                    <label className="relative flex items-center gap-3 cursor-pointer group flex-1">
                                        <div className="flex items-center justify-center">
                                            <input type="checkbox" defaultChecked={editingCourse?.is_free} name="is_free" className="peer sr-only" />
                                            <div className="w-10 h-5 bg-muted-foreground/30 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-foreground">Bepul kurs</span>
                                            <span className="text-xs text-muted-foreground">Foydalanuvchilarga tekin taqdim etiladi.</span>
                                        </div>
                                    </label>

                                    <div className="w-px bg-border hidden sm:block"></div>

                                    <label className="relative flex items-center gap-3 cursor-pointer group flex-1">
                                        <div className="flex items-center justify-center">
                                            <input type="checkbox" defaultChecked={editingCourse ? editingCourse.is_published : true} name="is_published" className="peer sr-only" />
                                            <div className="w-10 h-5 bg-muted-foreground/30 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-foreground">Ommaga e&apos;lon qilish</span>
                                            <span className="text-xs text-muted-foreground">Darhol web-saytda ko&apos;rinadi.</span>
                                        </div>
                                    </label>
                                </div>

                                {/* Extra padding at bottom for smooth scrolling past content */}
                                <div className="h-4"></div>
                            </form>
                        </div>

                        {/* Footer / Actions */}
                        <div className="p-5 border-t bg-card flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setIsPanelOpen(false)}
                                className="flex-1 px-4 py-2.5 rounded-lg border bg-background hover:bg-muted font-medium text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                Bekor qilish
                            </button>
                            <button
                                type="submit"
                                form="course-form"
                                disabled={loading}
                                className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:pointer-events-none"
                            >
                                {loading ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></span>
                                        <span>Saqlanmoqda...</span>
                                    </>
                                ) : (
                                    <span>{editingCourse ? "Saqlash" : "Yaratish"}</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
