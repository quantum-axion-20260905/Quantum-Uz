"use client";

import { startTransition, useState } from "react";
import { Check, Copy, Printer, Share2 } from "lucide-react";

type ArticleActionsProps = {
    pathname: string;
    citationText: string;
};

export default function ArticleActions({ pathname, citationText }: ArticleActionsProps) {
    const [shareState, setShareState] = useState<"idle" | "copied">("idle");
    const [citeState, setCiteState] = useState<"idle" | "copied">("idle");

    async function copyText(text: string, mode: "share" | "cite") {
        await navigator.clipboard.writeText(text);

        startTransition(() => {
            if (mode === "share") {
                setShareState("copied");
                window.setTimeout(() => setShareState("idle"), 1800);
                return;
            }

            setCiteState("copied");
            window.setTimeout(() => setCiteState("idle"), 1800);
        });
    }

    async function handleShare() {
        const fullUrl = `${window.location.origin}${pathname}`;

        if (navigator.share) {
            await navigator.share({
                url: fullUrl,
                title: document.title,
            });
            return;
        }

        await copyText(fullUrl, "share");
    }

    async function handleCitationCopy() {
        await copyText(citationText, "cite");
    }

    return (
        <div className="space-y-3">
            <button
                type="button"
                onClick={() => void handleShare()}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-foreground px-4 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90"
            >
                {shareState === "copied" ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                {shareState === "copied" ? "Havola nusxalandi" : "Ulashish"}
            </button>

            <div className="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
                >
                    <Printer className="h-4 w-4" />
                    Chop etish
                </button>
                <button
                    type="button"
                    onClick={() => void handleCitationCopy()}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
                >
                    {citeState === "copied" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {citeState === "copied" ? "Nusxalandi" : "Iqtibos"}
                </button>
            </div>
        </div>
    );
}
