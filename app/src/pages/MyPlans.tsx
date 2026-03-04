import { FolderOpen, Download, Clock } from 'lucide-react';
import { useApp } from '../store/store';
import { useNavigate } from 'react-router-dom';

export default function MyPlans() {
    const { planName, completedSteps, planStartDate } = useApp();
    const navigate = useNavigate();
    const hasActivePlan = planName && completedSteps.length > 0;

    return (
        <main className="app-main">
            <div className="step-header animate-fade-in">
                <h2 className="step-title">My Plans</h2>
                <p className="step-description">Saved business plans, exports, and version history.</p>
            </div>

            {hasActivePlan ? (
                <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                    <div className="card" style={{ cursor: 'pointer' }} onClick={() => navigate('/lab')}>
                        <div className="card-header">
                            <div>
                                <h3 className="card-title">{planName}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-1)' }}>
                                    <Clock size={14} style={{ color: 'var(--text-tertiary)' }} />
                                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Started {planStartDate}</span>
                                </div>
                            </div>
                            <span className={`card-badge ${completedSteps.length === 7 ? 'badge-success' : 'badge-warning'}`}>
                                {completedSteps.length}/7 steps
                            </span>
                        </div>
                        <div className="score-bar-container">
                            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Progress</span>
                            <div className="score-bar">
                                <div className="score-bar-fill high" style={{ width: `${(completedSteps.length / 7) * 100}%` }} />
                            </div>
                            <span className="score-value">{Math.round((completedSteps.length / 7) * 100)}%</span>
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
                            <button className="btn btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); navigate('/lab'); }}>
                                Continue
                            </button>
                            <button className="btn btn-outline btn-sm" onClick={(e) => { e.stopPropagation(); }}>
                                <Download size={14} /> Export PDF
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="empty-state animate-fade-in">
                    <div className="empty-state-icon">
                        <FolderOpen size={64} />
                    </div>
                    <h3>No Plans Yet</h3>
                    <p>Start your first business plan in the Innovation Lab to see it here.</p>
                    <button className="btn btn-primary btn-lg" style={{ marginTop: 'var(--space-4)' }} onClick={() => navigate('/lab')}>
                        Start Innovation Lab
                    </button>
                </div>
            )}
        </main>
    );
}
