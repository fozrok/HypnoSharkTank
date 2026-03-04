/**
 * prompts.ts
 * All AI prompt builder functions for CoachSharkTank.
 * Each returns an AIMessage[] array ready to pass to callAI().
 */

import type { AIMessage } from './aiService';
import type { UserProfile, NicheOpportunity, BusinessModel } from '../store/store';

// ─── Shared system context ────────────────────────────────────────
const SYSTEM_BASE = `You are an expert business coach specialising in hypnotherapy and wellness practitioners. You give direct, specific, actionable advice. Always respond ONLY with valid JSON — no preamble, no explanation, no markdown fences.`;

// ─── Step 1: Niche Finder ─────────────────────────────────────────
export function buildNichePrompt(profile: UserProfile): AIMessage[] {
  return [
    { role: 'system', content: SYSTEM_BASE },
    {
      role: 'user', content: `
Generate 3 highly specific, profitable niche opportunities for a wellness/hypnotherapy practitioner with this profile:

Skills: ${profile.skills.join(', ')}
Experience: ${profile.experienceYears} years
Passions: ${profile.passions}
Available budget: ${profile.budget}
Hours per week available: ${profile.hoursPerWeek}
Current model: ${profile.currentModel}
Enjoys most: ${profile.enjoysMost}

Return a JSON array of exactly 3 objects. Use EXACTLY these field names:
{
  "id": number (1-3),
  "name": string (specific niche name, 3-6 words),
  "idealClient": string (specific description of the ideal client),
  "painPoint": string (the core problem this niche solves),
  "deliveryModel": string (how the service is delivered, e.g. "6-week online group program"),
  "revenueRange": string (realistic monthly revenue range, e.g. "$6k–$12k/month"),
  "credibilityPlay": string (how the practitioner establishes authority in this niche),
  "scalabilityScore": number (1–10, how easily this can scale beyond 1-on-1),
  "easeOfEntry": number (1–10, how easy this niche is to enter quickly),
  "overallScore": number (0–100, overall opportunity score — be honest, use the full range),
  "gapAnalysis": string (the specific market gap or underserved opportunity),
  "summary": string (2-sentence overview of why this niche is compelling)
}` },
  ];
}

// ─── Step 2: Business Model Builder ──────────────────────────────
export function buildModelPrompt(niche: NicheOpportunity, profile: UserProfile): AIMessage[] {
  return [
    { role: 'system', content: SYSTEM_BASE },
    {
      role: 'user', content: `
Design a complete business model for this practitioner:

Niche: ${niche.name}
Target audience: ${niche.idealClient}
Gap / opportunity: ${niche.gapAnalysis}
Practitioner skills: ${profile.skills.join(', ')}
Budget: ${profile.budget}
Hours/week: ${profile.hoursPerWeek}

Return a single JSON object:
{
  "offerName": string,
  "offerDescription": string (2-3 sentences),
  "transformationPromise": string (the specific before→after outcome),
  "format": string (e.g. "6-week group program"),
  "duration": string (e.g. "6 weeks"),
  "deliverables": string[] (4-6 specific items),
  "pricingModel": string,
  "pricePoint": string (e.g. "$497"),
  "paymentOptions": string[] (2-3 options),
  "scalabilityPhases": [
    { "phase": string, "months": string, "description": string }
  ] (3 phases),
  "acquisitionChannels": [
    { "channel": string, "cost": string, "description": string }
  ] (3-4 channels),
  "positioningStatement": string,
  "contrarian": string (the bold contrarian angle that sets this apart),
  "onePageSummary": string (3-4 sentence executive summary)
}` },
  ];
}

// ─── Step 3a: Shark Evaluations ───────────────────────────────────
export function buildSharkEvalPrompt(niche: NicheOpportunity, model: BusinessModel): AIMessage[] {
  const sharks = [
    { name: 'Alex Hormozi', emoji: '💰', title: 'The Offer Architect', accentColor: '#ef4444', specialty: 'offer design, pricing, value stacking' },
    { name: 'Sara Blakely', emoji: '🚀', title: 'The Scrappy Launcher', accentColor: '#f59e0b', specialty: 'grassroots marketing, bootstrapping, customer obsession' },
    { name: 'Seth Godin', emoji: '🎯', title: 'The Positioning Sage', accentColor: '#8b5cf6', specialty: 'positioning, tribes, permission marketing, purple cow thinking' },
    { name: 'Steve Jobs', emoji: '✦', title: 'The Vision Architect', accentColor: '#374151', specialty: 'product simplicity, premium positioning, experience design' },
    { name: 'Naval Ravikant', emoji: '⚡', title: 'The Leverage Philosopher', accentColor: '#06b6d4', specialty: 'leverage, scalability, productisation, asymmetric returns' },
    { name: 'Marie Forleo', emoji: '✨', title: 'The Heart-Led Strategist', accentColor: '#ec4899', specialty: 'community building, authentic marketing, women in business' },
    { name: 'Leonardo da Vinci', emoji: '🎨', title: 'The Creative Disruptor', accentColor: '#10b981', specialty: 'first-principles thinking, creative differentiation, innovation' },
  ];

  return [
    { role: 'system', content: SYSTEM_BASE },
    {
      role: 'user', content: `
You are roleplaying as 7 famous investors/thinkers evaluating a business pitch. Be specific, direct, and true to each person's known philosophy and communication style.

BUSINESS BEING PITCHED:
- Niche: ${niche.name}
- Target: ${niche.idealClient}
- Offer: ${model.offerName} — ${model.offerDescription}
- Price: ${model.pricePoint}
- Format: ${model.format} (${model.duration})
- Transformation: ${model.transformationPromise}
- Positioning: ${model.positioningStatement}

SHARKS TO EVALUATE:
${sharks.map(s => `${s.name} (${s.specialty})`).join('\n')}

Return a JSON array of exactly 7 shark evaluation objects:
[{
  "id": string (e.g. "hormozi"),
  "name": string,
  "emoji": string,
  "title": string,
  "accentColor": string (hex),
  "score": number (1–10, be honest — not everyone gives high scores),
  "verdict": "invest" | "conditional_invest" | "pass",
  "observations": string[] (exactly 3 — specific, in character),
  "criticalQuestion": string (the ONE question this shark would grill you on),
  "condition": string | null (if conditional_invest: the specific condition they require, else null),
  "whatWouldChangeMind": string | null (if pass: what would make them invest, else null),
  "helpOptions": [
    { "id": string, "buttonLabel": string (3-5 words), "description": string (1 sentence) }
  ] (exactly 3 — specific to this shark's expertise, only needed for invest/conditional),
  "adviceStatus": "pending"
}]

Important: Be realistic with verdicts. Not all sharks should invest. Ensure at least 1 pass and vary between invest/conditional based on the pitch quality.` },
  ];
}

// ─── Step 3b: Shark Advice ────────────────────────────────────────
export function buildSharkAdvicePrompt(
  sharkName: string,
  sharkTitle: string,
  helpOptionLabel: string,
  helpOptionDescription: string,
  niche: NicheOpportunity,
  model: BusinessModel,
): AIMessage[] {
  return [
    {
      role: 'system', content: `You are ${sharkName} (${sharkTitle}). Write in first person, in your authentic voice and style. Be specific, direct, and actionable. Give real, implementable advice — not generic platitudes. Use your known frameworks and philosophy.`
    },
    {
      role: 'user', content: `
Give detailed advice on: "${helpOptionLabel}" — ${helpOptionDescription}

For this business:
- Niche: ${niche.name}
- Offer: ${model.offerName} at ${model.pricePoint}
- Target: ${niche.idealClient}
- Transformation: ${model.transformationPromise}

Return a JSON object:
{
  "adviceText": string (4-6 paragraphs of specific, actionable advice in your voice and style — reference your known frameworks where relevant),
  "keyRecommendation": string (single most important action — 1 sentence, maximum impact)
}` },
  ];
}

// ─── Step 4: Revenue Projector ────────────────────────────────────
export function buildRevenuePrompt(
  niche: NicheOpportunity,
  model: BusinessModel,
  approvedAdviceSummary: string,
): AIMessage[] {
  return [
    { role: 'system', content: SYSTEM_BASE },
    {
      role: 'user', content: `
Build a realistic 12-month revenue projection for this business.

Business:
- Niche: ${niche.name}
- Offer: ${model.offerName} at ${model.pricePoint}
- Format: ${model.format} (${model.duration})
${approvedAdviceSummary ? `- Advisor input: ${approvedAdviceSummary}` : ''}

Return a single JSON object:
{
  "assumptions": {
    "pricePerClient": string,
    "cohortSize": string,
    "launchMonth": string,
    "targetMonthly": string
  },
  "months": [
    {
      "month": number (1–12),
      "newClients": number,
      "totalClients": number,
      "revenue": number,
      "costs": number,
      "netProfit": number
    }
  ],
  "milestones": [
    { "month": number, "label": string }
  ] (3–4 key milestones),
  "criticalVariable": string (the one variable that makes or breaks this model),
  "mitigation": string (how to de-risk that variable)
}` },
  ];
}

// ─── Step 5: Messaging Engine ──────────────────────────────────────
export function buildMessagingPrompt(
  niche: NicheOpportunity,
  model: BusinessModel,
  approvedAdviceSummary: string,
): AIMessage[] {
  return [
    { role: 'system', content: SYSTEM_BASE },
    {
      role: 'user', content: `
Create complete marketing messaging for this business.

Business:
- Niche: ${niche.name}
- Offer: ${model.offerName} — ${model.transformationPromise}
- Target: ${niche.idealClient}
- Price: ${model.pricePoint}
- Positioning: ${model.positioningStatement}
${approvedAdviceSummary ? `- Advisor guidance: ${approvedAdviceSummary}` : ''}

Return a single JSON object:
{
  "headline": string (powerful, benefit-driven headline),
  "subheadline": string,
  "valueProposition": string (2-3 sentences),
  "targetPainPoints": string[] (3–4 specific pain points),
  "desiredOutcomes": string[] (3–4 specific outcomes they want),
  "objections": [
    { "objection": string, "reframe": string }
  ] (3 objections with reframes),
  "socialProof": string[] (3 types of social proof to gather),
  "callToAction": string,
  "emailSubjectLines": string[] (5 email subject lines),
  "socialPosts": [
    { "platform": string, "post": string }
  ] (one each for LinkedIn, Instagram, Facebook),
  "elevatorPitch": string (30-second spoken pitch)
}` },
  ];
}

// ─── Step 6: Launch Sprint ────────────────────────────────────────
export function buildLaunchPrompt(
  niche: NicheOpportunity,
  model: BusinessModel,
  approvedAdviceSummary: string,
): AIMessage[] {
  return [
    { role: 'system', content: SYSTEM_BASE },
    {
      role: 'user', content: `
Create a 30-day launch sprint plan for this business.

Business:
- Niche: ${niche.name}
- Offer: ${model.offerName} at ${model.pricePoint}
- Channels: ${model.acquisitionChannels?.map((c: { channel: string }) => c.channel).join(', ') || 'to be determined'}
${approvedAdviceSummary ? `- Advisor guidance: ${approvedAdviceSummary}` : ''}

Return a single JSON object:
{
  "goal": string (the specific 30-day goal with a number),
  "weeks": [
    {
      "week": number (1–4),
      "theme": string,
      "tasks": string[] (4–5 specific daily/weekly tasks),
      "milestone": string (what success looks like at end of this week)
    }
  ],
  "kpis": [
    { "metric": string, "target": string, "frequency": string }
  ] (4–5 KPIs to track),
  "tools": [
    { "category": string, "recommendation": string, "cost": string }
  ] (3–5 essential tools),
  "quickWins": string[] (3 things to do in the first 48 hours),
  "biggestRisk": string,
  "riskMitigation": string
}` },
  ];
}

// ─── Step 7: Reality Check ────────────────────────────────────────
export function buildRealityCheckPrompt(
  niche: NicheOpportunity,
  model: BusinessModel,
  approvedAdviceSummary: string,
): AIMessage[] {
  return [
    { role: 'system', content: SYSTEM_BASE },
    {
      role: 'user', content: `
Perform a brutally honest reality check on this business plan.

Business:
- Niche: ${niche.name}
- Offer: ${model.offerName} at ${model.pricePoint}
- Transformation: ${model.transformationPromise}
- Positioning: ${model.positioningStatement}
${approvedAdviceSummary ? `- Advisor context: ${approvedAdviceSummary}` : ''}

Return a single JSON object:
{
  "overallVerdict": "strong" | "viable" | "risky" | "rethink",
  "verdictSummary": string (2-3 honest sentences),
  "score": number (1–10 overall viability score),
  "strengths": [
    { "title": string, "detail": string }
  ] (3 genuine strengths),
  "weaknesses": [
    { "title": string, "detail": string, "severity": "low" | "medium" | "high" }
  ] (3–4 real weaknesses),
  "assumptions": [
    { "assumption": string, "riskLevel": "low" | "medium" | "high", "validationTest": string }
  ] (3–5 key assumptions being made),
  "competitorThreat": string,
  "regulatoryConsiderations": string,
  "blindSpots": string[] (2–3 things the founder probably hasn't considered),
  "finalAdvice": string (the most important thing to do right now — be direct)
}` },
  ];
}
