import { useState, useEffect } from 'react';
import { useApp } from '../../store/store';
import { MOCK_REALITY_CHECK } from '../../data/mockData';
import { ArrowLeft, AlertTriangle, CheckCircle, XCircle, Lightbulb, Sparkles, ShieldAlert, TrendingUp, FileText, FileJson, FileType } from 'lucide-react';
import { exportPlanAsMarkdown, exportPlanAsJSON, exportPlanAsText, downloadFile } from '../../utils/exportUtils';
import { callAI, parseAIJson } from '../../services/aiService';
import { buildRealityCheckPrompt } from '../../services/prompts';

export default function RealityCheck() {
    const appState = useApp();
    const { realityCheck, setRealityCheck, completeStep, setCurrentStep, selectedNiche, businessModel, feedingFrenzy } = appState;
    const [loading, setLoading] = useState(!realityCheck);
    const [exportedFormat, setExportedFormat] = useState<string | null>(null);

    useEffect(() => {
        if (!realityCheck) {
            const hasKey = !!localStorage.getItem('openrouter_api_key');
            const advisorSummary = feedingFrenzy?.approvedAdvice
                .map(a => `${a.shark}: ${a.keyRecommendation}`).join('; ') ?? '';
            const generate = async () => {
                try {
                    const raw = selectedNiche && businessModel
                        ? await callAI(buildRealityCheckPrompt(selectedNiche, businessModel, advisorSummary))
                        : null;
                    setRealityCheck(raw ? parseAIJson(raw) : MOCK_REALITY_CHECK);
                } catch {
                    setRealityCheck(MOCK_REALITY_CHECK);
                } finally {
                    setLoading(false);
                }
            };
            if (hasKey && selectedNiche && businessModel) {
                generate();
            } else {
                const timer = setTimeout(() => {
                    setRealityCheck(MOCK_REALITY_CHECK);
                    setLoading(false);
                }, 2000);
                return () => clearTimeout(timer);
            }
        } else {
            setLoading(false);
        }
    }, []);

    const handleFinish = () => {
        completeStep(7);
    };

    const handleExport = (format: 'markdown' | 'json' | 'text') => {
        handleFinish();
        let content: string, filename: string, mime: string;
        switch (format) {
            case 'markdown':
                content = exportPlanAsMarkdown(appState);
                filename = 'CoachSharkTank-BusinessPlan.md';
                mime = 'text/markdown';
                break;
            case 'json':
                content = exportPlanAsJSON(appState);
                filename = 'CoachSharkTank-BusinessPlan.json';
                mime = 'application/json';
                break;
            case 'text':
                content = exportPlanAsText(appState);
                filename = 'CoachSharkTank-BusinessPlan.txt';
                mime = 'text/plain';
                break;
        }
        downloadFile(content, filename, mime);
        setExportedFormat(format);
        setTimeout(() => setExportedFormat(null), 3000);
    };

    if (loading) {
        return (
            <div className="loading-state">
                <div className="spinner" />
                <p style={{ fontSize: 'var(--text-lg)' }}>Running your reality check...</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>Auditing for failure patterns, blind spots, and missed opportunities</p>
            </div>
        );
    }

    if (!realityCheck) return null;
    const rc = realityCheck;

    return (
        <div className="animate-fade-in">
            <div className="step-header">
                <div className="step-number">Step 7 of 7</div>
                <h2 className="step-title">Reality Check Auditor</h2>
                <p className="step-description">Your plan has been audited against common failure patterns. Here's the unvarnished truth.</p>
            </div>

            {/* One-Sentence Insight — Hero */}
            <div className="card animate-scale-in" style={{
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                color: 'white', padding: 'var(--space-8)', textAlign: 'center', marginBottom: 'var(--space-6)',
                borderColor: 'transparent'
            }}>
                <Sparkles size={32} style={{ margin: '0 auto var(--space-3)', opacity: 0.8 }} />
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)', opacity: 0.8 }}>The One Insight That Changes Everything</div>
                <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.7, maxWidth: 600, margin: '0 auto', color: 'rgba(255,255,255,0.95)' }}>
                    "{rc.oneSentenceInsight}"
                </p>
            </div>

            {/* Failure Pattern Matcher */}
            <div className="section">
                <div className="section-header">
                    <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <ShieldAlert size={20} /> Failure Pattern Audit
                    </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {rc.failurePatterns.map((fp, i) => (
                        <div key={i} className="card" style={{
                            padding: 'var(--space-4)',
                            borderLeft: `3px solid ${fp.applies ? 'var(--color-warning)' : 'var(--color-success)'}`,
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                                {fp.applies ? (
                                    <AlertTriangle size={18} style={{ color: 'var(--color-warning)', flexShrink: 0 }} />
                                ) : (
                                    <CheckCircle size={18} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                                )}
                                <div>
                                    <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{fp.pattern}</span>
                                    <span className={`card-badge ${fp.applies ? 'badge-warning' : 'badge-success'}`} style={{ marginLeft: 'var(--space-2)' }}>
                                        {fp.applies ? 'APPLIES' : 'CLEAR'}
                                    </span>
                                </div>
                            </div>
                            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginLeft: 'calc(18px + var(--space-3))' }}>{fp.detail}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Missed Opportunities */}
            <div className="section">
                <div className="section-header">
                    <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <TrendingUp size={20} /> Missed Opportunities
                    </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {rc.missedOpportunities.map((opp, i) => (
                        <div key={i} className="card" style={{ borderLeft: '3px solid var(--color-accent)' }}>
                            <h4 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)', color: 'var(--color-accent)' }}>{opp.title}</h4>
                            <p style={{ fontSize: 'var(--text-sm)' }}>{opp.impact}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contrarian Play */}
            <div className="section">
                <div className="insight-box" style={{ borderLeftColor: 'var(--color-primary)' }}>
                    <div className="insight-box-title" style={{ color: 'var(--color-primary)' }}>
                        <Lightbulb size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> Contrarian Play
                    </div>
                    <div className="insight-box-content">{rc.contrarianPlay}</div>
                </div>
            </div>

            {/* Stall Risk */}
            <div className="section">
                <div className="card" style={{ borderLeft: '4px solid var(--color-danger)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                        <XCircle size={18} style={{ color: 'var(--color-danger)' }} />
                        <h4 style={{ fontSize: 'var(--text-base)', color: 'var(--color-danger)' }}>Stall Risk</h4>
                    </div>
                    <p style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>{rc.stallRisk}</p>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 4 }}>Prevention Strategy</div>
                    <p style={{ fontSize: 'var(--text-sm)' }}>{rc.stallPrevention}</p>
                </div>
            </div>

            {/* Completion + Export */}
            {realityCheck && (
                <div className="card animate-scale-in" style={{
                    textAlign: 'center', padding: 'var(--space-8)', border: '2px solid var(--color-success)',
                    background: 'var(--color-success-light)'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: 'var(--space-3)' }}>🎉</div>
                    <h3 style={{ marginBottom: 'var(--space-2)' }}>Plan Complete!</h3>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto var(--space-6)' }}>
                        Your complete, audited business plan is ready to download. Choose your preferred format below.
                    </p>

                    <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
                        <button className="btn btn-primary btn-lg" onClick={() => handleExport('markdown')}>
                            <FileText size={18} />
                            {exportedFormat === 'markdown' ? 'Downloaded!' : 'Download as Markdown'}
                        </button>
                        <button className="btn btn-outline btn-lg" onClick={() => handleExport('json')}>
                            <FileJson size={18} />
                            {exportedFormat === 'json' ? 'Downloaded!' : 'Download as JSON'}
                        </button>
                        <button className="btn btn-outline btn-lg" onClick={() => handleExport('text')}>
                            <FileType size={18} />
                            {exportedFormat === 'text' ? 'Downloaded!' : 'Download as Text'}
                        </button>
                    </div>

                    <button className="btn btn-ghost" onClick={() => setCurrentStep(1)} style={{ marginTop: 'var(--space-2)' }}>
                        <ArrowLeft size={16} /> Review from Start
                    </button>
                </div>
            )}

            <div className="step-nav">
                <button className="btn btn-outline" onClick={() => setCurrentStep(6)}>
                    <ArrowLeft size={16} /> Back to Launch Sprint
                </button>
                <div />
            </div>
        </div>
    );
}
