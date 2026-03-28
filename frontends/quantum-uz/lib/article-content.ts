import katex from "katex";

export type Article = {
    id: number;
    title: string;
    slug?: string | null;
    content: string;
    summary?: string | null;
    author?: string | null;
    category_name?: string | null;
    cover_image?: string | null;
    read_time_minutes?: number | null;
    created_at?: string | null;
    updated_at?: string | null;
    views?: number | null;
    tags_names?: string[];
};

const HTML_TAG_PATTERN = /<\/?[a-z][\s\S]*>/i;

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function renderMathExpression(expression: string, displayMode: boolean) {
    return katex.renderToString(expression.trim(), {
        displayMode,
        throwOnError: false,
        strict: "ignore",
        output: "html",
    });
}

function replaceMathSegments(input: string) {
    const placeholders: string[] = [];
    const patterns = [
        { regex: /\$\$([\s\S]+?)\$\$/g, displayMode: true },
        { regex: /\\\[([\s\S]+?)\\\]/g, displayMode: true },
        { regex: /\\\(([\s\S]+?)\\\)/g, displayMode: false },
        { regex: /(?<!\$)\$([^\n$]+?)\$(?!\$)/g, displayMode: false },
    ] as const;

    let output = input;

    for (const { regex, displayMode } of patterns) {
        output = output.replace(regex, (_, expression: string) => {
            const token = `__MATH_${placeholders.length}__`;
            placeholders.push(renderMathExpression(expression, displayMode));
            return token;
        });
    }

    return { output, placeholders };
}

function restoreMathSegments(input: string, placeholders: string[]) {
    return placeholders.reduce(
        (current, rendered, index) => current.replaceAll(`__MATH_${index}__`, rendered),
        input,
    );
}

function formatPlainTextBlock(block: string) {
    const trimmed = block.trim();
    if (!trimmed) {
        return "";
    }

    if (trimmed.startsWith("```") && trimmed.endsWith("```")) {
        const code = trimmed.replace(/^```[^\n]*\n?/, "").replace(/\n?```$/, "");
        return `<pre><code>${code}</code></pre>`;
    }

    if (/^#{1,6}\s/.test(trimmed)) {
        const [, hashes, text] = trimmed.match(/^(#{1,6})\s+([\s\S]*)$/) ?? [];
        const level = Math.min(hashes?.length ?? 2, 6);
        return `<h${level}>${text ?? trimmed}</h${level}>`;
    }

    const lines = trimmed.split("\n").map((line) => line.trim()).filter(Boolean);

    if (lines.length > 0 && lines.every((line) => /^[-*]\s+/.test(line))) {
        const items = lines.map((line) => `<li>${line.replace(/^[-*]\s+/, "")}</li>`).join("");
        return `<ul>${items}</ul>`;
    }

    if (lines.length > 0 && lines.every((line) => /^\d+\.\s+/.test(line))) {
        const items = lines.map((line) => `<li>${line.replace(/^\d+\.\s+/, "")}</li>`).join("");
        return `<ol>${items}</ol>`;
    }

    if (lines.length > 0 && lines.every((line) => /^>\s?/.test(line))) {
        return `<blockquote><p>${lines.map((line) => line.replace(/^>\s?/, "")).join("<br />")}</p></blockquote>`;
    }

    return `<p>${lines.join("<br />")}</p>`;
}

function renderPlainTextContent(content: string) {
    const { output, placeholders } = replaceMathSegments(content);
    const escaped = escapeHtml(output);
    const html = escaped
        .split(/\n{2,}/)
        .map((block) => formatPlainTextBlock(block))
        .filter(Boolean)
        .join("");

    return restoreMathSegments(html, placeholders);
}

export function stripHtml(input?: string | null) {
    if (!input) {
        return "";
    }

    return input.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function getArticleExcerpt(article: Pick<Article, "summary" | "content">, maxLength = 180) {
    const source = stripHtml(article.summary) || stripHtml(article.content);
    if (!source) {
        return "Qisqacha mazmun mavjud emas.";
    }

    if (source.length <= maxLength) {
        return source;
    }

    return `${source.slice(0, maxLength).trimEnd()}...`;
}

export function getArticleHref(article: Pick<Article, "id" | "slug">) {
    return `/journal/${article.slug || article.id}`;
}

export function formatArticleDate(date?: string | null) {
    if (!date) {
        return "Sana ko'rsatilmagan";
    }

    return new Intl.DateTimeFormat("uz-UZ", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(date));
}

export function renderArticleContent(content?: string | null) {
    if (!content?.trim()) {
        return "<p>Maqola matni hozircha mavjud emas.</p>";
    }

    const source = content.trim();

    if (HTML_TAG_PATTERN.test(source)) {
        const { output, placeholders } = replaceMathSegments(source);
        return restoreMathSegments(output, placeholders);
    }

    return renderPlainTextContent(source);
}
