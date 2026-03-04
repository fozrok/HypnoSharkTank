import { useState, useEffect } from 'react';
import { useApp } from '../../store/store';
import { MOCK_MARKET_VALIDATION } from '../../data/mockData';
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, XCircle, TrendingUp, Users, Radio } from 'lucide-react';

export default function MarketValidator() {
    const { marketValidation, setMarketValidation, completeStep, setCurrentStep } = useApp();
    const [loading, setLoading] = useState(!marketValidation);

    useEffect(() => {
        if (!marketValidation) {
            const timer = setTimeout(() => {
                setMarketValidation(MOCK_MARKET_VALIDATION);
                setLoading(false);
            }, 3000);
            return () => clearTimeout(timer);
        } else {
            setLoading(false);
        }
    }, []);

    const handleContinue = () => {
        completeStep(3);
        if (marketValidation?.verdict === 'go') setCurrentStep(4);
        else if (marketValidation?.verdict === 'pivot') setCurrentStep(2);
        else setCurrentStep(1);
    };

    if (loading) {
        return (
            <div className="loading-state">
                <div className="spinner" />
                <p style={{ fontSize: 'var(--text-lg)' }}>Validating your market opportunity...</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>Analyzing market size, competitors, and demand signals</p>
            </div>
        );
    }

    if (!marketValidation) return null;
    const v = marketValidation;

    const verdictConfig = {
        go: { label: 'GREEN LIGHT', sub: 'Proceed to build', icon: CheckCircle },
        pivot: { label: 'PIVOT RECOMMENDED', sub: 'Adjust before proceeding', icon: AlertTriangle },
        kill: { label: 'RED FLAG', sub: 'Rethink this direction', icon: XCircle },
    };
    const vc = verdictConfig[v.verdict];

    return (
        <div className="animate-fade-in">
            <div className="step-header">
                <div className="step-number">Step 3 of 7</div>
                <h2 className="step-title">Market Validation Verdict</h2>
                <p className="step-description">Your business model has been stress-tested against the market.</p>
            </div>

            <div className={`verdict-banner ${v.verdict} animate-scale-in`}>
                <vc.icon size={48} style={{ marginBottom: 'var(--space-2)', opacity: 0.9 }} />
                <div className="verdict-label">{vc.label}</div>
                <div className="verdict-sub">{vc.sub}</div>
            </div>

            <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
                <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.7, color: 'var(--text-primary)' }}>"{v.verdictSummary}"</p>
            </div>

            <div className="data-grid data-grid-2" style={{ marginBottom: 'var(--space-6)' }}>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <TrendingUp size={18} /> Market Size
                        </h3>
                    </div>
                    <div className="data-grid data-grid-3">
                        <div className="metric-card">
                            <div className="metric-label" title="Total Addressable Market — the total revenue opportunity available if you captured 100% of the market" style={{ cursor: 'help', borderBottom: '1px dashed var(--text-tertiary)' }}>TAM ⓘ</div>
                            <div className="metric-value">{v.marketSize.tam}</div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-label" title="Serviceable Addressable Market — the segment of TAM you can realistically reach with your delivery model and geography" style={{ cursor: 'help', borderBottom: '1px dashed var(--text-tertiary)' }}>SAM ⓘ</div>
                            <div className="metric-value">{v.marketSize.sam}</div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-label">Revenue Cap</div>
                            <div className="metric-value" style={{ fontSize: 'var(--text-xl)' }}>{v.marketSize.revenueCap}</div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <Users size={18} /> Competitors
                        </h3>
                    </div>
                    {v.competitors.map((c, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: 'var(--space-3) 0', borderBottom: i < v.competitors.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{c.name}</div>
                                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>{c.detail}</div>
                            </div>
                            <span className="card-badge badge-warning">{c.score}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
                <div className="card-header">
                    <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <Radio size={18} /> Demand Signals
                    </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    {v.demandSignals.map((signal, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', padding: 'var(--space-2) 0' }}>
                            <CheckCircle size={16} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: 2 }} />
                            <span style={{ fontSize: 'var(--text-sm)' }}>{signal}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
                <div className="card-header">
                    <h3 className="card-title">48-Hour Validation Kit</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {v.validationTests.map((test, i) => (
                        <div key={i} style={{ padding: 'var(--space-3)', background: 'var(--bg-sidebar)', borderRadius: 'var(--border-radius-md)' }}>
                            <p style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>{test.test}</p>
                            <span className="mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)' }}>✓ {test.passFail}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
                <div className="card-header">
                    <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <AlertTriangle size={18} /> Risk Assessment
                    </h3>
                </div>
                <ul style={{ paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    {v.risks.map((risk, i) => <li key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{risk}</li>)}
                </ul>
            </div>

            <div className="step-nav">
                <button className="btn btn-outline" onClick={() => setCurrentStep(2)}>
                    <ArrowLeft size={16} /> Back to Model
                </button>
                <button className="btn btn-primary btn-lg" onClick={handleContinue}>
                    {v.verdict === 'go' ? 'Build Revenue Model' : v.verdict === 'pivot' ? 'Adjust Model' : 'Find New Niche'}
                    <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
}
