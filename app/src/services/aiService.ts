/**
 * aiService.ts
 * Thin wrapper around the OpenRouter API (OpenAI-compatible).
 * Falls back gracefully to null when no API key is configured.
 */

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

export interface AIMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface AICallOptions {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    stream?: boolean;
    /** Called with each streamed text chunk when stream=true */
    onChunk?: (chunk: string) => void;
}

/** Read the API key from localStorage (set in Settings) */
export function getApiKey(): string | null {
    try { return localStorage.getItem('openrouter_api_key'); } catch { return null; }
}

/** Read the preferred model from localStorage */
export function getPreferredModel(): string {
    try { return localStorage.getItem('openrouter_model') || 'google/gemini-3-flash-preview'; } catch {
        return 'google/gemini-3-flash-preview';
    }
}

/** Save API key to localStorage */
export function saveApiKey(key: string): void {
    try { localStorage.setItem('openrouter_api_key', key.trim()); } catch { }
}

/** Save preferred model to localStorage */
export function savePreferredModel(model: string): void {
    try { localStorage.setItem('openrouter_model', model); } catch { }
}

/** Clear the stored API key */
export function clearApiKey(): void {
    try { localStorage.removeItem('openrouter_api_key'); } catch { }
}

/**
 * Main AI call function.
 * Returns the response text, or null if no API key is configured.
 * Throws an AIError if the API returns an error.
 * Supports streaming via onChunk callback.
 */
export async function callAI(
    messages: AIMessage[],
    options: AICallOptions = {}
): Promise<string | null> {
    const apiKey = getApiKey();
    if (!apiKey) return null;

    const model = options.model ?? getPreferredModel();
    const stream = options.stream ?? false;

    const response = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://coachsharktank.app',
            'X-Title': 'CoachSharkTank',
        },
        body: JSON.stringify({
            model,
            messages,
            temperature: options.temperature ?? 0.7,
            max_tokens: options.maxTokens ?? 4096,
            stream,
        }),
    });

    if (!response.ok) {
        const errText = await response.text().catch(() => response.statusText);
        throw new AIError(`OpenRouter error ${response.status}: ${errText}`, response.status);
    }

    // ── Streaming mode
    if (stream && options.onChunk) {
        const reader = response.body?.getReader();
        if (!reader) throw new AIError('No response body for streaming', 500);
        const decoder = new TextDecoder();
        let fullText = '';
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            // SSE lines: "data: {...}"
            for (const line of chunk.split('\n')) {
                if (!line.startsWith('data: ')) continue;
                const data = line.slice(6).trim();
                if (data === '[DONE]') continue;
                try {
                    const json = JSON.parse(data);
                    const text = json.choices?.[0]?.delta?.content ?? '';
                    if (text) {
                        fullText += text;
                        options.onChunk(text);
                    }
                } catch { }
            }
        }
        return fullText;
    }

    // ── Non-streaming mode
    const json = await response.json();
    return json.choices?.[0]?.message?.content ?? null;
}

/** Quick connectivity test — sends a trivial prompt */
export async function testConnection(): Promise<{ ok: boolean; model: string; error?: string }> {
    const model = getPreferredModel();
    try {
        const result = await callAI(
            [{ role: 'user', content: 'Reply with just: OK' }],
            { model, maxTokens: 10, temperature: 0 }
        );
        if (result === null) return { ok: false, model, error: 'No API key configured' };
        return { ok: true, model };
    } catch (e) {
        return { ok: false, model, error: e instanceof AIError ? e.message : 'Unknown error' };
    }
}

/** Typed error with HTTP status code */
export class AIError extends Error {
    status: number;
    constructor(message: string, status: number = 0) {
        super(message);
        this.name = 'AIError';
        this.status = status;
    }
}

/** Parse JSON from an AI response, stripping markdown code fences if present */
export function parseAIJson<T>(text: string): T {
    // Strip ```json ... ``` fences
    const stripped = text
        .replace(/^```(?:json)?\s*/m, '')
        .replace(/\s*```\s*$/m, '')
        .trim();
    return JSON.parse(stripped) as T;
}

export const AVAILABLE_MODELS = [
    { id: 'google/gemini-3-flash-preview', label: 'Gemini 3 Flash Preview (Recommended)' },
    { id: 'google/gemini-3.1-flash-lite-preview', label: 'Gemini 3.1 Flash Lite Preview' },
    { id: 'google/gemini-flash-1.5', label: 'Gemini Flash 1.5' },
    { id: 'x-ai/grok-4.1-fast', label: 'Grok 4.1 Fast (xAI)' },
    { id: 'minimax/minimax-m2.5', label: 'MiniMax M2.5' },
    { id: 'openai/gpt-4o', label: 'GPT-4o (Premium)' },
];
