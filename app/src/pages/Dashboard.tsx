import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/store';
import {
    Lightbulb, ArrowRight, Zap, Target,
    BarChart3, MessageSquare, Rocket, Shield
} from 'lucide-react';

const FEATURE_ICONS = [Target, Zap, Shield, BarChart3, MessageSquare, Rocket, Lightbulb];

export default function Dashboard() {
    const { completedSteps, planName } = useApp();
    const navigate = useNavigate();

    const features = [
        { title: 'Niche Finder', desc: 'Discover your highest-potential niche based on skills, market demand, and fit.', color: 'var(--color-primary)' },
        { title: 'Model Builder', desc: 'Transform your niche into a complete business model with pricing and positioning.', color: 'var(--color-accent)' },
        { title: 'Market Validator', desc: 'Stress-test your idea with market size, competitor analysis, and demand signals.', color: 'var(--color-success)' },
        { title: 'Revenue Projector', desc: 'Build a 12-month financial model with three growth scenarios.', color: 'var(--color-warning)' },
        { title: 'Messaging Engine', desc: 'Create content hooks, outreach sequences, and trust-building language.', color: '#8b5cf6' },
        { title: 'Launch Sprint', desc: 'Get a 30-day, day-by-day execution plan with KPIs and benchmarks.', color: '#ec4899' },
        { title: 'Reality Check', desc: 'Audit your plan for blind spots, missed opportunities, and failure patterns.', color: 'var(--color-danger)' },
    ];

    return (
        <main className="app-main">
            <div className="dashboard-hero animate-fade-in">
                <h1>Welcome to CoachSharkTank</h1>
                <p>
                    Your business innovation engine. Go from idea paralysis to a launchable business plan in 60 minutes.
                </p>
                <button className="btn btn-accent btn-lg" onClick={() => navigate('/lab')}>
                    {planName ? 'Continue Your Plan' : 'Start Innovation Lab'}
                    <ArrowRight size={20} />
                </button>
            </div>

            {completedSteps.length > 0 && (
                <div className="section animate-fade-in" style={{ animationDelay: '100ms' }}>
                    <div className="data-grid data-grid-3" style={{ marginBottom: 'var(--space-8)' }}>
                        <div className="metric-card">
                            <div className="metric-label">Steps Completed</div>
                            <div className="metric-value">{completedSteps.length}/7</div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-label">Current Plan</div>
                            <div className="metric-value" style={{ fontSize: 'var(--text-lg)' }}>{planName || '—'}</div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-label">Status</div>
                            <div className="metric-value" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-success)' }}>
                                {completedSteps.length === 7 ? 'Complete ✓' : 'In Progress'}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="section animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="section-header">
                    <div>
                        <h3 className="section-title">The 7-Step Innovation Chain</h3>
                        <p className="section-subtitle">Each step builds on the last to create a complete, actionable business plan.</p>
                    </div>
                </div>

                <div className="dashboard-cards">
                    {features.map((f, i) => {
                        const Icon = FEATURE_ICONS[i];
                        const isComplete = completedSteps.includes(i + 1);
                        return (
                            <div key={i} className={`card animate-fade-in stagger-${i + 1}`} style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }} onClick={() => navigate('/lab')}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: f.color, opacity: isComplete ? 1 : 0.3 }} />
                                <div className="card-header">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                        <div style={{
                                            width: 40, height: 40, borderRadius: 'var(--border-radius-md)',
                                            background: `${f.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: f.color
                                        }}>
                                            <Icon size={20} />
                                        </div>
                                        <span className="card-title" style={{ fontSize: 'var(--text-base)' }}>{f.title}</span>
                                    </div>
                                    {isComplete && <span className="card-badge badge-success">Done</span>}
                                </div>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{f.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="section animate-fade-in" style={{ animationDelay: '400ms', marginTop: 'var(--space-12)' }}>
                <div className="insight-box">
                    <div className="insight-box-title">Built for Your Industry</div>
                    <div className="insight-box-content">
                        CoachSharkTank is designed specifically for coaches, therapists, and healers. Every recommendation is calibrated for session-based, trust-driven businesses — not generic startup advice.
                    </div>
                </div>
            </div>
        </main>
    );
}
