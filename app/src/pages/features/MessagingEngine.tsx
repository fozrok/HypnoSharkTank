import { useState, useEffect } from 'react';
import { useApp } from '../../store/store';
import { MOCK_MESSAGING_DATA } from '../../data/mockData';
import { ArrowLeft, ArrowRight, Copy, Check, MessageSquare, Search, ThumbsUp, ThumbsDown } from 'lucide-react';
import { callAI, parseAIJson } from '../../services/aiService';
import { buildMessagingPrompt } from '../../services/prompts';

export default function MessagingEngine() {
    const { messagingData, setMessagingData, completeStep, setCurrentStep, selectedNiche, businessModel, feedingFrenzy } = useApp();
    const [loading, setLoading] = useState(!messagingData);
    const [hookFilter, setHookFilter] = useState('all');
    const [copied, setCopied] = useState<number | null>(null);

    useEffect(() => {
        if (!messagingData) {
            const hasKey = !!localStorage.getItem('openrouter_api_key');
            const advisorSummary = feedingFrenzy?.approvedAdvice
                .map(a => `${a.shark}: ${a.keyRecommendation}`).join('; ') ?? '';
            const generate = async () => {
                try {
                    const raw = selectedNiche && businessModel
                        ? await callAI(buildMessagingPrompt(selectedNiche, businessModel, advisorSummary))
                        : null;
                    setMessagingData(raw ? parseAIJson(raw) : MOCK_MESSAGING_DATA);
                } catch {
                    setMessagingData(MOCK_MESSAGING_DATA);
                } finally {
                    setLoading(false);
                }
            };
            if (hasKey && selectedNiche && businessModel) {
                generate();
            } else {
                const timer = setTimeout(() => {
                    setMessagingData(MOCK_MESSAGING_DATA);
                    setLoading(false);
                }, 1500);
                return () => clearTimeout(timer);
            }
        } else {
            setLoading(false);
        }
    }, []);

    const copyText = (text: string, idx: number) => {
        navigator.clipboard.writeText(text);
        setCopied(idx);
        setTimeout(() => setCopied(null), 2000);
    };

    const handleContinue = () => {
        completeStep(5);
        setCurrentStep(6);
    };

    if (loading) {
        return (
            <div className="loading-state">
                <div className="spinner" />
                <p style={{ fontSize: 'var(--text-lg)' }}>Crafting your messaging strategy...</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>Generating hooks, outreach sequences, and trust language</p>
            </div>
        );
    }

    if (!messagingData) return null;
    const msg = messagingData;
    const hookTypes = ['all', ...new Set(msg.hooks.map(h => h.type))];
    const filteredHooks = hookFilter === 'all' ? msg.hooks : msg.hooks.filter(h => h.type === hookFilter);

    return (
        <div className="animate-fade-in">
            <div className="step-header">
                <div className="step-number">Step 5 of 7</div>
                <h2 className="step-title">Messaging Engine</h2>
                <p className="step-description">Your complete go-to-market messaging toolkit: hooks, outreach, and trust language.</p>
            </div>

            {/* Content Hooks */}
            <div className="section">
                <div className="section-header">
                    <h3 className="section-title">Content Hooks</h3>
                    <span className="mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{msg.hooks.length} hooks</span>
                </div>

                <div className="tabs">
                    {hookTypes.map(type => (
                        <button key={type} className={`tab ${hookFilter === type ? 'active' : ''}`} onClick={() => setHookFilter(type)}>
                            {type === 'all' ? 'All' : type}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {filteredHooks.map((hook, i) => (
                        <div key={i} className="card animate-fade-in" style={{ padding: 'var(--space-4)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ flex: 1 }}>
                                    <span className="card-badge badge-recommended" style={{ marginBottom: 'var(--space-2)' }}>{hook.type}</span>
                                    <p style={{ fontSize: 'var(--text-base)', fontWeight: 500, color: 'var(--text-primary)', marginTop: 'var(--space-2)', lineHeight: 1.6 }}>{hook.hook}</p>
                                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)' }}>Angle: {hook.angle}</p>
                                </div>
                                <button className="btn btn-ghost btn-sm" onClick={() => copyText(hook.hook, i)}>
                                    {copied === i ? <Check size={14} /> : <Copy size={14} />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Outreach Sequence */}
            <div className="section">
                <div className="section-header">
                    <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <MessageSquare size={20} /> Outreach Sequence
                    </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {msg.outreach.map((step, i) => (
                        <div key={i} className="card" style={{ padding: 'var(--space-4)', borderLeft: `3px solid var(--color-primary)`, position: 'relative' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                                <div style={{
                                    width: 28, height: 28, borderRadius: '50%', background: 'var(--color-primary)',
                                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 'var(--text-xs)', fontWeight: 700, fontFamily: 'var(--font-mono)'
                                }}>
                                    {step.step}
                                </div>
                                <div>
                                    <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{step.label}</span>
                                </div>
                            </div>
                            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>"{step.message}"</p>
                            <button className="btn btn-ghost btn-sm" onClick={() => copyText(step.message, 100 + i)} style={{ marginTop: 'var(--space-2)' }}>
                                {copied === 100 + i ? <Check size={14} /> : <Copy size={14} />}
                                {copied === 100 + i ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Prospect Finder */}
            <div className="section">
                <div className="section-header">
                    <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <Search size={20} /> Prospect Finder
                    </h3>
                </div>
                <div className="card">
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                        Use these search queries to find your first 50 ideal clients:
                    </p>
                    {msg.prospectSearches.map((search, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-2) 0', borderBottom: i < msg.prospectSearches.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                            <code style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--color-primary)', background: 'var(--bg-sidebar)', padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--border-radius-sm)' }}>
                                {search}
                            </code>
                            <button className="btn btn-ghost btn-sm" onClick={() => copyText(search, 200 + i)}>
                                {copied === 200 + i ? <Check size={12} /> : <Copy size={12} />}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trust Language Cheat Sheet */}
            <div className="section">
                <div className="section-header">
                    <h3 className="section-title">Trust Language Cheat Sheet</h3>
                </div>
                <div className="data-grid data-grid-2">
                    <div className="card" style={{ borderTop: '3px solid var(--color-success)' }}>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)', color: 'var(--color-success)' }}>
                            <ThumbsUp size={18} /> Always Use
                        </h4>
                        <ul style={{ listStyle: 'none' }}>
                            {msg.trustPhrases.use.map((p, i) => (
                                <li key={i} style={{ padding: 'var(--space-2) 0', fontSize: 'var(--text-sm)', borderBottom: i < msg.trustPhrases.use.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                                    ✓ "{p}"
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="card" style={{ borderTop: '3px solid var(--color-danger)' }}>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)', color: 'var(--color-danger)' }}>
                            <ThumbsDown size={18} /> Never Use
                        </h4>
                        <ul style={{ listStyle: 'none' }}>
                            {msg.trustPhrases.avoid.map((p, i) => (
                                <li key={i} style={{ padding: 'var(--space-2) 0', fontSize: 'var(--text-sm)', borderBottom: i < msg.trustPhrases.avoid.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                                    ✗ "{p}"
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="insight-box" style={{ marginTop: 'var(--space-4)' }}>
                    <div className="insight-box-title">#1 Objection & Response</div>
                    <p style={{ fontWeight: 600, marginBottom: 'var(--space-2)' }}>{msg.topObjection}</p>
                    <p style={{ fontStyle: 'italic' }}>{msg.objectionResponse}</p>
                </div>
            </div>

            <div className="step-nav">
                <button className="btn btn-outline" onClick={() => setCurrentStep(4)}>
                    <ArrowLeft size={16} /> Back to Revenue
                </button>
                <button className="btn btn-primary btn-lg" onClick={handleContinue}>
                    Plan Launch Sprint <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
}
