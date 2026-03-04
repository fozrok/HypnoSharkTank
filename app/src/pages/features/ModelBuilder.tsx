import { useState, useEffect } from 'react';
import { useApp } from '../../store/store';
import { MOCK_BUSINESS_MODEL } from '../../data/mockData';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Pencil } from 'lucide-react';
import { callAI, parseAIJson } from '../../services/aiService';
import { buildModelPrompt } from '../../services/prompts';

export default function ModelBuilder() {
    const { selectedNiche, userProfile, businessModel, setBusinessModel, completeStep, setCurrentStep } = useApp();
    const [loading, setLoading] = useState(!businessModel);
    const [aiError, setAiError] = useState<string | null>(null);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        offer: true, pricing: true, scalability: false, channels: false, positioning: false, summary: false,
    });

    useEffect(() => {
        if (!businessModel) {
            const hasKey = !!localStorage.getItem('openrouter_api_key');
            const generate = async () => {
                try {
                    const raw = selectedNiche && userProfile
                        ? await callAI(buildModelPrompt(selectedNiche, userProfile))
                        : null;
                    if (raw) {
                        setBusinessModel(parseAIJson(raw));
                    } else {
                        setBusinessModel(MOCK_BUSINESS_MODEL);
                    }
                } catch (err) {
                    setAiError(err instanceof Error ? err.message : 'AI call failed');
                } finally {
                    setLoading(false);
                }
            };
            if (hasKey && selectedNiche && userProfile) {
                generate();
            } else {
                const timer = setTimeout(() => {
                    setBusinessModel(MOCK_BUSINESS_MODEL);
                    setLoading(false);
                }, 1500);
                return () => clearTimeout(timer);
            }
        } else {
            setLoading(false);
        }
    }, []);

    const toggle = (key: string) => setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));

    const handleContinue = () => {
        completeStep(2);
        setCurrentStep(3);
    };

    if (loading || aiError) {
        if (aiError) {
            return (
                <div className="loading-state">
                    <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-danger)' }}>AI call failed</p>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-4)' }}>{aiError}</p>
                    <button className="btn btn-outline" onClick={() => { setAiError(null); setBusinessModel(MOCK_BUSINESS_MODEL); setLoading(false); }}>
                        Use example data instead
                    </button>
                </div>
            );
        }
        return (
            <div className="loading-state">
                <div className="spinner" />
                <p style={{ fontSize: 'var(--text-lg)' }}>
                    {localStorage.getItem('openrouter_api_key') ? '🦈 AI is building your business model...' : 'Building your business model...'}
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
                    Designing offer, pricing, scalability roadmap, and positioning for "{selectedNiche?.name}"
                </p>
            </div>
        );
    }

    if (!businessModel) return null;
    const m = businessModel;

    const sections = [
        {
            key: 'offer', title: 'Offer Design', content: (
                <div>
                    <h4 style={{ marginBottom: 'var(--space-2)' }}>{m.offerName}</h4>
                    <p style={{ marginBottom: 'var(--space-4)' }}>{m.offerDescription}</p>
                    <div style={{ marginBottom: 'var(--space-3)' }}>
                        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 4 }}>Transformation Promise</div>
                        <div className="insight-box" style={{ margin: '0 0 var(--space-4) 0', padding: 'var(--space-4)' }}>
                            <p style={{ fontStyle: 'italic', color: 'var(--text-primary)' }}>"{m.transformationPromise}"</p>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                        <div><div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Format</div><p>{m.format}</p></div>
                        <div><div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Duration</div><p>{m.duration}</p></div>
                    </div>
                    <div style={{ marginTop: 'var(--space-4)' }}>
                        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 8 }}>Deliverables</div>
                        <ul style={{ paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                            {m.deliverables.map((d, i) => <li key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{d}</li>)}
                        </ul>
                    </div>
                </div>
            )
        },
        {
            key: 'pricing', title: 'Pricing Strategy', content: (
                <div>
                    <div className="data-grid data-grid-3" style={{ marginBottom: 'var(--space-4)' }}>
                        <div className="metric-card">
                            <div className="metric-label">Model</div>
                            <div className="metric-value" style={{ fontSize: 'var(--text-lg)' }}>{m.pricingModel}</div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-label">Price Point</div>
                            <div className="metric-value" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-success)' }}>{m.pricePoint}</div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-label">Payment Options</div>
                            <div style={{ marginTop: 4 }}>{m.paymentOptions.map((p, i) => <div key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{p}</div>)}</div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            key: 'scalability', title: 'Scalability Roadmap', content: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    {m.scalabilityPhases.map((phase, i) => (
                        <div key={i} className="card" style={{ borderLeft: `3px solid ${i === 0 ? 'var(--color-primary)' : i === 1 ? 'var(--color-accent)' : 'var(--color-success)'}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                                <h4 style={{ fontSize: 'var(--text-base)' }}>{phase.phase}</h4>
                                <span className="mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{phase.months}</span>
                            </div>
                            <p style={{ fontSize: 'var(--text-sm)' }}>{phase.description}</p>
                        </div>
                    ))}
                </div>
            )
        },
        {
            key: 'channels', title: 'Acquisition Channels', content: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    {m.acquisitionChannels.map((ch, i) => (
                        <div key={i} className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                                <h4 style={{ fontSize: 'var(--text-base)' }}>{ch.channel}</h4>
                                <span className="card-badge badge-recommended">{ch.cost}</span>
                            </div>
                            <p style={{ fontSize: 'var(--text-sm)' }}>{ch.description}</p>
                        </div>
                    ))}
                </div>
            )
        },
        {
            key: 'positioning', title: 'Positioning & Differentiation', content: (
                <div>
                    <div style={{ marginBottom: 'var(--space-4)' }}>
                        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 8 }}>Positioning Statement</div>
                        <div className="insight-box" style={{ margin: 0, padding: 'var(--space-4)' }}>
                            <p style={{ fontWeight: 500, color: 'var(--text-primary)' }}>"{m.positioningStatement}"</p>
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 8 }}>Contrarian Angle</div>
                        <p style={{ fontSize: 'var(--text-sm)' }}>{m.contrarian}</p>
                    </div>
                </div>
            )
        },
        {
            key: 'summary', title: 'One-Page Summary', content: (
                <div className="insight-box" style={{ margin: 0 }}>
                    <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.8, color: 'var(--text-primary)' }}>{m.onePageSummary}</p>
                </div>
            )
        },
    ];

    return (
        <div className="animate-fade-in">
            <div className="step-header">
                <div className="step-number">Step 2 of 7</div>
                <h2 className="step-title">Business Model Builder</h2>
                <p className="step-description">Your niche "{selectedNiche?.name}" has been transformed into a complete business model.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {sections.map(section => (
                    <div key={section.key} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                        <div className="collapsible-header" onClick={() => toggle(section.key)}>
                            <h3 style={{ fontSize: 'var(--text-lg)', fontFamily: 'var(--font-heading)' }}>{section.title}</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                <button className="btn btn-ghost btn-sm" onClick={e => { e.stopPropagation(); }}>
                                    <Pencil size={14} /> Edit
                                </button>
                                {expandedSections[section.key] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                        </div>
                        {expandedSections[section.key] && (
                            <div className="collapsible-content">{section.content}</div>
                        )}
                    </div>
                ))}
            </div>

            <div className="step-nav">
                <button className="btn btn-outline" onClick={() => setCurrentStep(1)}>
                    <ArrowLeft size={16} /> Back to Niches
                </button>
                <button className="btn btn-primary btn-lg" onClick={handleContinue}>
                    Validate Market <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
}
