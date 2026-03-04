import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Step {
    number: number;
    name: string;
    emoji: string;
    tagline: string;
    what: string;
    benefit: string;
    output: string;
    tip: string;
}

const STEPS: Step[] = [
    {
        number: 1,
        name: 'Niche Finder',
        emoji: '🔍',
        tagline: 'Find your highest-potential market',
        what: 'The AI analyses your skills, experience, passions, budget, and available hours to surface 3 specific niche opportunities ranked by overall fit score. Each niche comes with an ideal client profile, revenue range, scalability score, and ease of entry rating.',
        benefit: 'Most practitioners try to serve everyone and end up serving no one well. This step forces you to get specific — the more targeted your niche, the less competition you face, the higher you can charge, and the easier it is to build a reputation. Specificity is the single biggest lever for growing a practice quickly.',
        output: 'Three scored niche options. You choose one to carry through the entire 7-step journey.',
        tip: 'Pick the niche that excites you most, not just the highest scorer. Sustainable businesses are built on genuine interest.',
    },
    {
        number: 2,
        name: 'Business Model Builder',
        emoji: '🏗️',
        tagline: 'Design a complete, sellable offer',
        what: 'Based on your chosen niche, the AI designs a full business model: offer name, transformation promise, format, duration, deliverables, pricing strategy, payment options, a 3-phase scalability roadmap, and your positioning statement.',
        benefit: 'Most practitioners sell sessions, not outcomes. This step turns your expertise into a productised offer — one that has a clear start and end, a specific promise, and a price that reflects transformation rather than time. Productised offers are easier to sell, easier to scale, and attract more committed clients.',
        output: 'A complete business model document you can edit, with 6 expandable sections including a one-page executive summary.',
        tip: 'The Offer Design and Pricing sections are the most important. Make sure the transformation promise is specific and measurable.',
    },
    {
        number: 3,
        name: 'Feeding Frenzy',
        emoji: '🦈',
        tagline: 'Have 7 world-class advisors tear your idea apart',
        what: 'Seven famous investor and business thinker personas (Hormozi, Godin, Blakely, Jobs, Ravikant, Forleo, da Vinci) each evaluate your niche and business model. They give verdicts (Invest / Conditional / Pass), score your idea, raise critical questions, and offer specific help across three areas you can choose from.',
        benefit: 'Getting honest, critical feedback before you invest time and money is the difference between a business that works and one that fails quietly. Each advisor brings a different lens — pricing, marketing, scalability, design, leverage, community — so you see blind spots you would never spot yourself. The advice you approve carries forward into every downstream step.',
        output: 'Shark verdicts, scores, and approved advice. Approved recommendations are passed as context to steps 4–7 so every output reflects what your advisors said.',
        tip: 'Don\'t just select advisors who agree with you. The critical questions from passing Sharks often reveal the most important things to address.',
    },
    {
        number: 4,
        name: 'Revenue Projector',
        emoji: '📈',
        tagline: 'Build a realistic 12-month financial model',
        what: 'The AI constructs a month-by-month revenue projection across three scenarios (conservative 50%, base 100%, aggressive 150%). It models new clients, total clients, revenue, costs, and net profit for each of 12 months, plus identifies 3–4 key milestones and your single most critical variable.',
        benefit: 'Most people either wildly overestimate income or avoid numbers altogether out of anxiety. This step gives you a grounded financial reality check — showing you when you hit break-even, what your realistic month-12 target looks like, and what single variable (usually client acquisition) makes or breaks the whole model.',
        output: 'A 12-month table, scenario toggles, revenue milestones, and a critical variable analysis with mitigation strategy.',
        tip: 'Start with the Conservative scenario and work your way up. If the conservative case still works for your life, you have a viable business.',
    },
    {
        number: 5,
        name: 'Messaging Engine',
        emoji: '✍️',
        tagline: 'Create a complete go-to-market messaging toolkit',
        what: 'The AI generates your headline, value proposition, content hooks (sorted by type), a multi-step outreach sequence, LinkedIn/Instagram/Facebook post templates, prospect search queries, trust language guidance ("always use" vs "never say"), and your #1 objection with a reframe.',
        benefit: 'Practitioners often know their work deeply but struggle to talk about it in a way that resonates with potential clients. This step hands you ready-to-use copy across every touchpoint — social posts, direct messages, email, and conversations — so you can start attracting clients immediately without staring at a blank page.',
        output: 'Copy you can paste directly into your marketing, plus search queries to find your first 50 ideal clients on LinkedIn and Facebook groups.',
        tip: 'Use the outreach sequence as a starting template, not a script. Personalise the details for each prospect — it converts significantly better.',
    },
    {
        number: 6,
        name: 'Launch Sprint',
        emoji: '🚀',
        tagline: 'Execute a 30-day launch plan with daily actions',
        what: 'A week-by-week, action-by-action 30-day launch plan tailored to your niche, offer, and approved Shark advice. Each week has a theme, specific daily tasks, and a benchmark that defines what success looks like. A KPI dashboard tracks the 4–5 most important metrics.',
        benefit: 'Most business plans never become calendared action. This step converts your strategy into a concrete execution checklist — you always know exactly what to do today, this week, and this month. The interactive checklists let you tick off tasks as you complete them.',
        output: 'A 4-week interactive checklist, KPI targets, and a Month 1 scorecard.',
        tip: 'Focus on Week 1\'s "quick wins" first. Getting your first client, booking your first discovery call, or posting your first piece of content creates momentum that carries everything else.',
    },
    {
        number: 7,
        name: 'Reality Check',
        emoji: '🔍',
        tagline: 'Get a brutally honest assessment of your full plan',
        what: 'The AI delivers a final, impartial evaluation of your entire business plan: an overall viability verdict (Strong / Viable / Risky / Rethink), a score out of 10, genuine strengths, real weaknesses with severity ratings, key assumptions being made and how to validate them, competitor threats, regulatory considerations, and the blind spots most founders miss.',
        benefit: 'This is your last line of defence before committing time and money. A fresh-eyes audit often surfaces the one thing that would sink the business — pricing assumptions, market size realities, regulatory obligations, or a competitor advantage that\'s easy to miss when you\'re deep in excitement about your own idea.',
        output: 'A full viability report you can export as Markdown, JSON, or plain text to share with advisors, colleagues, or investors.',
        tip: 'If the verdict is "Rethink", go back to Step 1 and pick a different niche — that\'s the system working exactly as intended. Better to find out now.',
    },
];

export default function InstructionsPage() {
    const [expanded, setExpanded] = useState<number | null>(1);

    const toggle = (n: number) => setExpanded(prev => prev === n ? null : n);

    return (
        <main className="app-main">
            <div className="step-header animate-fade-in">
                <h2 className="step-title">How It Works</h2>
                <p className="step-description">
                    A complete 7-step journey from raw idea to launch-ready business — powered by AI and shaped by the world's best business minds.
                </p>
            </div>

            {/* Overview banner */}
            <div className="insight-box animate-fade-in" style={{ marginBottom: 'var(--space-6)', maxWidth: 720 }}>
                <div className="insight-box-title">Before you start</div>
                <div className="insight-box-content" style={{ fontSize: 'var(--text-sm)', lineHeight: 1.8 }}>
                    Go to <strong>Settings</strong> and enter your <strong>OpenRouter API key</strong> to unlock real AI-generated output for each step.
                    Without a key, each step shows example data so you can explore the tool first.
                    Your key is stored locally in your browser and never leaves your device.
                </div>
            </div>

            {/* Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 720 }}>
                {STEPS.map((step, i) => {
                    const isOpen = expanded === step.number;
                    return (
                        <div
                            key={step.number}
                            className={`card animate-fade-in stagger-${Math.min(i + 1, 6)}`}
                            style={{ padding: 0, overflow: 'hidden' }}
                        >
                            {/* Header row — always visible */}
                            <button
                                onClick={() => toggle(step.number)}
                                style={{
                                    width: '100%', display: 'flex', alignItems: 'center',
                                    gap: 'var(--space-4)', padding: 'var(--space-5)',
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    textAlign: 'left',
                                }}
                            >
                                {/* Step number badge */}
                                <div style={{
                                    width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                                    background: 'var(--color-primary)', color: 'white',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 'var(--text-sm)', fontWeight: 700,
                                    fontFamily: 'var(--font-mono)',
                                }}>
                                    {step.number}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 2 }}>
                                        <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                                            {step.emoji} {step.name}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
                                        {step.tagline}
                                    </div>
                                </div>

                                <div style={{ color: 'var(--text-tertiary)', flexShrink: 0 }}>
                                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                            </button>

                            {/* Expanded body */}
                            {isOpen && (
                                <div style={{
                                    padding: '0 var(--space-5) var(--space-5)',
                                    borderTop: '1px solid var(--border-color)',
                                    paddingTop: 'var(--space-5)',
                                    display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
                                }}>
                                    {/* What it does */}
                                    <div>
                                        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                                            What it does
                                        </div>
                                        <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.75, color: 'var(--text-secondary)' }}>
                                            {step.what}
                                        </p>
                                    </div>

                                    {/* Why it matters */}
                                    <div style={{
                                        background: 'var(--bg-sidebar)',
                                        borderLeft: '3px solid var(--color-primary)',
                                        borderRadius: '0 var(--border-radius-md) var(--border-radius-md) 0',
                                        padding: 'var(--space-4)',
                                    }}>
                                        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                                            Why it matters
                                        </div>
                                        <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.75, color: 'var(--text-primary)' }}>
                                            {step.benefit}
                                        </p>
                                    </div>

                                    {/* Output + tip row */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                                        <div className="metric-card" style={{ padding: 'var(--space-4)' }}>
                                            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                                                What you get
                                            </div>
                                            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                                                {step.output}
                                            </p>
                                        </div>
                                        <div className="metric-card" style={{
                                            padding: 'var(--space-4)',
                                            borderTop: '2px solid var(--color-warning)',
                                        }}>
                                            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-warning)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                                                💡 Pro tip
                                            </div>
                                            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                                                {step.tip}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Footer CTA */}
            <div className="card animate-fade-in" style={{ maxWidth: 720, marginTop: 'var(--space-6)', textAlign: 'center', padding: 'var(--space-6)' }}>
                <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>🦈</div>
                <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)', fontFamily: 'var(--font-heading)' }}>
                    Ready to dive in?
                </h3>
                <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-5)' }}>
                    Head to Innovation Lab to start your 7-step journey. The whole process takes 20–60 minutes depending on how much you explore each step.
                </p>
                <a href="/lab" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: 'var(--space-3) var(--space-6)',
                    background: 'var(--color-primary)', color: 'white',
                    borderRadius: 'var(--border-radius-md)', fontWeight: 600,
                    fontSize: 'var(--text-sm)', textDecoration: 'none',
                    transition: 'opacity 0.15s',
                }}>
                    Start Innovation Lab →
                </a>
            </div>
        </main>
    );
}
