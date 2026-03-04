import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../../store/store';
import type { SharkEvaluation, AdviceStatus } from '../../store/store';
import { MOCK_SHARK_EVALUATIONS, MOCK_SHARK_ADVICE } from '../../data/mockData';
import { ArrowRight, CheckCircle, XCircle, ChevronDown, ChevronUp, Trophy, AlertTriangle, Zap } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────
type Phase = 'pitch' | 'reveal' | 'select' | 'advice' | 'summary';

// ─── Helpers ──────────────────────────────────────────────────────
function getVerdictLabel(verdict: SharkEvaluation['verdict']) {
    if (verdict === 'invest') return 'INVEST';
    if (verdict === 'conditional_invest') return 'CONDITIONAL';
    return 'PASS';
}

function getVerdictColor(verdict: SharkEvaluation['verdict']) {
    if (verdict === 'invest') return 'var(--color-success, #10b981)';
    if (verdict === 'conditional_invest') return '#f59e0b';
    return 'var(--color-error, #ef4444)';
}

function getTitleFromCount(count: number) {
    if (count === 7) return { label: 'Feeding Frenzy Champion 🏆', color: '#10b981' };
    if (count >= 5) return { label: 'Strong Contender 🦈', color: '#06b6d4' };
    if (count >= 3) return { label: 'In the Game ⚡', color: '#8b5cf6' };
    if (count >= 1) return { label: 'Underdog 💪', color: '#f59e0b' };
    return { label: 'Back to the Drawing Board', color: '#ef4444' };
}

// ─── Shark Card Component ─────────────────────────────────────────
function SharkCard({
    shark,
    phase,
    onHelpSelect,
    onConditionAccept,
}: {
    shark: SharkEvaluation;
    phase: Phase;
    onHelpSelect: (sharkId: string, helpId: string) => void;
    onConditionAccept: (sharkId: string, accepted: boolean) => void;
}) {
    const [expanded, setExpanded] = useState(true);
    const isPassing = shark.verdict === 'pass' || (shark.verdict === 'conditional_invest' && shark.conditionAccepted === false);
    const isConditionalPending = shark.verdict === 'conditional_invest' && shark.conditionAccepted === undefined;
    const isActive = shark.verdict === 'invest' || (shark.verdict === 'conditional_invest' && shark.conditionAccepted === true);

    return (
        <div
            className="shark-card animate-fade-in"
            style={{
                borderLeft: `4px solid ${isPassing ? 'var(--border-color)' : shark.accentColor}`,
                opacity: isPassing ? 0.55 : 1,
                background: 'var(--surface)',
                borderRadius: 'var(--radius-lg)',
                marginBottom: 'var(--space-4)',
                overflow: 'hidden',
                transition: 'opacity 0.4s ease, box-shadow 0.2s ease',
                boxShadow: isActive ? `0 0 0 1px ${shark.accentColor}22, var(--shadow-md)` : 'var(--shadow-sm)',
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-4)',
                    cursor: 'pointer',
                    userSelect: 'none',
                }}
                onClick={() => setExpanded(e => !e)}
            >
                {/* Avatar */}
                <div style={{
                    width: 52, height: 52, borderRadius: '50%',
                    background: `${shark.accentColor}18`,
                    border: `2px solid ${shark.accentColor}55`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24, flexShrink: 0,
                }}>
                    {shark.emoji}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--text-primary)' }}>{shark.name}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 2 }}>{shark.title}</div>
                </div>

                {/* Score + Verdict */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexShrink: 0 }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 2 }}>Score</div>
                        <div style={{ fontWeight: 700, fontSize: 'var(--text-lg)', color: shark.accentColor }}>{shark.score}/10</div>
                    </div>
                    <div style={{
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        background: `${getVerdictColor(shark.verdict)}18`,
                        border: `1px solid ${getVerdictColor(shark.verdict)}44`,
                        fontSize: 'var(--text-xs)',
                        fontWeight: 700,
                        color: isPassing ? 'var(--text-tertiary)' : getVerdictColor(shark.verdict),
                        letterSpacing: '0.05em',
                    }}>
                        {getVerdictLabel(isPassing ? 'pass' : isConditionalPending ? 'conditional_invest' : shark.verdict)}
                    </div>
                    {expanded ? <ChevronUp size={16} color="var(--text-tertiary)" /> : <ChevronDown size={16} color="var(--text-tertiary)" />}
                </div>
            </div>

            {/* Score Bar */}
            <div style={{ padding: '0 var(--space-4) var(--space-2)', display: expanded ? undefined : 'none' }}>
                <div style={{ height: 6, borderRadius: 3, background: 'var(--border-light)', overflow: 'hidden' }}>
                    <div style={{
                        height: '100%',
                        width: `${shark.score * 10}%`,
                        background: isPassing ? 'var(--border-color)' : shark.accentColor,
                        borderRadius: 3,
                        transition: 'width 1s ease',
                    }} />
                </div>
            </div>

            {/* Body */}
            {expanded && (
                <div style={{ padding: '0 var(--space-4) var(--space-4)' }}>
                    {/* Observations */}
                    <div style={{ marginBottom: 'var(--space-3)' }}>
                        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-2)' }}>
                            Key Observations
                        </div>
                        {shark.observations.map((obs, i) => (
                            <div key={i} style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-1)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                <span style={{ color: shark.accentColor, flexShrink: 0, marginTop: 1 }}>•</span>
                                <span>{obs}</span>
                            </div>
                        ))}
                    </div>

                    {/* Critical Question */}
                    <div style={{
                        background: `${shark.accentColor}0d`,
                        border: `1px solid ${shark.accentColor}22`,
                        borderRadius: 'var(--radius-md)',
                        padding: 'var(--space-3)',
                        marginBottom: 'var(--space-3)',
                    }}>
                        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: shark.accentColor, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Critical Question</div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.6 }}>"{shark.criticalQuestion}"</div>
                    </div>

                    {/* PASS: What Would Change My Mind */}
                    {isPassing && shark.whatWouldChangeMind && (
                        <div style={{
                            background: 'var(--surface-raised)',
                            borderRadius: 'var(--radius-md)',
                            padding: 'var(--space-3)',
                        }}>
                            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>What Would Change My Mind</div>
                            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{shark.whatWouldChangeMind}</div>
                        </div>
                    )}

                    {/* CONDITIONAL: Accept/Decline */}
                    {isConditionalPending && (
                        <div style={{
                            background: '#f59e0b0d',
                            border: '1px solid #f59e0b33',
                            borderRadius: 'var(--radius-md)',
                            padding: 'var(--space-3)',
                        }}>
                            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: '#f59e0b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>My Condition</div>
                            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-3)' }}>{shark.condition}</div>
                            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                                <button
                                    className="btn btn-primary"
                                    style={{ flex: 1, fontSize: 'var(--text-sm)', background: '#f59e0b', borderColor: '#f59e0b' }}
                                    onClick={() => onConditionAccept(shark.id, true)}
                                >
                                    I Accept This Condition
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    style={{ flex: 1, fontSize: 'var(--text-sm)' }}
                                    onClick={() => onConditionAccept(shark.id, false)}
                                >
                                    I Don't Accept
                                </button>
                            </div>
                        </div>
                    )}

                    {/* INVEST: Help buttons (shown in select phase) */}
                    {isActive && phase === 'select' && (
                        <div>
                            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-2)' }}>
                                How I Can Help — Select One
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                                {shark.helpOptions.map(opt => {
                                    const selected = shark.selectedHelpId === opt.id;
                                    return (
                                        <button
                                            key={opt.id}
                                            onClick={() => onHelpSelect(shark.id, opt.id)}
                                            style={{
                                                display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)',
                                                padding: 'var(--space-3)',
                                                borderRadius: 'var(--radius-md)',
                                                border: `2px solid ${selected ? shark.accentColor : 'var(--border-color)'}`,
                                                background: selected ? `${shark.accentColor}0e` : 'var(--surface)',
                                                cursor: 'pointer', textAlign: 'left',
                                                transition: 'all 0.15s ease',
                                                opacity: shark.selectedHelpId && !selected ? 0.45 : 1,
                                            }}
                                        >
                                            <div style={{
                                                width: 18, height: 18, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                                                border: `2px solid ${selected ? shark.accentColor : 'var(--border-color)'}`,
                                                background: selected ? shark.accentColor : 'transparent',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}>
                                                {selected && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: selected ? shark.accentColor : 'var(--text-primary)', marginBottom: 2 }}>{opt.buttonLabel}</div>
                                                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{opt.description}</div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* INVEST: Show selected button label in reveal phase */}
                    {isActive && phase === 'reveal' && (
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                            You will select how this Shark can help you in the next step.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ─── Advice Card Component ────────────────────────────────────────
function AdviceCard({
    shark,
    onDecision,
}: {
    shark: SharkEvaluation;
    onDecision: (sharkId: string, status: AdviceStatus) => void;
}) {
    const [visible, setVisible] = useState(false);
    const selectedHelp = shark.helpOptions.find(h => h.id === shark.selectedHelpId);
    const decided = shark.adviceStatus !== 'pending';

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 300);
        return () => clearTimeout(t);
    }, []);

    return (
        <div
            className="animate-fade-in"
            style={{
                borderLeft: `4px solid ${shark.accentColor}`,
                background: 'var(--surface)',
                borderRadius: 'var(--radius-lg)',
                marginBottom: 'var(--space-4)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.4s ease',
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-4)', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: `${shark.accentColor}18`,
                    border: `2px solid ${shark.accentColor}55`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, flexShrink: 0,
                }}>
                    {shark.emoji}
                </div>
                <div>
                    <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{shark.name}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: shark.accentColor, fontWeight: 600 }}>{selectedHelp?.buttonLabel}</div>
                </div>
                {decided && (
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                        {shark.adviceStatus === 'approved'
                            ? <><CheckCircle size={16} color="#10b981" /><span style={{ fontSize: 'var(--text-xs)', color: '#10b981', fontWeight: 600 }}>Approved</span></>
                            : <><XCircle size={16} color="#ef4444" /><span style={{ fontSize: 'var(--text-xs)', color: '#ef4444', fontWeight: 600 }}>Declined</span></>
                        }
                    </div>
                )}
            </div>

            {/* Advice Text */}
            <div style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {shark.adviceText}
            </div>

            {/* Agree/Disagree */}
            {!decided && (
                <div style={{ padding: '0 var(--space-4) var(--space-4)', display: 'flex', gap: 'var(--space-3)' }}>
                    <div style={{ height: 1, background: 'var(--border-light)', marginBottom: 'var(--space-4)', flex: '100%' }} />
                </div>
            )}
            {!decided && (
                <div style={{ padding: '0 var(--space-4) var(--space-4)', display: 'flex', gap: 'var(--space-3)' }}>
                    <button
                        className="btn btn-primary"
                        style={{ flex: 1, gap: 6, background: shark.accentColor, borderColor: shark.accentColor }}
                        onClick={() => onDecision(shark.id, 'approved')}
                    >
                        <CheckCircle size={15} /> Agree — Apply to My Plan
                    </button>
                    <button
                        className="btn btn-secondary"
                        style={{ flex: 1, gap: 6 }}
                        onClick={() => onDecision(shark.id, 'declined')}
                    >
                        <XCircle size={15} /> Disagree — Skip This
                    </button>
                </div>
            )}
        </div>
    );
}

// ─── Main FeedingFrenzy Component ─────────────────────────────────
export default function FeedingFrenzy() {
    const {
        selectedNiche, businessModel,
        feedingFrenzy,
        setSharkEvaluations, setHelpSelection, setConditionAccepted,
        setSharkAdvice, setAdviceStatus, completeFeedingFrenzy,
        completeStep, setCurrentStep,
    } = useApp();

    const [phase, setPhase] = useState<Phase>('pitch');
    const [revealedCount, setRevealedCount] = useState(0);
    const [isRevealing, setIsRevealing] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [generatingAdvice, setGeneratingAdvice] = useState(false);

    const evaluations = feedingFrenzy?.evaluations ?? [];
    const revealedSharks = evaluations.slice(0, revealedCount);

    // Compute active (invested) sharks
    const activeSharks = evaluations.filter(e =>
        e.verdict === 'invest' || (e.verdict === 'conditional_invest' && e.conditionAccepted === true)
    );
    const passSharks = evaluations.filter(e =>
        e.verdict === 'pass' || (e.verdict === 'conditional_invest' && e.conditionAccepted === false)
    );
    const conditionalPending = evaluations.filter(e =>
        e.verdict === 'conditional_invest' && e.conditionAccepted === undefined
    );

    // All active sharks must have a selection before we can confirm
    const allSelected = activeSharks.length > 0 && activeSharks.every(e => e.selectedHelpId);
    // All advice items must have a decision before we can continue
    const adviceSharks = activeSharks.filter(e => e.adviceText);
    const allDecided = adviceSharks.length > 0 && adviceSharks.every(e => e.adviceStatus !== 'pending');

    const approvedCount = evaluations.filter(e => e.adviceStatus === 'approved').length;
    const declinedCount = evaluations.filter(e => e.adviceStatus === 'declined').length;

    // ─── Handlers ─────────────────────────────────────────────────

    const handleReleaseTheSharks = useCallback(() => {
        setSharkEvaluations([...MOCK_SHARK_EVALUATIONS]);
        setIsRevealing(true);
        setPhase('reveal');
    }, [setSharkEvaluations]);

    // Sequential reveal effect
    useEffect(() => {
        if (!isRevealing || revealedCount >= MOCK_SHARK_EVALUATIONS.length) {
            if (isRevealing && revealedCount >= MOCK_SHARK_EVALUATIONS.length) {
                setIsRevealing(false);
            }
            return;
        }
        const t = setTimeout(() => {
            setRevealedCount(c => c + 1);
        }, 950);
        return () => clearTimeout(t);
    }, [isRevealing, revealedCount]);

    const handleProceedToSelect = useCallback(() => {
        setPhase('select');
    }, []);

    const handleHelpSelect = useCallback((sharkId: string, helpId: string) => {
        setHelpSelection(sharkId, helpId);
    }, [setHelpSelection]);

    const handleConditionAccept = useCallback((sharkId: string, accepted: boolean) => {
        setConditionAccepted(sharkId, accepted);
    }, [setConditionAccepted]);

    const handleConfirmSelections = useCallback(() => {
        setConfirmModal(false);
        // Generate all advice with a slight stagger mock
        setGeneratingAdvice(true);
        setPhase('advice');
        let delay = 800;
        activeSharks.forEach(shark => {
            if (!shark.selectedHelpId) return;
            const mockAdvice = MOCK_SHARK_ADVICE[shark.selectedHelpId];
            if (!mockAdvice) return;
            setTimeout(() => {
                setSharkAdvice(shark.id, mockAdvice.adviceText, mockAdvice.keyRecommendation);
            }, delay);
            delay += 1200;
        });
        setTimeout(() => setGeneratingAdvice(false), delay);
    }, [activeSharks, setSharkAdvice]);

    const handleAdviceDecision = useCallback((sharkId: string, status: AdviceStatus) => {
        setAdviceStatus(sharkId, status);
    }, [setAdviceStatus]);

    const handleFinishFrenzy = useCallback(() => {
        completeFeedingFrenzy();
        completeStep(3);
        setPhase('summary');
    }, [completeFeedingFrenzy, completeStep]);

    const handleContinue = useCallback(() => {
        setCurrentStep(4);
    }, [setCurrentStep]);

    // ─── Pitch Phase ──────────────────────────────────────────────
    if (phase === 'pitch') {
        return (
            <div className="animate-fade-in" style={{ maxWidth: 680, margin: '0 auto' }}>
                <div style={{ marginBottom: 'var(--space-2)', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Step 3 of 7
                </div>
                <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>
                    🦈 Shark Tank Feeding Frenzy
                </h1>
                <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
                    7 world-class business minds will evaluate your idea. Each will score it, deliver their verdict, and offer specific ways to help. You choose what advice to adopt — and it shapes every step that follows.
                </p>

                {/* Pitch Summary Card */}
                <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
                        <div>
                            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Your Pitch to the Sharks</div>
                            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)' }}>{businessModel?.offerName ?? selectedNiche?.name}</div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                        {[
                            { label: 'Niche', value: selectedNiche?.name },
                            { label: 'Target Client', value: selectedNiche?.idealClient?.split(',')[0] },
                            { label: 'Price Point', value: businessModel?.pricePoint },
                            { label: 'Format', value: businessModel?.format },
                            { label: 'Duration', value: businessModel?.duration },
                            { label: 'Revenue Model', value: businessModel?.pricingModel },
                        ].map(item => item.value ? (
                            <div key={item.label} style={{ background: 'var(--surface-raised)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)' }}>
                                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 2 }}>{item.label}</div>
                                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</div>
                            </div>
                        ) : null)}
                    </div>

                    {businessModel?.transformationPromise && (
                        <div style={{ background: 'var(--accent-subtle)', border: '1px solid var(--accent-muted)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)' }}>
                            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--accent)', marginBottom: 4 }}>Transformation Promise</div>
                            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontStyle: 'italic' }}>"{businessModel.transformationPromise}"</div>
                        </div>
                    )}
                </div>

                {/* Shark avatars preview */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
                    {MOCK_SHARK_EVALUATIONS.map(s => (
                        <div key={s.id} title={s.name} style={{
                            width: 44, height: 44, borderRadius: '50%',
                            background: `${s.accentColor}18`,
                            border: `2px solid ${s.accentColor}55`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 20,
                        }}>
                            {s.emoji}
                        </div>
                    ))}
                </div>

                <button
                    className="btn btn-primary"
                    style={{ width: '100%', fontSize: 'var(--text-md)', padding: 'var(--space-4)', gap: 8, letterSpacing: '0.02em' }}
                    onClick={handleReleaseTheSharks}
                >
                    <Zap size={18} /> Release the Sharks
                </button>
            </div>
        );
    }

    // ─── Reveal Phase ─────────────────────────────────────────────
    if (phase === 'reveal') {
        const allRevealed = revealedCount >= evaluations.length;
        const investCount = revealedSharks.filter(e => e.verdict === 'invest' || e.verdict === 'conditional_invest').length;

        return (
            <div className="animate-fade-in" style={{ maxWidth: 680, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                    <div>
                        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                            Shark Tank Feeding Frenzy
                        </div>
                        <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                            {isRevealing ? 'The Sharks are evaluating...' : 'Verdicts are in'}
                        </h2>
                    </div>
                    <div style={{
                        textAlign: 'center',
                        background: 'var(--surface)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--space-3) var(--space-4)',
                        minWidth: 80,
                    }}>
                        <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: '#10b981' }}>{investCount}</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>of 7 Sharks</div>
                    </div>
                </div>

                {/* Verdict Summary Panel — shows once sharks start revealing */}
                {revealedSharks.length > 0 && (
                    <div style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--space-4)',
                        marginBottom: 'var(--space-5)',
                    }}>
                        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-3)' }}>
                            Verdict Summary
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                            {/* Revealed sharks as chips */}
                            {revealedSharks.map(s => {
                                const isPass = s.verdict === 'pass';
                                const isConditional = s.verdict === 'conditional_invest';
                                const isInvest = !isPass && !isConditional;
                                const chipBg = isPass ? '#6b7280' : isInvest ? '#10b981' : `#f59e0b18`;
                                const chipBorder = isPass ? '#6b7280' : isInvest ? '#10b981' : '#f59e0b55';
                                const chipLabelColor = (isPass || isInvest) ? 'rgba(255,255,255,0.85)' : '#f59e0b';
                                const chipNameColor = (isPass || isInvest) ? '#ffffff' : 'var(--text-primary)';
                                const chipLabel = isPass ? 'Pass' : isConditional ? 'Conditional' : 'Investing';
                                return (
                                    <div key={s.id} style={{
                                        display: 'flex', alignItems: 'center', gap: 6,
                                        padding: '5px 10px',
                                        borderRadius: 'var(--radius-full)',
                                        background: chipBg,
                                        border: `1px solid ${chipBorder}`,
                                    }}>
                                        <span style={{ fontSize: 14 }}>{s.emoji}</span>
                                        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: chipNameColor }}>{s.name}</span>
                                        <span style={{
                                            fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                                            color: chipLabelColor, textTransform: 'uppercase',
                                        }}>{chipLabel}</span>
                                    </div>
                                );
                            })}
                            {/* Placeholder chips for not-yet-revealed sharks */}
                            {MOCK_SHARK_EVALUATIONS.slice(revealedSharks.length).map(s => (
                                <div key={s.id} style={{
                                    display: 'flex', alignItems: 'center', gap: 6,
                                    padding: '5px 10px',
                                    borderRadius: 'var(--radius-full)',
                                    background: 'var(--surface-raised)',
                                    border: '1px solid var(--border-light)',
                                    opacity: 0.4,
                                }}>
                                    <span style={{ fontSize: 14 }}>{s.emoji}</span>
                                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{s.name}</span>
                                    <span style={{ fontSize: 10, color: 'var(--text-tertiary)', fontStyle: 'italic' }}>…</span>
                                </div>
                            ))}
                        </div>

                        {/* Invest / Pass count bar */}
                        {revealedSharks.length > 0 && (
                            <div style={{ marginTop: 'var(--space-3)', display: 'flex', gap: 'var(--space-4)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border-light)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
                                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                                        <strong style={{ color: '#10b981' }}>{revealedSharks.filter(s => s.verdict !== 'pass').length}</strong> Investing
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#6b7280' }} />
                                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                                        <strong style={{ color: '#6b7280' }}>{revealedSharks.filter(s => s.verdict === 'pass').length}</strong> Passing
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--border-color)' }} />
                                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                                        <strong>{MOCK_SHARK_EVALUATIONS.length - revealedSharks.length}</strong> Still deliberating
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {revealedSharks.map(shark => (
                    <SharkCard
                        key={shark.id}
                        shark={shark}
                        phase="reveal"
                        onHelpSelect={handleHelpSelect}
                        onConditionAccept={handleConditionAccept}
                    />
                ))}

                {isRevealing && (
                    <div style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--text-tertiary)' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 8 }}>
                            {[0, 1, 2].map(i => (
                                <div key={i} style={{
                                    width: 8, height: 8, borderRadius: '50%',
                                    background: 'var(--accent)', opacity: 0.7,
                                    animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                                }} />
                            ))}
                        </div>
                        <span style={{ fontSize: 'var(--text-sm)' }}>{MOCK_SHARK_EVALUATIONS[revealedCount]?.name} is deliberating...</span>
                    </div>
                )}

                {allRevealed && (
                    <div className="animate-fade-in" style={{ marginTop: 'var(--space-4)' }}>
                        {activeSharks.length === 0 ? (
                            // No deal
                            <div style={{ textAlign: 'center', padding: 'var(--space-6)', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                                <div style={{ fontSize: 40, marginBottom: 'var(--space-3)' }}>🦈</div>
                                <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>No Sharks Invested</div>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>Review the Shark feedback above, then go back and refine your business model.</p>
                                <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
                                    <button className="btn btn-secondary" onClick={() => setCurrentStep(2)}>← Revise Business Model</button>
                                    <button className="btn btn-secondary" onClick={() => setCurrentStep(1)}>Try a Different Niche</button>
                                </div>
                            </div>
                        ) : (
                            <button
                                className="btn btn-primary"
                                style={{ width: '100%', fontSize: 'var(--text-md)', padding: 'var(--space-4)', gap: 8 }}
                                onClick={handleProceedToSelect}
                            >
                                {investCount} Shark{investCount !== 1 ? 's' : ''} Invested — Select How They Can Help <ArrowRight size={18} />
                            </button>
                        )}
                    </div>
                )}
            </div>
        );
    }

    // ─── Select Phase ─────────────────────────────────────────────
    if (phase === 'select') {
        return (
            <div className="animate-fade-in" style={{ maxWidth: 680, margin: '0 auto' }}>
                <div style={{ marginBottom: 'var(--space-6)' }}>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                        Shark Tank Feeding Frenzy
                    </div>
                    <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 var(--space-1)' }}>
                        Choose Your Help
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                        Select exactly <strong>1 option</strong> per invested Shark. Their advice will be generated based on your choice and will shape the rest of your plan.
                    </p>
                </div>

                {/* Progress indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-5)', padding: 'var(--space-3)', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                        {activeSharks.filter(e => e.selectedHelpId).length} of {activeSharks.length} selections made
                    </div>
                    <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'var(--border-light)', overflow: 'hidden' }}>
                        <div style={{
                            height: '100%',
                            width: `${(activeSharks.filter(e => e.selectedHelpId).length / Math.max(activeSharks.length, 1)) * 100}%`,
                            background: 'var(--accent)', borderRadius: 3, transition: 'width 0.3s ease',
                        }} />
                    </div>
                </div>

                {/* Conditional pending warning */}
                {conditionalPending.length > 0 && (
                    <div style={{ background: '#f59e0b0d', border: '1px solid #f59e0b33', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', marginBottom: 'var(--space-4)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <AlertTriangle size={15} color="#f59e0b" style={{ flexShrink: 0, marginTop: 1 }} />
                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{conditionalPending.length} Shark{conditionalPending.length !== 1 ? 's' : ''} awaiting your decision on their condition — scroll down to respond.</span>
                    </div>
                )}

                {/* Invested Sharks */}
                {activeSharks.map(shark => (
                    <SharkCard key={shark.id} shark={shark} phase="select" onHelpSelect={handleHelpSelect} onConditionAccept={handleConditionAccept} />
                ))}

                {/* Conditional pending */}
                {conditionalPending.map(shark => (
                    <SharkCard key={shark.id} shark={shark} phase="select" onHelpSelect={handleHelpSelect} onConditionAccept={handleConditionAccept} />
                ))}

                {/* Passed Sharks */}
                {passSharks.length > 0 && (
                    <>
                        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                            Sharks Who Passed
                        </div>
                        {passSharks.map(shark => (
                            <SharkCard key={shark.id} shark={shark} phase="select" onHelpSelect={handleHelpSelect} onConditionAccept={handleConditionAccept} />
                        ))}
                    </>
                )}

                <button
                    className="btn btn-primary"
                    style={{
                        width: '100%', fontSize: 'var(--text-md)', padding: 'var(--space-4)', gap: 8, marginTop: 'var(--space-2)',
                        opacity: allSelected && conditionalPending.length === 0 ? 1 : 0.45,
                        cursor: allSelected && conditionalPending.length === 0 ? 'pointer' : 'not-allowed',
                    }}
                    disabled={!allSelected || conditionalPending.length > 0}
                    onClick={() => setConfirmModal(true)}
                >
                    Confirm Selections <ArrowRight size={18} />
                </button>

                {/* Confirm Modal */}
                {confirmModal && (
                    <div style={{
                        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 'var(--space-4)',
                    }}>
                        <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', maxWidth: 440, width: '100%', boxShadow: 'var(--shadow-xl)' }}>
                            <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>Ready to hear the advice?</div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
                                You've chosen {activeSharks.length} area{activeSharks.length !== 1 ? 's' : ''} of help from {activeSharks.length} Shark{activeSharks.length !== 1 ? 's' : ''}. Each will give you detailed, specific advice you can agree with or decline.
                            </p>
                            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                                <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleConfirmSelections}>Let's Go 🦈</button>
                                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setConfirmModal(false)}>Change My Mind</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // ─── Advice Phase ─────────────────────────────────────────────
    if (phase === 'advice') {
        const sharksWithAdvice = activeSharks.filter(e => e.adviceText);

        return (
            <div className="animate-fade-in" style={{ maxWidth: 680, margin: '0 auto' }}>
                <div style={{ marginBottom: 'var(--space-6)' }}>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                        Shark Tank Feeding Frenzy
                    </div>
                    <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 var(--space-1)' }}>
                        Shark Advice
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                        Review each Shark's tailored advice and decide what to apply to your plan. Approved advice will shape all remaining steps.
                    </p>
                </div>

                {/* Tally */}
                <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
                    <div style={{ flex: 1, background: '#10b98110', border: '1px solid #10b98133', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', textAlign: 'center' }}>
                        <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: '#10b981' }}>{approvedCount}</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Approved</div>
                    </div>
                    <div style={{ flex: 1, background: '#ef444410', border: '1px solid #ef444433', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', textAlign: 'center' }}>
                        <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: '#ef4444' }}>{declinedCount}</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Declined</div>
                    </div>
                    <div style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', textAlign: 'center' }}>
                        <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--text-secondary)' }}>{activeSharks.length - sharksWithAdvice.length}</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Pending</div>
                    </div>
                </div>

                {generatingAdvice && sharksWithAdvice.length === 0 && (
                    <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-tertiary)' }}>
                        <div style={{ fontSize: 40, marginBottom: 'var(--space-3)' }}>🦈</div>
                        <div>The Sharks are writing their advice...</div>
                    </div>
                )}

                {sharksWithAdvice.map(shark => (
                    <AdviceCard key={shark.id} shark={shark} onDecision={handleAdviceDecision} />
                ))}

                {/* Placeholders for advice not yet generated */}
                {generatingAdvice && activeSharks.filter(e => !e.adviceText).map(shark => (
                    <div key={shark.id} style={{
                        background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
                        borderLeft: `4px solid ${shark.accentColor}44`,
                        padding: 'var(--space-4)', marginBottom: 'var(--space-4)',
                        opacity: 0.5,
                    }}>
                        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                            <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${shark.accentColor}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{shark.emoji}</div>
                            <div>
                                <div style={{ width: 120, height: 14, background: 'var(--border-light)', borderRadius: 4 }} />
                                <div style={{ width: 80, height: 10, background: 'var(--border-light)', borderRadius: 4, marginTop: 6 }} />
                            </div>
                        </div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>{shark.name} is writing their advice...</div>
                    </div>
                ))}

                {allDecided && (
                    <button
                        className="btn btn-primary"
                        style={{ width: '100%', fontSize: 'var(--text-md)', padding: 'var(--space-4)', gap: 8 }}
                        onClick={handleFinishFrenzy}
                    >
                        <Trophy size={18} /> Finish Feeding Frenzy
                    </button>
                )}
            </div>
        );
    }

    // ─── Summary Phase ────────────────────────────────────────────
    const approvedAdvice = evaluations.filter(e => e.adviceStatus === 'approved');
    const declinedAdvice = evaluations.filter(e => e.adviceStatus === 'declined');
    const investedCount = activeSharks.length;
    const titleInfo = getTitleFromCount(investedCount);

    return (
        <div className="animate-fade-in" style={{ maxWidth: 680, margin: '0 auto' }}>
            {/* Hero */}
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
                <div style={{ fontSize: 64, marginBottom: 'var(--space-3)' }}>🦈</div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: titleInfo.color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-2)' }}>
                    {titleInfo.label}
                </div>
                <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>
                    Feeding Frenzy Complete
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                    {investedCount} of 7 Sharks invested. {approvedCount} piece{approvedCount !== 1 ? 's' : ''} of advice approved.
                </p>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
                <div style={{ background: '#10b98110', border: '1px solid #10b98133', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', textAlign: 'center' }}>
                    <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, color: '#10b981' }}>{investedCount}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Sharks Invested</div>
                </div>
                <div style={{ background: 'var(--accent-subtle)', border: '1px solid var(--accent-muted)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', textAlign: 'center' }}>
                    <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--accent)' }}>{approvedCount}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Advice Approved</div>
                </div>
                <div style={{ background: '#ef444410', border: '1px solid #ef444433', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', textAlign: 'center' }}>
                    <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, color: '#ef4444' }}>{7 - investedCount}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Sharks Passed</div>
                </div>
            </div>

            {/* Approved advice list */}
            {approvedAdvice.length > 0 && (
                <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
                    <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <CheckCircle size={14} color="#10b981" /> Approved Advice — Will Shape Your Plan
                    </div>
                    {approvedAdvice.map(e => {
                        const help = e.helpOptions.find(h => h.id === e.selectedHelpId);
                        return (
                            <div key={e.id} style={{ display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--border-light)' }}>
                                <span style={{ fontSize: 16 }}>{e.emoji}</span>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{e.name}: {help?.buttonLabel}</div>
                                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>{e.keyRecommendation}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Declined list */}
            {declinedAdvice.length > 0 && (
                <div className="card" style={{ marginBottom: 'var(--space-4)', opacity: 0.7 }}>
                    <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <XCircle size={14} color="#ef4444" /> Declined Advice
                    </div>
                    {declinedAdvice.map(e => {
                        const help = e.helpOptions.find(h => h.id === e.selectedHelpId);
                        return (
                            <div key={e.id} style={{ display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--border-light)', color: 'var(--text-tertiary)', textDecoration: 'line-through' }}>
                                <span style={{ fontSize: 16 }}>{e.emoji}</span>
                                <div style={{ fontSize: 'var(--text-sm)' }}>{e.name}: {help?.buttonLabel}</div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Passed sharks */}
            {passSharks.length > 0 && (
                <div className="card" style={{ marginBottom: 'var(--space-6)', opacity: 0.6 }}>
                    <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)', color: 'var(--text-tertiary)' }}>
                        Sharks Who Passed
                    </div>
                    {passSharks.map(e => (
                        <div key={e.id} style={{ display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-2) 0', fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
                            <span style={{ fontSize: 16 }}>{e.emoji}</span>
                            <span>{e.name} — {e.whatWouldChangeMind?.split(' ').slice(0, 10).join(' ')}...</span>
                        </div>
                    ))}
                </div>
            )}

            <button
                className="btn btn-primary"
                style={{ width: '100%', fontSize: 'var(--text-md)', padding: 'var(--space-4)', gap: 8 }}
                onClick={handleContinue}
            >
                Continue to Revenue Projections <ArrowRight size={18} />
            </button>
        </div>
    );
}
