import { useState, useEffect } from 'react';
import { useApp } from '../../store/store';
import { MOCK_REVENUE_PROJECTION } from '../../data/mockData';
import { ArrowLeft, ArrowRight, AlertTriangle, Flag } from 'lucide-react';
import { callAI, parseAIJson } from '../../services/aiService';
import { buildRevenuePrompt } from '../../services/prompts';

const SCENARIO_MULTIPLIERS = { conservative: 0.5, base: 1, aggressive: 1.5 };

export default function RevenueProjector() {
    const { revenueProjection, setRevenueProjection, completeStep, setCurrentStep, selectedNiche, businessModel, feedingFrenzy } = useApp();
    const [loading, setLoading] = useState(!revenueProjection);
    const [scenario, setScenario] = useState<'conservative' | 'base' | 'aggressive'>('base');

    useEffect(() => {
        if (!revenueProjection) {
            const hasKey = !!localStorage.getItem('openrouter_api_key');
            const advisorSummary = feedingFrenzy?.approvedAdvice
                .map(a => `${a.shark}: ${a.keyRecommendation}`).join('; ') ?? '';
            const generate = async () => {
                try {
                    const raw = selectedNiche && businessModel
                        ? await callAI(buildRevenuePrompt(selectedNiche, businessModel, advisorSummary))
                        : null;
                    setRevenueProjection(raw ? parseAIJson(raw) : MOCK_REVENUE_PROJECTION);
                } catch {
                    setRevenueProjection(MOCK_REVENUE_PROJECTION);
                } finally {
                    setLoading(false);
                }
            };
            if (hasKey && selectedNiche && businessModel) {
                generate();
            } else {
                const timer = setTimeout(() => {
                    setRevenueProjection(MOCK_REVENUE_PROJECTION);
                    setLoading(false);
                }, 1500);
                return () => clearTimeout(timer);
            }
        } else {
            setLoading(false);
        }
    }, []);

    const handleContinue = () => {
        completeStep(4);
        setCurrentStep(5);
    };

    if (loading) {
        return (
            <div className="loading-state">
                <div className="spinner" />
                <p style={{ fontSize: 'var(--text-lg)' }}>Building your financial model...</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>Projecting 12 months across 3 scenarios</p>
            </div>
        );
    }

    if (!revenueProjection) return null;
    const r = revenueProjection;
    const mult = SCENARIO_MULTIPLIERS[scenario];

    const formatCurrency = (n: number) => `$${Math.round(n * mult).toLocaleString()}`;
    const totalRevenue = r.months.reduce((s, m) => s + m.revenue * mult, 0);
    const totalProfit = r.months.reduce((s, m) => s + m.netProfit * mult, 0);

    return (
        <div className="animate-fade-in">
            <div className="step-header">
                <div className="step-number">Step 4 of 7</div>
                <h2 className="step-title">Revenue Projector</h2>
                <p className="step-description">12-month financial model with three growth scenarios.</p>
            </div>

            {/* Assumptions */}
            <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
                <div className="card-header">
                    <h3 className="card-title">Key Assumptions</h3>
                </div>
                <div className="data-grid data-grid-3" style={{ gap: 'var(--space-3)' }}>
                    {Object.entries(r.assumptions).map(([key, val]) => (
                        <div key={key} className="metric-card">
                            <div className="metric-label">{key}</div>
                            <div className="metric-value" style={{ fontSize: 'var(--text-base)' }}>{val}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Summary metrics */}
            <div className="data-grid data-grid-3" style={{ marginBottom: 'var(--space-4)' }}>
                <div className="metric-card" style={{ background: 'var(--color-success-light)', border: '1px solid var(--color-success)' }}>
                    <div className="metric-label">12-Month Revenue</div>
                    <div className="metric-value">{formatCurrency(totalRevenue / mult * mult)}</div>
                </div>
                <div className="metric-card">
                    <div className="metric-label">12-Month Net Profit</div>
                    <div className="metric-value">{formatCurrency(totalProfit / mult * mult)}</div>
                </div>
                <div className="metric-card">
                    <div className="metric-label">Month 12 Revenue</div>
                    <div className="metric-value">{formatCurrency(r.months[11].revenue)}</div>
                </div>
            </div>

            {/* Scenario tabs */}
            <div className="tabs">
                {(['conservative', 'base', 'aggressive'] as const).map(s => (
                    <button key={s} className={`tab ${scenario === s ? 'active' : ''}`} onClick={() => setScenario(s)}>
                        {s === 'conservative' ? '🐢 Conservative (50%)' : s === 'base' ? '📊 Base (100%)' : '🚀 Aggressive (150%)'}
                    </button>
                ))}
            </div>

            {/* Revenue table */}
            <div className="card" style={{ padding: 'var(--space-2)', marginBottom: 'var(--space-4)', overflow: 'auto' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>New Clients</th>
                            <th>Total</th>
                            <th>Revenue</th>
                            <th>Costs</th>
                            <th>Net Profit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {r.months.map(m => {
                            const isMilestone = r.milestones.some(ms => ms.month === m.month);
                            return (
                                <tr key={m.month} className={isMilestone ? 'highlight-row' : ''}>
                                    <td>
                                        {m.month}
                                        {isMilestone && (
                                            <Flag size={12} style={{ marginLeft: 4, color: 'var(--color-success)', verticalAlign: 'middle' }} />
                                        )}
                                    </td>
                                    <td>{Math.round(m.newClients * mult)}</td>
                                    <td>{Math.round(m.totalClients * mult)}</td>
                                    <td style={{ color: 'var(--color-success)' }}>{formatCurrency(m.revenue)}</td>
                                    <td style={{ color: 'var(--color-danger)' }}>{formatCurrency(m.costs)}</td>
                                    <td style={{ fontWeight: 600 }}>{formatCurrency(m.netProfit)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Milestones */}
            <div className="data-grid data-grid-3" style={{ marginBottom: 'var(--space-4)' }}>
                {r.milestones.map((ms, i) => (
                    <div key={i} className="card" style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
                        <Flag size={24} style={{ color: 'var(--color-accent)', margin: '0 auto var(--space-2)' }} />
                        <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{ms.label}</div>
                        <div className="mono" style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-primary)', marginTop: 'var(--space-1)' }}>
                            Month {ms.month}
                        </div>
                    </div>
                ))}
            </div>

            {/* Critical variable */}
            <div className="card" style={{ borderLeft: '4px solid var(--color-warning)', marginBottom: 'var(--space-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                    <AlertTriangle size={18} style={{ color: 'var(--color-warning)' }} />
                    <h4 style={{ fontSize: 'var(--text-base)', color: 'var(--color-warning)' }}>Critical Variable</h4>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>{r.criticalVariable}</p>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 4 }}>Mitigation</div>
                <p style={{ fontSize: 'var(--text-sm)' }}>{r.mitigation}</p>
            </div>

            <div className="step-nav">
                <button className="btn btn-outline" onClick={() => setCurrentStep(3)}>
                    <ArrowLeft size={16} /> Back to Validation
                </button>
                <button className="btn btn-primary btn-lg" onClick={handleContinue}>
                    Create Messaging <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
}
