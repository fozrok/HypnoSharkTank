import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../store/store';
import { FEATURE_STEPS } from '../data/mockData';
import {
    LayoutDashboard, Lightbulb, Settings,
    Sun, Moon, Check, Zap, BookOpen
} from 'lucide-react';

// ─── Underwater background animation ─────────────────────────────
const BUBBLES = [
    { left: '8%', size: 6, dur: 14, delay: 0 },
    { left: '18%', size: 4, dur: 18, delay: 3 },
    { left: '32%', size: 9, dur: 12, delay: 6 },
    { left: '47%', size: 5, dur: 20, delay: 1 },
    { left: '61%', size: 7, dur: 16, delay: 8 },
    { left: '74%', size: 4, dur: 22, delay: 4 },
    { left: '85%', size: 8, dur: 15, delay: 2 },
    { left: '93%', size: 5, dur: 19, delay: 7 },
];

const RAYS = [
    { left: '15%', width: 80, dur: 18, delay: 0 },
    { left: '37%', width: 120, dur: 24, delay: 5 },
    { left: '62%', width: 90, dur: 20, delay: 10 },
    { left: '82%', width: 70, dur: 22, delay: 3 },
];

export function UnderwaterBackground() {
    return (
        <div className="underwater-bg" aria-hidden="true">
            {/* Soft caustic gradient layer */}
            <div className="underwater-caustic" />

            {/* Light rays from above */}
            {RAYS.map((ray, i) => (
                <div
                    key={i}
                    className="underwater-ray"
                    style={{
                        left: ray.left,
                        width: ray.width,
                        animationDuration: `${ray.dur}s`,
                        animationDelay: `${ray.delay}s`,
                    }}
                />
            ))}

            {/* Rising bubbles */}
            {BUBBLES.map((b, i) => (
                <div
                    key={i}
                    className="underwater-bubble"
                    style={{
                        left: b.left,
                        width: b.size,
                        height: b.size,
                        animationDuration: `${b.dur}s`,
                        animationDelay: `${b.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}

const NAV_ITEMS = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/lab', icon: Lightbulb, label: 'Innovation Lab' },
    { to: '/instructions', icon: BookOpen, label: 'Instructions' },
    { to: '/settings', icon: Settings, label: 'Settings' },
];

export function TopBar() {
    const { theme, toggleTheme } = useApp();

    return (
        <header className="topbar">
            <NavLink to="/" className="topbar-logo" style={{ textDecoration: 'none' }}>
                <Zap size={24} />
                <span>CoachSharkTank</span>
            </NavLink>

            <nav className="topbar-nav">
                {NAV_ITEMS.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === '/'}
                        className={({ isActive }) => `topbar-nav-item ${isActive ? 'active' : ''}`}
                    >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="topbar-actions">
                <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
            </div>
        </header>
    );
}

export function ProgressRail() {
    const { currentStep, completedSteps, planName, planStartDate, setCurrentStep } = useApp();
    const location = useLocation();
    const isLabRoute = location.pathname.startsWith('/lab');

    if (!isLabRoute) return null;

    return (
        <aside className="sidebar">
            <div className="progress-rail-title">Progress</div>
            <div className="progress-rail">
                {FEATURE_STEPS.map((step, idx) => {
                    const isCompleted = completedSteps.includes(step.id);
                    const isActive = currentStep === step.id;
                    const isPending = !isCompleted && !isActive;
                    const status = isCompleted ? 'completed' : isActive ? 'active' : 'pending';

                    return (
                        <React.Fragment key={step.id}>
                            <div
                                className={`progress-step ${status}`}
                                onClick={() => {
                                    if (isCompleted || isActive) {
                                        setCurrentStep(step.id);
                                    }
                                }}
                                style={{ cursor: isCompleted || isActive ? 'pointer' : 'default', opacity: isPending ? 0.5 : 1 }}
                            >
                                <div className={`step-indicator ${status}`}>
                                    {isCompleted ? <Check size={14} /> : step.id}
                                </div>
                                <div className="step-content">
                                    <div className="step-label">{step.name}</div>
                                    <div className="step-status">
                                        {isCompleted ? 'Completed' : isActive ? 'In Progress' : ''}
                                    </div>
                                </div>
                            </div>
                            {idx < FEATURE_STEPS.length - 1 && (
                                <div className={`step-connector ${isCompleted ? 'completed' : ''}`} />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {planName && (
                <div className="sidebar-footer">
                    <div className="plan-info">
                        <div className="plan-info-label">Current Plan</div>
                        <div className="plan-info-value">{planName}</div>
                        <div className="plan-info-label" style={{ marginTop: '8px' }}>Started</div>
                        <div className="plan-info-value">{planStartDate}</div>
                    </div>
                </div>
            )}
        </aside>
    );
}

export function BottomTabs() {
    return (
        <nav className="bottom-tabs">
            {NAV_ITEMS.map(item => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) => `bottom-tab ${isActive ? 'active' : ''}`}
                >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                </NavLink>
            ))}
        </nav>
    );
}
