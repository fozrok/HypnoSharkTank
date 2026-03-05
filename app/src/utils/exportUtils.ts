import type { UserProfile, AppState } from '../store/store';

// ─── Profile Export ───────────────────────────────────────────────

export function exportProfileAsMarkdown(profile: UserProfile): string {
    const lines = [
        '# CoachSharkTank Profile',
        '',
        `> Exported ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
        '',
        '## Practitioner Details',
        '',
        `- **Years of Experience:** ${profile.experienceYears}`,
        `- **Skills & Modalities:** ${profile.skills.join(', ')}`,
        `- **Current Revenue Model:** ${profile.currentModel}`,
        '',
        '## Preferences',
        '',
        `- **Available Budget:** ${profile.budget}`,
        `- **Hours per Week:** ${profile.hoursPerWeek}`,
        '',
        '## Interests',
        '',
        `**What I enjoy most:**`,
        profile.enjoysMost || '_Not specified_',
        '',
        `**Passions & interests:**`,
        profile.passions || '_Not specified_',
        '',
        '---',
        '_Upload this file to CoachSharkTank to auto-fill your profile._',
    ];
    return lines.join('\n');
}

export function parseProfileMarkdown(text: string): Partial<UserProfile> | null {
    try {
        const profile: Partial<UserProfile> = {};
        const exp = text.match(/\*\*Years of Experience:\*\*\s*(.+)/);
        if (exp) profile.experienceYears = exp[1].trim();

        const skills = text.match(/\*\*Skills & Modalities:\*\*\s*(.+)/);
        if (skills) profile.skills = skills[1].split(',').map(s => s.trim()).filter(Boolean);

        const model = text.match(/\*\*Current Revenue Model:\*\*\s*(.+)/);
        if (model) profile.currentModel = model[1].trim();

        const budget = text.match(/\*\*Available Budget:\*\*\s*(.+)/);
        if (budget) profile.budget = budget[1].trim();

        const hours = text.match(/\*\*Hours per Week:\*\*\s*(.+)/);
        if (hours) profile.hoursPerWeek = hours[1].trim();

        // Match multi-line fields
        const enjoyMatch = text.match(/\*\*What I enjoy most:\*\*\n(.+?)(?=\n\n|\n\*\*)/s);
        if (enjoyMatch) profile.enjoysMost = enjoyMatch[1].trim();

        const passionMatch = text.match(/\*\*Passions & interests:\*\*\n(.+?)(?=\n\n|\n---)/s);
        if (passionMatch) profile.passions = passionMatch[1].trim();

        // Validate that we got at least some data
        if (!profile.experienceYears && !profile.skills?.length) return null;
        return profile;
    } catch {
        return null;
    }
}

// ─── Full Plan Export ─────────────────────────────────────────────

function formatDate(): string {
    return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function exportPlanAsMarkdown(state: AppState): string {
    const s = state;
    const lines: string[] = [];

    lines.push(`# CoachSharkTank Business Plan`);
    lines.push(`> Generated ${formatDate()}`);
    lines.push('');

    // Selected Niche
    if (s.selectedNiche) {
        const n = s.selectedNiche;
        lines.push('## 1. Selected Niche');
        lines.push('');
        lines.push(`**${n.name}** — Score: ${n.overallScore}/100`);
        lines.push('');
        lines.push(`- **Pain Point:** ${n.painPoint}`);
        lines.push(`- **Ideal Client:** ${n.idealClient}`);
        lines.push(`- **Delivery Model:** ${n.deliveryModel}`);
        lines.push(`- **Revenue Range:** ${n.revenueRange}`);
        lines.push(`- **Scalability:** ${n.scalabilityScore}/10`);
        lines.push(`- **Ease of Entry:** ${n.easeOfEntry}/10`);
        lines.push(`- **Gap Analysis:** ${n.gapAnalysis}`);
        lines.push(`- **Credibility Play:** ${n.credibilityPlay}`);
        lines.push('');
    }

    // Business Model
    if (s.businessModel) {
        const m = s.businessModel;
        lines.push('## 2. Business Model');
        lines.push('');
        lines.push(`### ${m.offerName}`);
        lines.push(m.offerDescription);
        lines.push('');
        lines.push(`**Transformation Promise:** "${m.transformationPromise}"`);
        lines.push('');
        lines.push(`- **Format:** ${m.format}`);
        lines.push(`- **Duration:** ${m.duration}`);
        lines.push(`- **Pricing:** ${m.pricingModel} — ${m.pricePoint}`);
        lines.push(`- **Payment Options:** ${m.paymentOptions.join(', ')}`);
        lines.push('');
        lines.push('**Deliverables:**');
        m.deliverables.forEach(d => lines.push(`- ${d}`));
        lines.push('');
        lines.push('**Scalability Phases:**');
        m.scalabilityPhases.forEach(p => lines.push(`- **${p.phase}** (${p.months}): ${p.description}`));
        lines.push('');
        lines.push('**Acquisition Channels:**');
        m.acquisitionChannels.forEach(c => lines.push(`- **${c.channel}** (${c.cost}): ${c.description}`));
        lines.push('');
        lines.push(`**Positioning:** "${m.positioningStatement}"`);
        lines.push('');
        lines.push(`**Contrarian Angle:** ${m.contrarian}`);
        lines.push('');
    }


    if (s.revenueProjection) {
        const r = s.revenueProjection;
        lines.push('## 4. Revenue Projection');
        lines.push('');
        lines.push('**Assumptions:**');
        Object.entries(r.assumptions).forEach(([k, v]) => lines.push(`- ${k}: ${v}`));
        lines.push('');
        lines.push('| Month | New Clients | Total | Revenue | Costs | Net Profit |');
        lines.push('|-------|------------|-------|---------|-------|------------|');
        r.months.forEach(m => {
            lines.push(`| ${m.month} | ${m.newClients} | ${m.totalClients} | $${m.revenue.toLocaleString()} | $${m.costs.toLocaleString()} | $${m.netProfit.toLocaleString()} |`);
        });
        lines.push('');
        lines.push('**Milestones:**');
        r.milestones.forEach(m => lines.push(`- Month ${m.month}: ${m.label}`));
        lines.push('');
        lines.push(`**Critical Variable:** ${r.criticalVariable}`);
        lines.push(`**Mitigation:** ${r.mitigation}`);
        lines.push('');
    }

    // Messaging
    if (s.messagingData) {
        const msg = s.messagingData;
        lines.push('## 5. Messaging Strategy');
        lines.push('');
        lines.push('### Content Hooks');
        msg.hooks.forEach(h => lines.push(`- **[${h.type}]** ${h.hook} _(${h.angle})_`));
        lines.push('');
        lines.push('### Outreach Sequence');
        msg.outreach.forEach(o => lines.push(`${o.step}. **${o.label}:** "${o.message}"`));
        lines.push('');
        lines.push('### Prospect Searches');
        msg.prospectSearches.forEach(s => lines.push(`- \`${s}\``));
        lines.push('');
        lines.push('### Trust Language');
        lines.push('**Use:** ' + msg.trustPhrases.use.map(p => `"${p}"`).join(', '));
        lines.push('**Avoid:** ' + msg.trustPhrases.avoid.map(p => `"${p}"`).join(', '));
        lines.push('');
        lines.push(`**Top Objection:** ${msg.topObjection}`);
        lines.push(`**Response:** ${msg.objectionResponse}`);
        lines.push('');
    }

    // Launch Plan
    if (s.launchPlan) {
        const lp = s.launchPlan;
        lines.push('## 6. 30-Day Launch Sprint');
        lines.push('');
        lp.weeks.forEach(w => {
            lines.push(`### Week ${w.week}: ${w.theme}`);
            w.actions.forEach(a => lines.push(`- **${a.day}:** ${a.action}`));
            lines.push(`- **Benchmark:** ${w.benchmark}`);
            lines.push('');
        });
        lines.push('**KPIs:**');
        lp.kpis.forEach(k => lines.push(`- ${k.metric}: Target ${k.target}, Stretch ${k.good}`));
        lines.push('');
        lines.push(`**Month 1 Scorecard:** ${lp.scorecard}`);
        lines.push('');
    }

    // Reality Check
    if (s.realityCheck) {
        const rc = s.realityCheck;
        lines.push('## 7. Reality Check');
        lines.push('');
        lines.push(`> "${rc.oneSentenceInsight}"`);
        lines.push('');
        lines.push('**Failure Pattern Audit:**');
        rc.failurePatterns.forEach(fp => {
            lines.push(`- ${fp.applies ? '⚠️' : '✅'} **${fp.pattern}:** ${fp.detail}`);
        });
        lines.push('');
        lines.push('**Missed Opportunities:**');
        rc.missedOpportunities.forEach(o => lines.push(`- **${o.title}:** ${o.impact}`));
        lines.push('');
        lines.push(`**Contrarian Play:** ${rc.contrarianPlay}`);
        lines.push('');
        lines.push(`**Stall Risk:** ${rc.stallRisk}`);
        lines.push(`**Prevention:** ${rc.stallPrevention}`);
    }

    lines.push('');
    lines.push('---');
    lines.push('_Generated by CoachSharkTank — Business Innovation Engine_');
    return lines.join('\n');
}

export function exportPlanAsJSON(state: AppState): string {
    const exportData = {
        generatedAt: new Date().toISOString(),
        generator: 'CoachSharkTank',
        selectedNiche: state.selectedNiche,
        businessModel: state.businessModel,
        revenueProjection: state.revenueProjection,
        messagingData: state.messagingData,
        launchPlan: state.launchPlan,
        realityCheck: state.realityCheck,
    };
    return JSON.stringify(exportData, null, 2);
}

export function exportPlanAsText(state: AppState): string {
    // Strip markdown formatting for plain text
    return exportPlanAsMarkdown(state)
        .replace(/^#+\s+/gm, '')
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/^>\s+/gm, '')
        .replace(/^-\s+/gm, '• ')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\[([^\]]+)\]/g, '$1')
        .replace(/\|/g, ' | ')
        .replace(/\n{3,}/g, '\n\n');
}

// ─── Download Helper ──────────────────────────────────────────────

export function downloadFile(content: string, filename: string, mimeType: string) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
