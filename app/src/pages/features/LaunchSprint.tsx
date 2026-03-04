import { useState, useEffect } from 'react';
import { useApp } from '../../store/store';
import { MOCK_LAUNCH_PLAN } from '../../data/mockData';
import { ArrowLeft, ArrowRight, CalendarDays, Target, Check } from 'lucide-react';
import { callAI, parseAIJson } from '../../services/aiService';
import { buildLaunchPrompt } from '../../services/prompts';

export default function LaunchSprint() {
    const { launchPlan, setLaunchPlan, completeStep, setCurrentStep, selectedNiche, businessModel, feedingFrenzy } = useApp();
    const [loading, setLoading] = useState(!launchPlan);
    const [activeWeek, setActiveWeek] = useState(1);
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (!launchPlan) {
            const hasKey = !!localStorage.getItem('openrouter_api_key');
            const advisorSummary = feedingFrenzy?.approvedAdvice
                .map(a => `${a.shark}: ${a.keyRecommendation}`).join('; ') ?? '';
            const generate = async () => {
                try {
                    const raw = selectedNiche && businessModel
                        ? await callAI(buildLaunchPrompt(selectedNiche, businessModel, advisorSummary))
                        : null;
                    setLaunchPlan(raw ? parseAIJson(raw) : MOCK_LAUNCH_PLAN);
                } catch {
                    setLaunchPlan(MOCK_LAUNCH_PLAN);
                } finally {
                    setLoading(false);
                }
            };
            if (hasKey && selectedNiche && businessModel) {
                generate();
            } else {
                const timer = setTimeout(() => {
                    setLaunchPlan(MOCK_LAUNCH_PLAN);
                    setLoading(false);
                }, 1500);
                return () => clearTimeout(timer);
            }
        } else {
            setLoading(false);
        }
    }, []);

    const toggleCheck = (weekDay: string) => {
        setCheckedItems(prev => ({ ...prev, [weekDay]: !prev[weekDay] }));
    };

    const handleContinue = () => {
        completeStep(6);
        setCurrentStep(7);
    };

    if (loading) {
        return (
            <div className="loading-state">
                <div className="spinner" />
                <p style={{ fontSize: 'var(--text-lg)' }}>Planning your launch sprint...</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>Creating a 30-day execution plan with daily actions</p>
            </div>
        );
    }

    if (!launchPlan) return null;
    const lp = launchPlan;
    const currentWeek = lp.weeks.find(w => w.week === activeWeek)!;

    return (
        <div className="animate-fade-in">
            <div className="step-header">
                <div className="step-number">Step 6 of 7</div>
                <h2 className="step-title">30-Day Launch Sprint</h2>
                <p className="step-description">Your week-by-week execution plan. Know exactly what to do each day.</p>
            </div>

            {/* Week Tabs */}
            <div className="tabs">
                {lp.weeks.map(w => (
                    <button key={w.week} className={`tab ${activeWeek === w.week ? 'active' : ''}`} onClick={() => setActiveWeek(w.week)}>
                        <CalendarDays size={14} style={{ marginRight: 4 }} />
                        Week {w.week}
                    </button>
                ))}
            </div>

            {/* Week Content */}
            <div className="card animate-fade-in" style={{ marginBottom: 'var(--space-6)' }}>
                <div className="card-header">
                    <div>
                        <h3 className="card-title">Week {currentWeek.week}: {currentWeek.theme}</h3>
                    </div>
                    <span className="card-badge badge-recommended">
                        {Object.keys(checkedItems).filter(k => k.startsWith(`${activeWeek}-`) && checkedItems[k]).length}/{currentWeek.actions.length} done
                    </span>
                </div>

                <ul className="checklist">
                    {currentWeek.actions.map((action, i) => {
                        const key = `${activeWeek}-${i}`;
                        const isChecked = checkedItems[key] || false;
                        return (
                            <li key={i} className={`checklist-item ${isChecked ? 'checked' : ''}`}>
                                <div className={`checklist-checkbox ${isChecked ? 'checked' : ''}`} onClick={() => toggleCheck(key)}>
                                    {isChecked && <Check size={12} />}
                                </div>
                                <div>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-accent)', fontWeight: 600 }}>{action.day}</span>
                                    <div className="checklist-text">{action.action}</div>
                                </div>
                            </li>
                        );
                    })}
                </ul>

                <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--bg-sidebar)', borderRadius: 'var(--border-radius-md)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                        <Target size={14} style={{ color: 'var(--color-primary)' }} />
                        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Week {currentWeek.week} Benchmark</span>
                    </div>
                    <p style={{ fontSize: 'var(--text-sm)' }}>{currentWeek.benchmark}</p>
                </div>
            </div>

            {/* KPI Dashboard */}
            <div className="section">
                <div className="section-header">
                    <h3 className="section-title">KPI Dashboard</h3>
                </div>
                <div className="data-grid data-grid-3">
                    {lp.kpis.map((kpi, i) => (
                        <div key={i} className="metric-card">
                            <div className="metric-label">{kpi.metric}</div>
                            <div className="metric-value" style={{ fontSize: 'var(--text-lg)' }}>{kpi.target}</div>
                            <div className="metric-change positive">Stretch: {kpi.good}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Month 1 Scorecard */}
            <div className="insight-box">
                <div className="insight-box-title">Month 1 Scorecard</div>
                <div className="insight-box-content">{lp.scorecard}</div>
            </div>

            <div className="step-nav">
                <button className="btn btn-outline" onClick={() => setCurrentStep(5)}>
                    <ArrowLeft size={16} /> Back to Messaging
                </button>
                <button className="btn btn-primary btn-lg" onClick={handleContinue}>
                    Run Reality Check <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
}
