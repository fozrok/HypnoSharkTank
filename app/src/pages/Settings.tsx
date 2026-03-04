import { useState, useRef } from 'react';
import { useApp } from '../store/store';
import { Sun, Moon, Key, CheckCircle, XCircle, Loader, Eye, EyeOff, Trash2 } from 'lucide-react';
import { testConnection, AVAILABLE_MODELS } from '../services/aiService';

export default function SettingsPage() {
    const { theme, toggleTheme, openRouterKey, openRouterModel, setOpenRouterKey, setOpenRouterModel } = useApp();

    const [keyDraft, setKeyDraft] = useState(openRouterKey ?? '');
    const [showKey, setShowKey] = useState(false);
    const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'ok' | 'fail'>('idle');
    const [testError, setTestError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSaveKey = () => {
        const trimmed = keyDraft.trim();
        setOpenRouterKey(trimmed || null);
        setTestStatus('idle');
        setTestError(null);
    };

    const handleClearKey = () => {
        setKeyDraft('');
        setOpenRouterKey(null);
        setTestStatus('idle');
        setTestError(null);
    };

    const handleTest = async () => {
        const trimmed = keyDraft.trim();
        if (!trimmed) return;
        // Save key first so testConnection can read it
        setOpenRouterKey(trimmed);
        setTestStatus('testing');
        setTestError(null);
        const result = await testConnection();
        if (result.ok) {
            setTestStatus('ok');
        } else {
            setTestStatus('fail');
            setTestError(result.error ?? 'Unknown error');
        }
    };

    const hasKey = !!openRouterKey;

    return (
        <main className="app-main">
            <div className="step-header animate-fade-in">
                <h2 className="step-title">Settings</h2>
                <p className="step-description">Configure your AI and display preferences.</p>
            </div>

            {/* ── AI Configuration ───────────────────────────── */}
            <div className="card animate-fade-in" style={{ maxWidth: 600, marginBottom: 'var(--space-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-5)' }}>
                    <Key size={20} style={{ color: 'var(--color-primary)' }} />
                    <h3 style={{ fontSize: 'var(--text-lg)', margin: 0 }}>AI Configuration</h3>
                    {hasKey && (
                        <span className="card-badge badge-success" style={{ marginLeft: 'auto' }}>
                            <CheckCircle size={12} style={{ display: 'inline', marginRight: 4 }} />
                            Key saved
                        </span>
                    )}
                </div>

                {/* API key input */}
                <div className="form-group">
                    <label className="form-label" htmlFor="api-key-input">
                        OpenRouter API Key
                        <a
                            href="https://openrouter.ai/keys"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: 'var(--text-xs)', color: 'var(--text-link)', marginLeft: 8, fontWeight: 400 }}
                        >
                            Get a key →
                        </a>
                    </label>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <input
                                id="api-key-input"
                                ref={inputRef}
                                type={showKey ? 'text' : 'password'}
                                className="form-input"
                                placeholder="sk-or-v1-..."
                                value={keyDraft}
                                onChange={e => { setKeyDraft(e.target.value); setTestStatus('idle'); }}
                                style={{ paddingRight: 40 }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowKey(p => !p)}
                                style={{
                                    position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    color: 'var(--text-tertiary)', padding: 0,
                                }}
                                aria-label={showKey ? 'Hide key' : 'Show key'}
                            >
                                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        <button className="btn btn-primary" onClick={handleSaveKey} disabled={!keyDraft.trim()}>
                            Save
                        </button>
                        {hasKey && (
                            <button className="btn btn-outline" onClick={handleClearKey} title="Remove key">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 6 }}>
                        Stored locally in your browser only — never sent anywhere except OpenRouter.
                    </div>
                </div>

                {/* Model selector */}
                <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
                    <label className="form-label" htmlFor="model-select">AI Model</label>
                    <select
                        id="model-select"
                        className="form-select"
                        value={openRouterModel}
                        onChange={e => setOpenRouterModel(e.target.value)}
                    >
                        {AVAILABLE_MODELS.map(m => (
                            <option key={m.id} value={m.id}>{m.label}</option>
                        ))}
                    </select>
                </div>

                {/* Test connection */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                    <button
                        className="btn btn-outline"
                        onClick={handleTest}
                        disabled={!keyDraft.trim() || testStatus === 'testing'}
                    >
                        {testStatus === 'testing'
                            ? <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} />
                            : <Key size={14} />
                        }
                        {testStatus === 'testing' ? 'Testing…' : 'Test Connection'}
                    </button>

                    {testStatus === 'ok' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-success)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                            <CheckCircle size={16} /> Connected to {openRouterModel}
                        </div>
                    )}
                    {testStatus === 'fail' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-danger)', fontSize: 'var(--text-sm)' }}>
                            <XCircle size={16} /> {testError}
                        </div>
                    )}
                </div>

                {/* Pricing note */}
                <div className="insight-box" style={{ marginTop: 'var(--space-5)' }}>
                    <div className="insight-box-title">Estimated cost per full session</div>
                    <div className="insight-box-content" style={{ fontSize: 'var(--text-sm)' }}>
                        Using <strong>Gemini Flash 1.5</strong>: ~$0.02–0.05 for a complete 7-step journey.
                        Tokens used depend on the depth of your answers. OpenRouter bills per-token with no subscription.
                    </div>
                </div>
            </div>

            {/* ── Display Settings ───────────────────────────── */}
            <div className="card animate-fade-in" style={{ maxWidth: 600, marginBottom: 'var(--space-4)' }}>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>Display</h3>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4) 0', borderBottom: '1px solid var(--border-color)' }}>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>Theme</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Switch between light and dark mode</div>
                    </div>
                    <button className="btn btn-outline btn-sm" onClick={toggleTheme}>
                        {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
                        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4) 0' }}>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>Default Export Format</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Preferred format when downloading your plan</div>
                    </div>
                    <select className="form-select" style={{ width: 'auto' }}>
                        <option>Markdown (.md)</option>
                        <option>JSON (.json)</option>
                        <option>Plain Text (.txt)</option>
                    </select>
                </div>
            </div>

            {/* ── About ─────────────────────────────────────── */}
            <div className="card animate-fade-in" style={{ maxWidth: 600 }}>
                <div className="insight-box" style={{ margin: 0 }}>
                    <div className="insight-box-title">About CoachSharkTank</div>
                    <div className="insight-box-content" style={{ fontSize: 'var(--text-sm)' }}>
                        A single-session tool — no account or login needed. Your data stays in the browser until you close the tab.
                        Use the profile export/import on the Niche Finder page to save and reload between sessions.
                        Your OpenRouter API key is stored in <strong>localStorage</strong> and persists across page reloads.
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </main>
    );
}
