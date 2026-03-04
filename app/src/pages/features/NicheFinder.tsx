import { useState, useRef } from 'react';
import { useApp } from '../../store/store';
import { MOCK_NICHE_RESULTS } from '../../data/mockData';
import { ArrowRight, Search, Star, ChevronDown, ChevronUp, Upload, Download, FileText, Check as CheckIcon, AlertTriangle, RefreshCw } from 'lucide-react';
import { exportProfileAsMarkdown, parseProfileMarkdown, downloadFile } from '../../utils/exportUtils';
import { callAI, parseAIJson } from '../../services/aiService';
import { buildNichePrompt } from '../../services/prompts';

const SKILLS = [
    'Hypnotherapy', 'CBT', 'NLP', 'Mindfulness', 'Life Coaching',
    'Trauma-Informed Care', 'Grief Counseling', 'Stress Management',
    'Sleep Coaching', 'Performance Coaching', 'Breathwork', 'Somatic Therapy',
    'EFT/Tapping', 'EMDR', 'Art Therapy', 'Sound Healing',
];

export default function NicheFinder() {
    const {
        userProfile, nicheResults, selectedNiche,
        setUserProfile, setNicheResults, setSelectedNiche,
        completeStep, setCurrentStep
    } = useApp();
    const [phase, setPhase] = useState<'intake' | 'loading' | 'results'>(
        nicheResults.length > 0 ? 'results' : 'intake'
    );
    const [skills, setSkills] = useState<string[]>(userProfile?.skills || []);
    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    const [profileExported, setProfileExported] = useState(false);
    const [importMessage, setImportMessage] = useState<string | null>(null);
    const [loadingMsg, setLoadingMsg] = useState('Analysing your profile...');
    const [aiError, setAiError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [form, setForm] = useState({
        experienceYears: userProfile?.experienceYears || '',
        passions: userProfile?.passions || '',
        budget: userProfile?.budget || '',
        hoursPerWeek: userProfile?.hoursPerWeek || '',
        currentModel: userProfile?.currentModel || '',
        enjoysMost: userProfile?.enjoysMost || '',
    });

    const toggleSkill = (skill: string) => {
        setSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
    };

    const handleSubmit = async () => {
        const profile = { ...form, skills };
        setUserProfile(profile);
        setAiError(null);
        setPhase('loading');
        const hasKey = !!localStorage.getItem('openrouter_api_key');
        setLoadingMsg(hasKey ? '🦈 AI is surfacing your best niches...' : 'Generating example niches...');
        try {
            const raw = await callAI(buildNichePrompt(profile));
            if (raw) {
                const results = parseAIJson<typeof MOCK_NICHE_RESULTS>(raw);
                setNicheResults(results);
                setPhase('results');
            } else {
                // No API key — use mock data
                setNicheResults(MOCK_NICHE_RESULTS);
                setPhase('results');
            }
        } catch (err) {
            setAiError(err instanceof Error ? err.message : 'AI call failed');
            setPhase('intake');
        }
    };

    const handleSelect = (niche: typeof MOCK_NICHE_RESULTS[0]) => {
        setSelectedNiche(niche);
        completeStep(1);
        setCurrentStep(2);
    };

    const handleExportProfile = () => {
        const profile = { ...form, skills };
        const md = exportProfileAsMarkdown(profile);
        downloadFile(md, 'CoachSharkTank-Profile.md', 'text/markdown');
        setProfileExported(true);
        setTimeout(() => setProfileExported(false), 3000);
    };

    const handleImportProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            const parsed = parseProfileMarkdown(text);
            if (parsed) {
                setForm(prev => ({
                    experienceYears: parsed.experienceYears || prev.experienceYears,
                    passions: parsed.passions || prev.passions,
                    budget: parsed.budget || prev.budget,
                    hoursPerWeek: parsed.hoursPerWeek || prev.hoursPerWeek,
                    currentModel: parsed.currentModel || prev.currentModel,
                    enjoysMost: parsed.enjoysMost || prev.enjoysMost,
                }));
                if (parsed.skills?.length) setSkills(parsed.skills);
                setImportMessage('Profile loaded successfully!');
            } else {
                setImportMessage('Could not parse profile file. Please use a valid CoachSharkTank profile.');
            }
            setTimeout(() => setImportMessage(null), 4000);
        };
        reader.readAsText(file);
        // Reset input so the same file can be re-uploaded
        e.target.value = '';
    };

    const getScoreColor = (score: number) => score >= 80 ? 'high' : score >= 60 ? 'medium' : 'low';

    if (phase === 'loading') {
        return (
            <div className="loading-state">
                <div className="spinner" />
                <p style={{ fontSize: 'var(--text-lg)' }}>{loadingMsg}</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>Evaluating niches for revenue potential, scalability, and fit</p>
            </div>
        );
    }

    // Inline error banner (shown above intake form on retry)
    const ErrorBanner = aiError ? (
        <div style={{
            display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
            background: 'var(--color-danger-light)', border: '1px solid var(--color-danger)',
            borderRadius: 'var(--border-radius-md)', padding: 'var(--space-4)',
            marginBottom: 'var(--space-4)',
        }}>
            <AlertTriangle size={18} style={{ color: 'var(--color-danger)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-danger)' }}>AI call failed</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{aiError}</div>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => { setAiError(null); }}>
                <RefreshCw size={14} /> Retry
            </button>
        </div>
    ) : null;

    if (phase === 'results') {
        return (
            <div className="animate-fade-in">
                <div className="step-header">
                    <div className="step-number">Step 1 of 7</div>
                    <h2 className="step-title">Your Top 6 Niche Opportunities</h2>
                    <p className="step-description">Ranked by overall fit score based on your profile, market demand, and growth potential.</p>
                </div>

                {/* Profile Export Banner */}
                {userProfile && (
                    <div className="card" style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: 'var(--space-4)', marginBottom: 'var(--space-6)',
                        borderLeft: '3px solid var(--color-primary)',
                        flexWrap: 'wrap', gap: 'var(--space-3)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                            <FileText size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                            <div>
                                <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>Save your profile for next time</div>
                                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                                    Download your profile as a .md file to skip the intake form in future sessions.
                                </div>
                            </div>
                        </div>
                        <button
                            className={`btn ${profileExported ? 'btn-outline' : 'btn-primary'} btn-sm`}
                            onClick={handleExportProfile}
                        >
                            {profileExported ? <><CheckIcon size={14} /> Exported!</> : <><Download size={14} /> Export Profile</>}
                        </button>
                    </div>
                )}

                <div className="data-grid data-grid-2">
                    {nicheResults.map((niche, i) => (
                        <div
                            key={niche.id}
                            className={`card animate-fade-in stagger-${i + 1} ${selectedNiche?.id === niche.id ? 'card-highlighted' : ''}`}
                            style={{ position: 'relative', overflow: 'hidden' }}
                        >
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: getScoreColor(niche.overallScore) === 'high' ? 'var(--color-success)' : getScoreColor(niche.overallScore) === 'medium' ? 'var(--color-warning)' : 'var(--color-danger)' }} />
                            <div className="card-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                    <span className="mono" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>#{i + 1}</span>
                                    <span className="card-title">{niche.name}</span>
                                </div>
                                {i === 0 && <span className="card-badge badge-recommended"><Star size={12} /> Recommended</span>}
                            </div>

                            <div className="score-bar-container">
                                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Score</span>
                                <div className="score-bar">
                                    <div className={`score-bar-fill ${getScoreColor(niche.overallScore)}`} style={{ width: `${niche.overallScore}%` }} />
                                </div>
                                <span className="score-value">{niche.overallScore}/100</span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', margin: 'var(--space-3) 0' }}>
                                <div>
                                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Revenue</div>
                                    <div className="mono" style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{niche.revenueRange}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Scalability</div>
                                    <div className="mono" style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{niche.scalabilityScore}/10</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Ease of Entry</div>
                                    <div className="mono" style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{niche.easeOfEntry}/10</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Model</div>
                                    <div style={{ fontSize: 'var(--text-sm)' }}>{niche.deliveryModel}</div>
                                </div>
                            </div>

                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={() => setExpandedCard(expandedCard === niche.id ? null : niche.id)}
                                style={{ width: '100%', marginTop: 'var(--space-2)' }}
                            >
                                {expandedCard === niche.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                {expandedCard === niche.id ? 'Show Less' : 'View Details'}
                            </button>

                            {expandedCard === niche.id && (
                                <div className="animate-fade-in" style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-color)' }}>
                                    <div style={{ marginBottom: 'var(--space-3)' }}>
                                        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 4 }}>Pain Point</div>
                                        <p style={{ fontSize: 'var(--text-sm)' }}>{niche.painPoint}</p>
                                    </div>
                                    <div style={{ marginBottom: 'var(--space-3)' }}>
                                        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 4 }}>Ideal Client</div>
                                        <p style={{ fontSize: 'var(--text-sm)' }}>{niche.idealClient}</p>
                                    </div>
                                    <div style={{ marginBottom: 'var(--space-3)' }}>
                                        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 4 }}>Gap Analysis</div>
                                        <p style={{ fontSize: 'var(--text-sm)' }}>{niche.gapAnalysis}</p>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 4 }}>Credibility Play</div>
                                        <p style={{ fontSize: 'var(--text-sm)' }}>{niche.credibilityPlay}</p>
                                    </div>
                                </div>
                            )}

                            <button
                                className={`btn ${i === 0 ? 'btn-primary' : 'btn-outline'} btn-sm`}
                                style={{ width: '100%', marginTop: 'var(--space-4)' }}
                                onClick={() => handleSelect(niche)}
                            >
                                {i === 0 ? 'Select This Niche' : 'Select'}
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Intake form
    return (
        <div className="animate-fade-in">
            <div className="step-header">
                <div className="step-number">Step 1 of 7</div>
                <h2 className="step-title">Niche Opportunity Finder</h2>
                <p className="step-description">Tell us about your practice and we'll identify your highest-potential niche opportunities.</p>
            </div>

            {ErrorBanner}

            {/* Profile Import */}
            <div className="card" style={{
                maxWidth: 680, marginBottom: 'var(--space-4)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: 'var(--space-4)', flexWrap: 'wrap', gap: 'var(--space-3)',
                borderStyle: 'dashed', borderColor: 'var(--color-primary)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <Upload size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>Returning user?</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                            Upload your CoachSharkTank-Profile.md to auto-fill the form.
                        </div>
                    </div>
                </div>
                <div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".md,.txt,.markdown"
                        onChange={handleImportProfile}
                        style={{ display: 'none' }}
                    />
                    <button className="btn btn-outline btn-sm" onClick={() => fileInputRef.current?.click()}>
                        <Upload size={14} /> Upload Profile
                    </button>
                </div>
            </div>

            {importMessage && (
                <div className="card animate-fade-in" style={{
                    maxWidth: 680, marginBottom: 'var(--space-4)',
                    padding: 'var(--space-3) var(--space-4)',
                    borderLeft: `3px solid ${importMessage.includes('success') ? 'var(--color-success)' : 'var(--color-warning)'}`,
                    fontSize: 'var(--text-sm)',
                }}>
                    {importMessage}
                </div>
            )}

            <div className="card" style={{ maxWidth: 680 }}>
                <div className="form-group">
                    <label className="form-label">Years of Experience</label>
                    <select className="form-select" value={form.experienceYears} onChange={e => setForm({ ...form, experienceYears: e.target.value })}>
                        <option value="">Select...</option>
                        <option value="0-2">0–2 years</option>
                        <option value="3-5">3–5 years</option>
                        <option value="5-10">5–10 years</option>
                        <option value="10+">10+ years</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Your Skills & Modalities <span className="form-sublabel">Select all that apply</span></label>
                    <div className="chip-group">
                        {SKILLS.map(skill => (
                            <button key={skill} className={`chip ${skills.includes(skill) ? 'selected' : ''}`} onClick={() => toggleSkill(skill)}>
                                {skill}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">What Do You Enjoy Most?</label>
                    <textarea
                        className="form-textarea"
                        value={form.enjoysMost}
                        onChange={e => setForm({ ...form, enjoysMost: e.target.value })}
                        placeholder="e.g., Working with anxious clients one-on-one, leading group workshops, creating audio content..."
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Passions & Interests</label>
                    <textarea
                        className="form-textarea"
                        value={form.passions}
                        onChange={e => setForm({ ...form, passions: e.target.value })}
                        placeholder="e.g., Healthcare worker wellness, sleep science, entrepreneurial performance..."
                    />
                </div>

                <div className="form-range-row">
                    <div className="form-group">
                        <label className="form-label">Available Budget</label>
                        <select className="form-select" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
                            <option value="">Select...</option>
                            <option value="0-500">$0 – $500</option>
                            <option value="500-2000">$500 – $2,000</option>
                            <option value="2000-5000">$2,000 – $5,000</option>
                            <option value="5000-10000">$5,000 – $10,000</option>
                            <option value="10000+">$10,000+</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Hours per Week</label>
                        <select className="form-select" value={form.hoursPerWeek} onChange={e => setForm({ ...form, hoursPerWeek: e.target.value })}>
                            <option value="">Select...</option>
                            <option value="1-5">1–5 hours</option>
                            <option value="5-10">5–10 hours</option>
                            <option value="10-20">10–20 hours</option>
                            <option value="20+">20+ hours</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Current Revenue Model</label>
                    <select className="form-select" value={form.currentModel} onChange={e => setForm({ ...form, currentModel: e.target.value })}>
                        <option value="">Select...</option>
                        <option value="1:1-sessions">1:1 Sessions Only</option>
                        <option value="sessions-plus-groups">Sessions + Some Group Work</option>
                        <option value="mixed">Mixed (sessions, courses, packages)</option>
                        <option value="starting-out">Just Starting Out</option>
                    </select>
                </div>

                <div className="step-nav" style={{ borderTop: 'none', paddingTop: 0, marginTop: 'var(--space-4)' }}>
                    <div />
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={handleSubmit}
                        disabled={!form.experienceYears || skills.length === 0}
                    >
                        <Search size={18} />
                        Find My Niches
                    </button>
                </div>
            </div>
        </div>
    );
}
