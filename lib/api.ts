import { cookies } from "next/headers";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
const READ_TIMEOUT_MS = 8000;
const WRITE_TIMEOUT_MS = 60000;

type ApiFetchOptions = RequestInit & {
    timeoutMs?: number;
};

function buildHeaders(options: RequestInit, token?: string): Record<string, string> {
    const headers: Record<string, string> = {
        ...((options.headers as Record<string, string>) || {}),
    };

    // Robust check for FormData to avoid manual Content-Type when sending multipart data
    const isFormData = options.body instanceof FormData || 
                       (options.body && typeof (options.body as any).append === 'function');

    if (isFormData) {
        // multipart/form-data boundary will be set automatically by fetch
        delete headers["Content-Type"];
    } else if (!headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
    }

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
}

async function fetchWithTimeout(endpoint: string, options: ApiFetchOptions = {}, token?: string) {
    const controller = new AbortController();
    const method = (options.method || "GET").toUpperCase();
    const timeoutMs = options.timeoutMs ?? (method === "GET" ? READ_TIMEOUT_MS : WRITE_TIMEOUT_MS);
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const requestOptions: RequestInit = { ...options };
    const signal = requestOptions.signal;
    delete (requestOptions as ApiFetchOptions).timeoutMs;
    const headers = buildHeaders(requestOptions, token);

    try {
        const fullUrl = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`;
        
        return await fetch(fullUrl, {
            ...requestOptions,
            headers,
            signal: signal ?? controller.signal,
        });
    } finally {
        clearTimeout(timer);
    }
}

/**
 * Helper to fetch data from DRF backend with Admin Token attached
 */
export async function fetchWithAuth(endpoint: string, options: ApiFetchOptions = {}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_access_token")?.value;

    return fetchWithTimeout(endpoint, options, token);
}

export async function fetchPublic(endpoint: string, options: ApiFetchOptions = {}) {
    return fetchWithTimeout(endpoint, options);
}
