import type {
    NicheOpportunity,
    BusinessModel,
    RevenueProjection,
    MessagingData,
    LaunchPlan,
    RealityCheckData,
    SharkEvaluation,
} from '../store/store';

// ============================================
// MOCK DATA: Based on "Stress Management for
// Healthcare Workers" Journey A from Brainstorm
// ============================================

export const MOCK_NICHE_RESULTS: NicheOpportunity[] = [
    {
        id: 1, name: 'Stress Management for Healthcare Workers',
        painPoint: 'Chronic burnout, compassion fatigue, and emotional exhaustion among nurses, doctors, and hospital staff with no accessible, practitioner-led support.',
        idealClient: 'Registered nurses and nurse managers (25-45) working in high-stress hospital units, seeking practical stress relief tools they can use during shifts.',
        deliveryModel: '6-week group program with recorded audio support + live weekly Q&A',
        revenueRange: '$5,000 – $12,000/month',
        credibilityPlay: 'Your hospital background gives you instant insider credibility that generic wellness coaches lack.',
        scalabilityScore: 8, easeOfEntry: 7, overallScore: 91,
        gapAnalysis: 'Current solutions are either expensive EAP programs or generic meditation apps. No one offers practitioner-led, cohort-based stress programs designed specifically for shift workers.',
        summary: 'High-demand niche with strong emotional urgency, massive addressable market, and a clear credibility advantage from your clinical background.',
    },
    {
        id: 2, name: 'Sleep Coaching for New Parents',
        painPoint: 'Sleep deprivation destroying relationships, mental health, and work performance in first-time parents.',
        idealClient: 'New parents (28-40) in their first 18 months, specifically those returning to demanding professional roles.',
        deliveryModel: '8-week 1:1 coaching program with async messaging support',
        revenueRange: '$4,000 – $8,000/month',
        credibilityPlay: 'Combination of sleep science knowledge and empathetic coaching approach.',
        scalabilityScore: 7, easeOfEntry: 8, overallScore: 82,
        gapAnalysis: 'Sleep consultants focus on baby sleep training. Nobody focuses on parental sleep recovery and performance.',
        summary: 'Strong emotional trigger niche with premium willingness-to-pay and low competition for the parent-focused angle.',
    },
    {
        id: 3, name: 'Performance Coaching for Entrepreneurs',
        painPoint: 'Founders hitting revenue plateaus due to mental blocks, decision fatigue, and isolation.',
        idealClient: 'Solo entrepreneurs and small agency founders ($200k–$1M revenue) who have outgrown early-stage hustle tactics.',
        deliveryModel: 'Monthly mastermind group (8-12 members) + biweekly 1:1 calls',
        revenueRange: '$6,000 – $15,000/month',
        credibilityPlay: 'Deep understanding of performance psychology applied to business growth.',
        scalabilityScore: 7, easeOfEntry: 6, overallScore: 78,
        gapAnalysis: 'Business coaches focus on strategy. Performance coaches focus on athletes. Nobody sits at the intersection for founders.',
        summary: 'High revenue potential but competitive landscape. Requires strong personal brand to differentiate.',
    },
    {
        id: 4, name: 'Grief Support Memberships',
        painPoint: 'Ongoing, long-term grief support virtually nonexistent after the first few months of loss.',
        idealClient: 'Adults (35-65) navigating grief 3-24 months after a significant loss, especially those whose support networks have "moved on."',
        deliveryModel: 'Monthly membership with weekly group sessions, resource library, and peer community',
        revenueRange: '$3,000 – $7,000/month',
        credibilityPlay: 'Authentic, non-clinical approach that feels human rather than therapeutic.',
        scalabilityScore: 6, easeOfEntry: 7, overallScore: 71,
        gapAnalysis: 'Therapy addresses acute grief. Memberships for ongoing support are nearly non-existent in this space.',
        summary: 'Deeply meaningful niche with steady demand. Lower revenue ceiling but exceptional retention potential.',
    },
    {
        id: 5, name: 'Mindfulness for Corporate Teams',
        painPoint: 'Companies spending on wellness programs that employees ignore because they feel forced and generic.',
        idealClient: 'HR directors and wellness coordinators at companies with 100-500 employees seeking engaging, measurable programs.',
        deliveryModel: 'B2B workshop series (4-6 sessions) delivered onsite or via Zoom, plus digital resource kit',
        revenueRange: '$8,000 – $20,000/month',
        credibilityPlay: 'Bridge between clinical credibility and corporate professionalism.',
        scalabilityScore: 8, easeOfEntry: 5, overallScore: 68,
        gapAnalysis: 'Corporate wellness is growing but undifferentiated. Most programs are app-based without live facilitation.',
        summary: 'Highest revenue ceiling but requires B2B sales skills and longer sales cycles. Strong long-term play.',
    },
    {
        id: 6, name: 'Anxiety Coaching for College Students',
        painPoint: 'Rising anxiety and academic burnout among college students, with university counseling centers overwhelmed.',
        idealClient: 'College juniors and seniors (20-23) navigating academic pressure, career anxiety, and identity questions.',
        deliveryModel: 'Online group workshops (6-week cycles) with peer accountability pods',
        revenueRange: '$2,000 – $5,000/month',
        credibilityPlay: 'Approachable, non-clinical style that resonates with younger demographics.',
        scalabilityScore: 7, easeOfEntry: 8, overallScore: 65,
        gapAnalysis: 'University counseling is overwhelmed. Private therapy is expensive. No accessible middle-ground for ongoing support.',
        summary: 'Easy entry but lowest price point tolerance. Best as a stepping stone to higher-ticket offerings.',
    },
];

export const MOCK_BUSINESS_MODEL: BusinessModel = {
    offerName: 'Resilient Shift — Stress Mastery for Healthcare Professionals',
    offerDescription: 'A 6-week group coaching program that gives healthcare workers practical, evidence-based tools to manage stress, prevent burnout, and rebuild energy — without quitting their jobs.',
    deliverables: [
        '6 weekly live group sessions (90 min each, recorded)',
        'Custom audio relaxation tracks for shift workers',
        'Stress Response Toolkit (digital workbook)',
        'Private community access for peer support',
        'Two 1:1 laser coaching calls',
        'Post-program: 30-day integration check-in',
    ],
    transformationPromise: 'In 6 weeks, go from surviving each shift to feeling in control of your stress response, sleeping better, and actually enjoying your days off.',
    format: 'Group cohort (max 12 participants)',
    duration: '6 weeks + 30-day follow-up',
    pricingModel: 'One-time cohort fee',
    pricePoint: '$497 per participant',
    paymentOptions: ['Full payment ($497)', '2 payments of $265', 'Employer-sponsored (invoice provided)'],
    scalabilityPhases: [
        { phase: 'MVP', months: 'Months 1–3', description: 'Run 2 cohorts manually. Validate messaging. Collect 10+ testimonials. Refine curriculum based on feedback.' },
        { phase: 'Expansion', months: 'Months 4–6', description: 'Launch monthly cohorts. Add self-paced audio module. Partner with 2 nursing associations for referrals. Hire VA for admin.' },
        { phase: 'Scale', months: 'Months 7–12', description: 'Develop certification for other practitioners. License curriculum to hospital wellness programs. Create evergreen course version at $197.' },
    ],
    acquisitionChannels: [
        { channel: 'LinkedIn Outreach', cost: '$0 (organic)', description: 'Direct outreach to nurse managers and healthcare LinkedIn communities. 5 DMs/day targeting unit leads.' },
        { channel: 'Nursing Association Partnerships', cost: '$500/quarter', description: 'Sponsor newsletter features and conference booth at 2 state nursing associations.' },
        { channel: 'Instagram/TikTok Content', cost: '$0 (organic)', description: 'Short-form video content: "60-second shift reset" techniques, behind-the-scenes of program creation.' },
    ],
    positioningStatement: 'The only stress management program built by a healthcare insider, for healthcare workers — not another generic mindfulness app that doesn\'t understand 12-hour shifts.',
    contrarian: 'While everyone tells healthcare workers to "practice self-care," Resilient Shift teaches stress mastery — the ability to perform under pressure without accumulating emotional damage.',
    onePageSummary: 'Resilient Shift is a 6-week group coaching program priced at $497/participant (12 per cohort) that helps healthcare workers master their stress response. Built on clinical credibility, delivered through live sessions with recorded support, and scaled through nursing association partnerships. Target: $5,964/cohort, reaching $12k/month by month 4 with 2 monthly cohorts. Expansion into certification and licensing by month 7.',
};

// MOCK_MARKET_VALIDATION removed — step 3 is now the Shark Tank Feeding Frenzy

export const MOCK_REVENUE_PROJECTION: RevenueProjection = {
    assumptions: {
        'Launch Month': 'March 2026',
        'Starting Audience': '500 LinkedIn connections',
        'Price per Seat': '$497',
        'Cohort Size': '12 participants',
        'Monthly Marketing Budget': '$200',
        'Conversion Rate': '3%',
        'Available Hours/Week': '8',
    },
    months: [
        { month: 1, newClients: 6, totalClients: 6, revenue: 2982, costs: 400, netProfit: 2582 },
        { month: 2, newClients: 8, totalClients: 8, revenue: 3976, costs: 450, netProfit: 3526 },
        { month: 3, newClients: 12, totalClients: 12, revenue: 5964, costs: 500, netProfit: 5464 },
        { month: 4, newClients: 14, totalClients: 14, revenue: 6958, costs: 550, netProfit: 6408 },
        { month: 5, newClients: 18, totalClients: 18, revenue: 8946, costs: 600, netProfit: 8346 },
        { month: 6, newClients: 22, totalClients: 22, revenue: 10934, costs: 700, netProfit: 10234 },
        { month: 7, newClients: 24, totalClients: 24, revenue: 11928, costs: 800, netProfit: 11128 },
        { month: 8, newClients: 24, totalClients: 24, revenue: 11928, costs: 800, netProfit: 11128 },
        { month: 9, newClients: 28, totalClients: 28, revenue: 13916, costs: 900, netProfit: 13016 },
        { month: 10, newClients: 30, totalClients: 30, revenue: 14910, costs: 1000, netProfit: 13910 },
        { month: 11, newClients: 32, totalClients: 32, revenue: 15904, costs: 1000, netProfit: 14904 },
        { month: 12, newClients: 36, totalClients: 36, revenue: 17892, costs: 1100, netProfit: 16792 },
    ],
    milestones: [
        { label: 'Breakeven', month: 1 },
        { label: 'First $5k month', month: 3 },
        { label: 'First $10k month', month: 6 },
    ],
    criticalVariable: 'LinkedIn outreach conversion rate. If DM-to-enrollment drops below 2%, monthly capacity targets won\'t be met without paid advertising.',
    mitigation: 'Build an email nurture sequence from free workshop attendees to reduce dependence on cold outreach. Target: 200-person email list by month 3.',
};

export const MOCK_MESSAGING_DATA: MessagingData = {
    hooks: [
        { type: 'Short-form Video', hook: '"I worked 12-hour shifts for 7 years before I learned this one technique that changed everything."', angle: 'Personal story + curiosity gap' },
        { type: 'Short-form Video', hook: '"Your hospital\'s wellness program is failing you. Here\'s what actually works."', angle: 'Contrarian take + promise' },
        { type: 'Short-form Video', hook: '"The 60-second reset that got me through my worst shift."', angle: 'Practical value + relatability' },
        { type: 'Short-form Video', hook: '"Stop telling nurses to practice self-care. Start teaching them stress mastery."', angle: 'Industry challenge' },
        { type: 'Long-form Post', hook: '"I burned out so badly I sat in my car for 20 minutes after every shift, unable to go inside. That\'s when I realized..."', angle: 'Vulnerable story arc' },
        { type: 'Long-form Post', hook: '"3 stress management techniques that actually work when you\'re mid-shift (not just when you\'re at a yoga retreat)"', angle: 'Practical value listicle' },
        { type: 'Long-form Post', hook: '"Why I stopped telling my healthcare clients to \'just breathe\' and started teaching them this instead"', angle: 'Method revelation' },
        { type: 'Long-form Post', hook: '"The hidden cost of compassion fatigue nobody talks about: what it does to your relationships at home"', angle: 'Impact expansion' },
        { type: 'Email/Blog', hook: '"The #1 mistake healthcare workers make when trying to manage stress (and what to do instead)"', angle: 'Mistake framework' },
        { type: 'Email/Blog', hook: '"What I wish I knew about burnout before my worst year in healthcare"', angle: 'Hindsight wisdom' },
        { type: 'Email/Blog', hook: '"How 12 nurses went from dreading their shifts to feeling in control — in just 6 weeks"', angle: 'Case study / results' },
        { type: 'Email/Blog', hook: '"Your stress isn\'t the problem. Your stress response is. Here\'s the difference."', angle: 'Reframe + education' },
    ],
    outreach: [
        { step: 1, label: 'Curiosity', message: 'Hi [Name], I noticed you\'re a [role] at [hospital]. I\'m working on something specifically for healthcare professionals dealing with shift stress — curious if this resonates with your team?' },
        { step: 2, label: 'Value', message: 'Thanks for connecting! I put together a free guide: "5 Shift-Proof Stress Reset Techniques." Want me to send it over? No strings attached.' },
        { step: 3, label: 'Proof', message: 'Wanted to share — just finished a 6-week program with a group of ER nurses. One said: "For the first time in 3 years, I don\'t dread going to work." That feedback keeps me going.' },
        { step: 4, label: 'Invitation', message: 'I\'m running a free 1-hour workshop next [day]: "The 60-Second Shift Reset." It\'s designed for healthcare workers who want practical tools, not another meditation app. Would your team be interested?' },
        { step: 5, label: 'Close', message: 'Based on the workshop feedback, I\'m opening 12 spots for the next Resilient Shift cohort starting [date]. Early enrollment is $497 (or 2 payments of $265). Would you like me to send the details?' },
    ],
    prospectSearches: [
        '"nurse manager" OR "charge nurse" site:linkedin.com -recruiter',
        'r/nursing "burnout" OR "stressed" OR "overwhelmed" reddit.com',
        '"healthcare worker" "wellness" Facebook groups',
        '"nursing association" OR "ANA chapter" directory site:nursingworld.org',
        '"hospital wellness coordinator" OR "employee health" site:linkedin.com',
    ],
    trustPhrases: {
        use: ['I\'ve been in your shoes', 'Evidence-based approach', 'Built for shift workers', 'Small group, personal attention', 'Real tools, not platitudes'],
        avoid: ['Guru', 'Life-changing', 'Guaranteed results', 'Quick fix', 'Hustle'],
    },
    topObjection: '"I don\'t have time for another program — I\'m already overwhelmed."',
    objectionResponse: '"That\'s exactly why this exists. The techniques are designed to be used during your shift, not on top of it. Most participants say they actually gained time back because they stopped losing hours to stress spiraling."',
};

export const MOCK_LAUNCH_PLAN: LaunchPlan = {
    weeks: [
        {
            week: 1, theme: 'Foundation & Visibility',
            actions: [
                { day: 'Mon', action: 'Publish LinkedIn post: personal burnout story with "If this resonates, DM me" CTA', done: false },
                { day: 'Tue', action: 'Send 5 connection requests to nurse managers with personalized notes', done: false },
                { day: 'Wed', action: 'Post Instagram Reel: "60-second shift reset technique #1"', done: false },
                { day: 'Thu', action: 'Share free guide in 2 nursing Facebook groups (with admin permission)', done: false },
                { day: 'Fri', action: 'Send 5 more LinkedIn DMs to healthcare professionals who engaged with your content', done: false },
            ],
            benchmark: '15+ LinkedIn connections accepted, 3+ DM conversations started',
        },
        {
            week: 2, theme: 'Free Workshop Launch',
            actions: [
                { day: 'Mon', action: 'Post workshop announcement on LinkedIn + Instagram + Facebook groups', done: false },
                { day: 'Tue', action: 'Send workshop invitation to all DM contacts from Week 1', done: false },
                { day: 'Wed', action: 'Deliver free "Shift Reset" workshop (1 hour, Zoom, recorded)', done: false },
                { day: 'Thu', action: 'Send follow-up email to all attendees with replay link + feedback survey', done: false },
                { day: 'Fri', action: 'Post 3 key takeaways from the workshop on social media', done: false },
            ],
            benchmark: '30+ workshop registrations, 15+ live attendees, 5+ survey responses',
        },
        {
            week: 3, theme: 'Enrollment Open',
            actions: [
                { day: 'Mon', action: 'Announce Resilient Shift program with early-bird pricing on all channels', done: false },
                { day: 'Tue', action: 'Send personal invitations to top 10 workshop attendees', done: false },
                { day: 'Wed', action: 'Post testimonial/feedback from workshop in all social channels', done: false },
                { day: 'Thu', action: 'Host 15-min "Ask Me Anything" on LinkedIn Live or Instagram', done: false },
                { day: 'Fri', action: 'Send "3 spots left" update to email list and top prospects', done: false },
            ],
            benchmark: '6+ enrolled participants, 20+ email list subscribers',
        },
        {
            week: 4, theme: 'Close & Prepare',
            actions: [
                { day: 'Mon', action: 'Final enrollment push: "Doors close Thursday" on all channels', done: false },
                { day: 'Tue', action: 'Send "Last chance" personal DMs to warm prospects', done: false },
                { day: 'Wed', action: 'Close enrollment. Send welcome packet to all participants', done: false },
                { day: 'Thu', action: 'Record intro video and set up private community/group', done: false },
                { day: 'Fri', action: 'Month 1 review: assess metrics, plan Month 2 cohort, document learnings', done: false },
            ],
            benchmark: '10-12 enrolled participants, next cohort dates announced',
        },
    ],
    kpis: [
        { metric: 'LinkedIn Connections (healthcare)', target: '50+ new', good: '75+ new' },
        { metric: 'DM Conversations', target: '20+', good: '35+' },
        { metric: 'Workshop Registrations', target: '30+', good: '50+' },
        { metric: 'Email List Size', target: '50+', good: '100+' },
        { metric: 'Enrolled Participants', target: '8+', good: '12 (full cohort)' },
        { metric: 'Revenue', target: '$3,976+', good: '$5,964+ (full cohort)' },
    ],
    scorecard: 'If you hit 8+ enrollments and built a 50-person email list: DOUBLE DOWN — launch 2 cohorts in Month 2. If you hit 4-7 enrollments: ITERATE — adjust pricing or messaging based on feedback, run another workshop. If fewer than 4 enrollments: PIVOT — test new positioning, different audience segment, or free-to-paid funnel before investing more.',
};

export const MOCK_REALITY_CHECK: RealityCheckData = {
    failurePatterns: [
        { pattern: 'Underpricing to avoid rejection', applies: true, detail: 'At $497, you\'re positioned at the low end for a 6-week professional program. Healthcare workers with full-time incomes can afford $697-$897, especially with employer reimbursement options.' },
        { pattern: 'Over-investing in content before validation', applies: false, detail: 'Your MVP approach (live sessions + basic materials) is correct. Don\'t spend months creating a polished course before your first cohort.' },
        { pattern: 'Marketing to everyone instead of a specific buyer', applies: false, detail: 'Your niche (nurse managers and shift workers) is well-defined. Keep this focus.' },
        { pattern: 'Waiting for perfection before launching', applies: true, detail: 'Don\'t wait until your curriculum is "perfect." Your first cohort IS your R&D. Ship the workshop in Week 2 even if it feels rough.' },
        { pattern: 'Neglecting follow-up and testimonial collection', applies: true, detail: 'Plan to collect video testimonials from day 1. These are your most powerful marketing asset and most practitioners forget to ask.' },
    ],
    missedOpportunities: [
        { title: 'Employer Reimbursement Angle', impact: 'Adding a formal CPD/CEU component could make your program reimbursable by hospitals, removing the price objection entirely and increasing willingness-to-pay by 40-60%.' },
        { title: 'Referral Program', impact: 'Healthcare workers talk to each other in break rooms. A "bring a colleague" discount ($100 off for both) could reduce acquisition costs by 50% after cohort 1.' },
        { title: 'Unit-Based Group Booking', impact: 'Instead of individual enrollment, offer a discounted rate for hospital units that enroll 3+ members together. This turns nurse managers into your sales team.' },
    ],
    contrarianPlay: 'Price at $697 (not $497) and offer a "Manager Scholarship" program where the participant\'s manager can nominate them for a 30% discount. This creates a referral loop through management, adds perceived value, and still nets higher revenue per participant.',
    stallRisk: 'The most likely reason this stalls at $3-5k/month: relying solely on manual LinkedIn outreach without building a repeatable content-to-enrollment funnel. By month 3, outreach fatigue sets in and growth flattens.',
    stallPrevention: 'Build an automated email nurture sequence (free guide → workshop invitation → enrollment offer) by Month 2. This creates a self-sustaining pipeline that works while you deliver sessions.',
    oneSentenceInsight: 'Your biggest competitive advantage isn\'t your methodology — it\'s that you\'ve walked the same hospital corridors as your clients, and no certification program or app can replicate that trust.',
};

export const FEATURE_STEPS = [
    { id: 1, name: 'Niche Finder', description: 'Discover your highest-potential niche opportunity' },
    { id: 2, name: 'Model Builder', description: 'Design your business model and offer' },
    { id: 3, name: 'Feeding Frenzy', description: 'Present your pitch to the Shark panel' },
    { id: 4, name: 'Revenue Projector', description: 'Build your 12-month financial model' },
    { id: 5, name: 'Messaging Engine', description: 'Create your go-to-market messaging' },
    { id: 6, name: 'Launch Sprint', description: 'Plan your first 30 days of execution' },
    { id: 7, name: 'Reality Check', description: 'Audit your plan for blind spots' },
];

// ─── Shark Tank Feeding Frenzy Mock Data ──────────────────────────

export const MOCK_SHARK_EVALUATIONS: SharkEvaluation[] = [
    {
        id: 'hormozi',
        name: 'Alex Hormozi',
        title: 'The Offer Architect',
        accentColor: '#ef4444',
        emoji: '💰',
        score: 8,
        verdict: 'invest',
        observations: [
            'Your $497 price point undervalues the outcome by at least 3x. Healthcare workers earning $80k+ will pay more for a program that keeps them in their career.',
            'The 6-week group format is smart — cohort accountability increases completion rates. But you need a 1:1 onboarding call to increase perceived likelihood of success.',
            'No recurring revenue component. One-and-done models require constant new client acquisition. You need an ascension path.',
        ],
        criticalQuestion: 'If this program genuinely helps a nurse avoid burnout and stay in their career, what is that outcome worth to them in dollars over the next 5 years?',
        helpOptions: [
            { id: 'hormozi_1', buttonLabel: 'Restructure My Offer', description: 'Redesign using the Grand Slam framework to maximize perceived value and justify premium pricing.' },
            { id: 'hormozi_2', buttonLabel: 'Fix My Pricing', description: 'Build a pricing strategy with anchoring, payment plans, and a risk-removing guarantee.' },
            { id: 'hormozi_3', buttonLabel: 'Add Recurring Revenue', description: 'Design an ascension model so every client has a clear, valuable next step.' },
        ],
        adviceStatus: 'pending',
    },
    {
        id: 'blakely',
        name: 'Sara Blakely',
        title: 'The Scrappy Launcher',
        accentColor: '#f59e0b',
        emoji: '🚀',
        score: 7,
        verdict: 'invest',
        observations: [
            'I love that you have direct experience in this world. That insider perspective is your unfair advantage — lean into it hard.',
            'Your plan has too many moving parts before first revenue. You can cut 70% of the setup and still launch a version people will pay for.',
            'The free workshop idea is exactly right. That is your proof of concept. Do that first, before anything else.',
        ],
        criticalQuestion: 'What is the absolute minimum version of this program you could run next Monday, using only what you already have, to collect your first payment?',
        helpOptions: [
            { id: 'blakely_1', buttonLabel: 'Strip to MVP Launch', description: 'Cut the plan down to the minimum viable version you can launch within 7 days.' },
            { id: 'blakely_2', buttonLabel: 'Pre-Sell Strategy', description: 'How to collect payment before the program is fully built, removing all financial risk.' },
            { id: 'blakely_3', buttonLabel: 'Simplify My Pitch', description: 'Refine your offer to a single sentence that makes strangers immediately say "I need that."' },
        ],
        adviceStatus: 'pending',
    },
    {
        id: 'godin',
        name: 'Seth Godin',
        title: 'The Positioning Strategist',
        accentColor: '#8b5cf6',
        emoji: '🎯',
        score: 9,
        verdict: 'invest',
        observations: [
            'You have found a genuine tribe — healthcare workers who feel unseen by generic wellness advice. That is powerful positioning.',
            'Your contrarian angle ("stress mastery" vs "self-care") is remarkable. That IS your Purple Cow. Build everything around it.',
            'Your permission asset strategy is weak. Social posts disappear. You need an email list growing every week from day one.',
        ],
        criticalQuestion: 'Can you name 10 real people, by first name, who are your ideal clients — and do you know exactly where to find 1,000 more just like them?',
        helpOptions: [
            { id: 'godin_1', buttonLabel: 'Define My Tribe', description: 'Identify the specific 100-1,000 people who would be your ideal first clients and where they gather.' },
            { id: 'godin_2', buttonLabel: 'Sharpen My Positioning', description: 'Reframe the offer around the change it creates, making your messaging undeniable.' },
            { id: 'godin_3', buttonLabel: 'Build Permission Asset', description: 'Design an email list growth strategy that compounds over time.' },
        ],
        adviceStatus: 'pending',
    },
    {
        id: 'jobs',
        name: 'Steve Jobs',
        title: 'The Experience Perfectionist',
        accentColor: '#06b6d4',
        emoji: '✦',
        score: 6,
        verdict: 'conditional_invest',
        condition: 'I will invest if you commit to designing the client experience from first touchpoint to last before you run your first cohort. Right now you have an offer. You do not yet have an experience.',
        observations: [
            'The content of what you are teaching is right. The experience of going through your program is not yet designed — it is assembled.',
            'What happens in the first 60 seconds after a client pays? That moment defines the entire relationship. Most practitioners waste it with a generic email.',
            'Your deliverable list (6 sessions, workbook, audio tracks, community) tells me you have added features. I want you to subtract until only the essential remains.',
        ],
        criticalQuestion: 'If a client could only experience one thing from your entire program — the one thing that would make them tell every colleague about it — what would it be?',
        helpOptions: [
            { id: 'jobs_1', buttonLabel: 'Design Onboarding Moment', description: 'Create a remarkable first-60-seconds experience that sets the emotional tone for everything.' },
            { id: 'jobs_2', buttonLabel: 'Simplify My Offer', description: 'Remove everything that is not essential until the offer is as powerful as possible.' },
            { id: 'jobs_3', buttonLabel: 'Map Client Journey', description: 'Design every touchpoint deliberately so the whole experience feels like one unified thing.' },
        ],
        adviceStatus: 'pending',
    },
    {
        id: 'naval',
        name: 'Naval Ravikant',
        title: 'The Leverage Engineer',
        accentColor: '#10b981',
        emoji: '⚡',
        score: 5,
        verdict: 'pass',
        observations: [
            'You are building a practice, not a business. Every cohort requires 12+ hours of your live time. At capacity, you will be exhausted before you are wealthy.',
            'Your specific knowledge — the insider healthcare perspective — is genuinely valuable. But you have not productized it. It lives only in your head and your live sessions.',
        ],
        criticalQuestion: 'If you took 30 days off, would this business still generate revenue? If not, what would need to change for the answer to become yes?',
        whatWouldChangeMind: 'Show me a plan to build at least one revenue stream that does not require your live presence — a recorded curriculum, an evergreen program, or a licensed methodology — and I will reconsider.',
        helpOptions: [],
        adviceStatus: 'pending',
    },
    {
        id: 'forleo',
        name: 'Marie Forleo',
        title: 'The Audience Builder',
        accentColor: '#ec4899',
        emoji: '🌟',
        score: 8,
        verdict: 'invest',
        observations: [
            'Your personality and insider story are your greatest marketing assets, and they are completely absent from your current plan. Put yourself in the content.',
            'You have a solid offer but no discovery engine. How do strangers become aware of you? The first 50 clients are the hardest if you do not solve this.',
            'Healthcare workers talk to each other constantly. A referral mechanism built into your program could make your clients your best salespeople.',
        ],
        criticalQuestion: 'If you commit to showing up as a real, relatable human being in your marketing — sharing your actual story and honest perspective — what would you say that nobody else in this space is saying?',
        helpOptions: [
            { id: 'forleo_1', buttonLabel: 'Build Discovery Engine', description: 'A 90-day plan to go from zero to a meaningful owned audience using your strongest medium.' },
            { id: 'forleo_2', buttonLabel: 'Activate My Story', description: 'Identify your most magnetic personal angle and integrate it into your brand voice and content.' },
            { id: 'forleo_3', buttonLabel: 'Design Referral Loop', description: 'Build a referral mechanism into your program so clients naturally recruit their colleagues.' },
        ],
        adviceStatus: 'pending',
    },
    {
        id: 'davinci',
        name: 'Leonardo da Vinci',
        title: 'The Innovation Futurist',
        accentColor: '#f97316',
        emoji: '🎨',
        score: 7,
        verdict: 'invest',
        observations: [
            'This is a good program. There are 200 others like it. What I am searching for is the one element that makes this impossible to copy because nobody else has your combination of inputs.',
            'You have 15 years of observation in healthcare settings. What have you seen that nobody else has articulated? That insight is your innovation.',
            'The convergence of mental health awareness, AI tools for personalization, and the post-pandemic burnout crisis creates an extraordinary timing opportunity for something genuinely new.',
        ],
        criticalQuestion: 'What is the one observation you have made about burnout in healthcare workers that is so specific and counterintuitive that, when you say it aloud, people look at you differently?',
        helpOptions: [
            { id: 'davinci_1', buttonLabel: 'Find My Unique Insight', description: 'Excavate the one thing you know that nobody else in this space has articulated yet.' },
            { id: 'davinci_2', buttonLabel: 'Cross-Disciplinary Innovation', description: 'Combine your methodology with an unexpected field to create something genuinely uncopyable.' },
            { id: 'davinci_3', buttonLabel: 'Future-Proof My Offer', description: 'Identify how emerging trends and tools can be woven in to stay ahead of the market.' },
        ],
        adviceStatus: 'pending',
    },
];

export const MOCK_SHARK_ADVICE: Record<string, { adviceText: string; keyRecommendation: string }> = {
    hormozi_1: {
        keyRecommendation: 'Restructure as a 12-week program at $1,997 with a 3-pay option, adding a 1:1 onboarding call and a 30-day money-back guarantee to maximize perceived value.',
        adviceText: `Your current offer — 6 weeks at $497 — is priced like a community class, not a professional transformation. Here is how I would restructure it using the Grand Slam framework.\n\nFirst, extend to 12 weeks. Not because the content needs 12 weeks, but because the transformation does. Burnout that took years to build does not reverse in 6 weeks. The longer timeframe also justifies a higher price and signals deeper commitment.\n\nSecond, rename the deliverables. Instead of "6 weekly sessions," offer "12 Shift Mastery Labs." Instead of "workbook," offer the "Burnout Code Toolkit" — a clinical decision framework for real-time stress situations. Small language changes create massive perceived value differences.\n\nThird, add a 1:1 onboarding call (30 minutes). This single addition increases perceived likelihood of success more than any other element. It signals personalization. Do this before Week 1.\n\nFourth, add a guarantee: "Complete all 12 weeks and implement the tools. If you do not feel measurably more in control of your stress response, I will refund you fully." This removes the risk from the buyer and transfers it to you — which is exactly where it should be if you believe in your program.\n\nNew price: $1,997 (or 3 payments of $737). This is not 4x the price for the same product. This is a categorically different offer that happens to use the same core curriculum.\n\nYour next step in the next 24 hours: write out the new offer stack with the renamed deliverables. Do not change the curriculum. Change the framing. See how it feels.`,
    },
    hormozi_2: {
        keyRecommendation: 'Price at $997 with a 2-pay option of $547, anchored against a $1,497 "standard" rate, with a 30-day completion guarantee that removes buyer risk.',
        adviceText: `Your pricing problem is not greed — it is fear. At $497, you are pricing based on what feels safe to ask for, not what the outcome is worth. Let me fix that.\n\nThe anchor strategy: your public pricing should be $1,497. This is your "standard" rate. Then offer a limited early-cohort price of $997 (with a 2-pay option of $547). This makes $997 feel like a bargain rather than an expense. Every pricing decision your client makes is relative — anchor high and discount strategically.\n\nThe payment plan math: if $997 feels like a stretch for your market, the 2-pay option at $547 is psychologically a different purchase. It fits in a monthly budget. People do not buy on price; they buy on monthly affordability.\n\nThe guarantee design: "If you attend all 12 sessions and complete the weekly exercises, and you do not feel a measurable shift in how you handle shift stress, I will refund every dollar." The completion requirement is critical — it filters out people who will not do the work, and it almost never gets triggered because people who complete programs almost never ask for refunds.\n\nEmployer reimbursement: create a one-page PDF titled "Professional Development Investment Summary" that participants can submit to their HR department. Many hospitals have wellness and professional development budgets. This can make your $997 completely free to the participant. Add a line to your enrollment page: "Ask your HR department about professional development reimbursement."\n\nYour next step in the next 24 hours: update your landing page with the anchor price ($1,497 standard / $997 launch). Add the 2-pay option. Add the guarantee. Send it to 3 people you trust and ask if the new pricing feels believable.`,
    },
    hormozi_3: {
        keyRecommendation: 'Add a $97/month "Resilient Shift Alumni" membership after program completion, giving graduates ongoing community access and monthly group calls.',
        adviceText: `Every client you earn through blood, sweat, and marketing should be worth more than one transaction. Right now, your Resilient Shift program ends and the client disappears. That is a broken model.\n\nHere is the ascension path I would build for you.\n\nTier 1 — Resilient Shift Core ($997): Your existing 12-week program. This is the foundation.\n\nTier 2 — Resilient Shift Alumni ($97/month): After completing the program, graduates join an ongoing monthly membership. They get: one 60-minute monthly group coaching call (hot seat format), access to a private community of program alumni, a monthly "Shift Reset" audio (new each month), and accountability partnerships. You run this call once per month. As you grow to 50 alumni, this membership generates $4,850/month of recurring revenue from a single monthly call.\n\nTier 3 — Resilient Shift Facilitator ($2,997 one-time): For nurses, coaches, or wellness coordinators who want to teach your methodology to their own teams. You certify them, they license your content, and you collect a modest royalty per cohort they run. This is your leverage play — you get paid every time someone else teaches your system.\n\nThe beauty of this model: after 12 months, if you have 100 program graduates and 60% convert to alumni membership, that is $5,820/month of base recurring revenue before you run a single new cohort.\n\nYour next step in the next 24 hours: write three sentences describing the alumni membership and add it as a "what comes next" section to your existing program overview. Do not build it yet. Just seed the idea with your current prospects.`,
    },
    blakely_1: {
        keyRecommendation: 'Announce a beta cohort of 5 people this week via a direct Facebook post. Deliver live over Zoom with a Google Doc workbook. Charge $297. Launch in 7 days.',
        adviceText: `Throw away 90% of your plan. Here is what you actually need to launch this week.\n\nMonday: Post this exact message in two nursing Facebook groups where you are already a member: "I am running a small beta group for nurses who are burned out and want practical tools — not a meditation app. 5 spots. 4 weeks. Zoom. $297. DM me 'burnout' if you are interested." That is your launch.\n\nTuesday-Wednesday: Have conversations with everyone who DMs you. Listen more than you pitch. Ask them what is actually happening on their shifts. This is your market research AND your sales calls.\n\nThursday: Collect payment from your first 3-5 beta participants via Stripe, PayPal, or bank transfer. Whatever is easiest. Do not build a course platform. Do not create a website. Do not record anything.\n\nFriday-Sunday: Build your Week 1 content. You need 45 minutes of material. One concept. Three techniques. One exercise. That is it.\n\nWeek 2: Deliver Session 1. Use a Google Slide deck if you want visuals. Take notes on what resonates. What questions do they ask? What lights them up? This is your actual curriculum — your participants are writing it with you.\n\nThe fancy version — the workbooks, the branded portal, the audio tracks — comes in Month 2 after you have proof this works and testimonials to prove it. Right now you need: one person paying you money to help them. Go get that person today.\n\nYour next step in the next 24 hours: write that Facebook post. Post it before you go to sleep tonight.`,
    },
    blakely_2: {
        keyRecommendation: 'Open a pre-sale for the next cohort with 50% deposit ($149) before launching your workshop, collecting payment commitments before building anything.',
        adviceText: `The most powerful thing you can do before building anything is collect money. Not a waitlist — actual money. Here is how to pre-sell your program before it exists in its final form.\n\nThe pre-sale offer: "I am building the Resilient Shift program for healthcare workers and opening 8 spots for a founding member cohort. Founding members pay $297 now (50% off the standard $597 rate) and get lifetime access to all future program updates plus a personal thank-you call from me. Doors close when 8 spots are filled."\n\nWhy this works: the price reduction creates urgency. The "founding member" status creates exclusivity. The lifetime updates create future value. And YOU have proof of demand before investing another hour in curriculum.\n\nWhere to post it: your personal Facebook, a nursing Facebook group, LinkedIn, and in a direct DM to 10 people you already know who are healthcare workers. Not strangers — people who already know and trust you.\n\nHandling the discomfort: you will feel like a fraud selling something that does not exist yet. That discomfort is normal and it is a lie. You are not selling a finished product — you are inviting people into a creation process. That is honest. That is valuable.\n\nIf 0 people pre-buy: your messaging is wrong, not your idea. Try a different angle. Free workshop first, then pre-sell.\n\nIf 1-3 people pre-buy: you have signal. Run the program for those people brilliantly.\n\nIf 8 people pre-buy: you have a business. Go build the curriculum.\n\nYour next step in the next 24 hours: write the pre-sale message. Share it in one place. Count the responses.`,
    },
    blakely_3: {
        keyRecommendation: 'Simplify the pitch to: "A 6-week program that teaches burned-out nurses how to handle shift stress without quitting the career they worked so hard for."',
        adviceText: `I want you to do this exercise right now. Explain your program to a stranger — someone who knows nothing about coaching, wellness, or healthcare — in one sentence. If the sentence has the words "holistic," "evidence-based," "transformational," or "journey" in it, start over.\n\nHere is the test: after you say your one sentence, does the stranger say "I need that" or "I know someone who needs that"? If not, the sentence is not clear enough yet.\n\nYour current positioning: "A 6-week group coaching program that gives healthcare workers practical, evidence-based tools to manage stress, prevent burnout, and rebuild energy."\n\nThat is 27 words and three different promises. Too many.\n\nHere are three cleaner versions to test:\n\nVersion A: "A 6-week program that teaches burned-out nurses how to get through their shifts without losing themselves."\n\nVersion B: "I help nurses who dread going to work fall back in love with the career they trained years for."\n\nVersion C: "Stress management for nurses, by a healthcare insider who has actually worked your shifts."\n\nTest each one. Say it to a nurse. Watch their face. The version that makes them lean forward — that is your headline.\n\nOnce you have your headline, put it everywhere: your bio, your website, your DM opener, your social posts, your workshop invitation. One message, every channel, relentlessly.\n\nYour next step in the next 24 hours: write three versions of your one-sentence pitch, each under 15 words. Share them with three nurses and ask: "Which one makes you want to know more?"`,
    },
    godin_1: {
        keyRecommendation: 'Narrow your tribe to "mid-career nurses in hospital units who chose healthcare to help people but now dread their shifts" — and find them in three specific online communities.',
        adviceText: `"Healthcare professionals dealing with stress" is not a tribe. It is a census category. Let me help you find your actual tribe.\n\nYour tribe is defined by what they believe, not just who they are. Here is how to think about it:\n\nWho are they? Mid-career nurses (5-15 years in), working in acute care settings, earning $65k-$90k.\n\nWhat do they believe? That something is wrong with them for struggling. That the system is the problem but they cannot change the system. That they chose this career for the right reasons and grief that they no longer feel that way.\n\nWhat do they fear? Quitting and feeling like a failure. Staying and losing themselves completely. Having no other skills or options.\n\nWhat do they secretly want? To love their job again. To feel the way they felt in year one.\n\nWhen you speak to those beliefs, fears, and wants — not to "burnout" but to the specific internal experience of a mid-career nurse — you have found your tribe. And when you speak to them in their language, they feel it like you read their diary.\n\nWhere to find 1,000 of them:\n1. r/nursing on Reddit (680k members)\n2. "Nurse Support" Facebook groups (search specifically for ones focused on mental health and burnout)\n3. LinkedIn, searching for "charge nurse" and "nurse manager" in acute care settings\n4. State nursing association Facebook groups\n\nNavigate these spaces as a member, not a marketer. Listen for two weeks before you say anything. Then contribute, don't pitch. The people who resonate with what you share will find you.\n\nYour next step in the next 24 hours: join r/nursing. Read the 20 most recent posts with "burnout" or "stressed" in the title. Write down the exact words people use to describe their experience. Use those words — not yours — in your marketing.`,
    },
    godin_2: {
        keyRecommendation: 'Lead all positioning with the transformation story, not the program features — "from dreading your shifts to feeling in control" — and build all messaging around that narrative arc.',
        adviceText: `Your positioning statement is: "The only stress management program built by a healthcare insider, for healthcare workers — not another generic mindfulness app that doesn't understand 12-hour shifts."\n\nThat is a fine statement. But it is defined by what you are not (not a mindfulness app, not generic). I want you to be defined by what you are.\n\nHere is the positioning I would build:\n\n"Resilient Shift is for the nurse who still remembers why she chose this career — and wants to feel that way again."\n\nNotice what this does. It does not mention stress management or burnout. It leads with identity (she chose this career for a reason) and aspiration (she wants to feel that way again). It speaks to the emotional truth before the practical problem.\n\nThe practical problem — burnout, exhaustion, dreading shifts — is the symptom. The real problem is the disconnect between who she thought she would be and who she feels like now. Position for that.\n\nYour brand story, in three sentences:\n"I was a [role] for [years]. I loved it until I didn't. And then I found a different way to be in this work — one that lets me give everything on shift and still have something left when I get home. That is what I teach."\n\nEvery piece of content, every DM opener, every landing page should flow from this story. The people who resonate with it are your tribe. The people who don't are not your clients.\n\nYour next step in the next 24 hours: write your brand story in three sentences using the format above. Share it on LinkedIn with the caption: "This is why I built Resilient Shift." Watch who engages.`,
    },
    godin_3: {
        keyRecommendation: 'Launch a weekly email called "The Shift" with one story and one technique per issue, building an owned audience that grows independently of social media algorithms.',
        adviceText: `Social media followers are rented. An email list is owned. Every algorithm change, every platform shutdown, every viral post that fades — none of it affects your email list. That is where your business actually lives.\n\nHere is how to build yours from zero:\n\nThe newsletter: launch a weekly email called "The Shift." Every Tuesday. One story from the world of healthcare (anonymized). One technique for managing stress in real time. Under 400 words. Always ends with a question.\n\nThe lead magnet: create a one-page PDF called "The 3-Minute Shift Reset" — three techniques a nurse can use during an actual shift, not at home, not on a day off. Give this away for an email address.\n\nWhere to promote it:\n- Every social media bio: "Get the 3-Minute Shift Reset: [link]"\n- Every DM conversation: "I have a free resource that might help — want me to send it?"\n- Every workshop: ask attendees to subscribe before they leave\n- r/nursing and nursing Facebook groups: share the resource when someone posts about burnout (with permission)\n\nThe compounding effect: in month 1, you might have 50 subscribers. In month 6, 500. In month 12, if the content is genuinely useful, you could have 2,000 nurses who invited you into their inbox every week. That list is more valuable than 10,000 social media followers.\n\nThe conversion rate: from a warm email list, converting 3-5% to a paid program is achievable. At 2,000 subscribers, that is 60-100 potential clients per cohort launch.\n\nYour next step in the next 24 hours: set up a free ConvertKit or Beehiiv account. Write your first email. Create the lead magnet PDF. Add the link to your LinkedIn and Instagram bio.`,
    },
    jobs_1: {
        keyRecommendation: 'Design a remarkable onboarding sequence: a personalized welcome video, a physical postcard mailed to their home, and a 15-minute pre-program call in the first 48 hours after payment.',
        adviceText: `The moment after purchase is the most emotionally charged moment in the entire client relationship. The client has just overcome fear, trusted you with their money and their hope, and hit "pay." What do they get? A generic confirmation email. You have just wasted the most important moment you will ever have with this person.\n\nHere is what I would design instead.\n\nThe first 60 seconds: immediately after payment, redirect to a custom thank-you page with a 90-second personal video. Not a pre-recorded generic welcome. A direct address: "[Name], I saw your enrollment. I know what it took to hit that button. I want you to know — this was the right call. Here is what to expect in the next 72 hours." Record one of these for each new participant. It takes 3 minutes and changes everything.\n\nThe first 48 hours: a physical postcard arrives at their home, mailed the day they enroll. The front has one line: "Your best shift starts here." The back has a personal note from you. This costs $2 to mail and creates a moment they will photograph and share.\n\nBefore Session 1: a 15-minute "clarity call." You ask three questions: What is one thing you hope this changes? What is one thing you are afraid of? What will your life look like when this works? You take notes. You reference these answers throughout the program. Each client feels seen in a way that no group program has ever made them feel.\n\nThe result: before you have delivered a single piece of curriculum, your client has already told three colleagues about you.\n\nYour next step in the next 24 hours: write the script for your 90-second welcome video. Keep it under 150 words. Record it and show it to someone. Adjust until it makes them feel something.`,
    },
    jobs_2: {
        keyRecommendation: 'Remove the community forum, drop two of the six modules, and stop offering two 1:1 calls — replace the complexity with one extraordinary live weekly session and one perfect workbook.',
        adviceText: `You have built a buffet. I want a chef\'s tasting menu.\n\nYour current offer: 6 sessions, audio tracks, a workbook, community access, two 1:1 calls, and a 30-day check-in. That is six different things. Each one dilutes the others.\n\nHere is the subtraction exercise. For each deliverable, ask: if I removed this, would the core transformation still happen? If yes, remove it.\n\nThe community: does it drive the transformation, or does it create management overhead for you and a distraction for participants? Cut it. Replace with a group WhatsApp or Signal thread — simple, personal, no platform to manage.\n\nThe two 1:1 calls: replace with one 20-minute mid-program check-in, framed as a "progress review." One focused interaction is worth more than two scattered ones.\n\nThe audio tracks: keep these only if participants are actually using them. In your first cohort, survey participants at Week 3. If fewer than 70% are using them, cut them from the next cohort. Do not create content that completes the list but does not complete the transformation.\n\nThe surviving core: six live sessions (non-negotiable — this is where transformation happens), a single, excellent workbook (make it beautiful, make it essential), and the group thread.\n\nSimpler is not cheaper. Simpler is more powerful. When you strip the program to its essential form, the remaining elements have to be extraordinary. That constraint forces excellence.\n\nYour next step in the next 24 hours: list every deliverable in your offer. Next to each one, write: "Essential to transformation" or "Nice to have." Remove everything in the second column.`,
    },
    jobs_3: {
        keyRecommendation: 'Map every client touchpoint from first Instagram post to post-program check-in, then redesign each to feel like it comes from the same caring, expert person.',
        adviceText: `Design is not how it looks. Design is how it works. And right now, different parts of your business feel like they were made by different people.\n\nHere is the client journey audit I want you to run.\n\nList every touchpoint a client experiences with you, in order: social media post → DM conversation → workshop invitation → workshop experience → follow-up email → enrollment page → payment confirmation → welcome sequence → pre-program call → Session 1-6 → mid-program check-in → final session → post-program email → 30-day check-in.\n\nFor each touchpoint, ask: does this feel like it was made by the same person with the same values? Is the voice consistent? Is the visual language consistent? Is the emotional intention clear?\n\nThe gaps you will likely find: your social content is warm and personal. Your enrollment page is clinical and listy. Your workshop is excellent. Your confirmation email is generic. These inconsistencies create subconscious friction — the client senses that something is slightly off, even if they cannot name it.\n\nThe fix is not to make everything look the same. It is to establish your voice and values clearly, then apply them to every touchpoint. Your voice, from what I can read: direct, insider, empathetic, slightly irreverent about generic wellness advice. Apply that to every email, every slide, every social caption.\n\nThe detail nobody else will think about: the invoice. Most practitioners send a generic Stripe receipt. What if your invoice was designed with your branding, a personal note at the bottom, and the heading "Investment in your return to loving what you do"? That is a touchpoint. That is your brand.\n\nYour next step in the next 24 hours: read your last three emails to clients out loud. Do they sound like you? If not, rewrite them until they do.`,
    },
    forleo_1: {
        keyRecommendation: 'Commit to one content medium — LinkedIn written posts — for 90 days straight, publishing 3x per week with one personal story per week, and measure email subscribers as the primary metric.',
        adviceText: `You need a discovery engine. Right now, when a stranger encounters your business for the first time, it is usually by accident. That needs to change.\n\nHere is the 90-day discovery plan, built around your strongest medium.\n\nFirst, identify your medium. Are you naturally a writer, a speaker, or a visual creator? Do not try to be all three. Pick one and be exceptional at it for 90 days. Based on your background, I would bet on LinkedIn written posts — longer form, thoughtful, positioned for a professional healthcare audience.\n\nThe content formula: three posts per week. Post 1 (Monday): one real story from your experience with a healthcare client (anonymized, always). The story ends with an insight or a question. Post 2 (Wednesday): one practical technique, written as a short guide. No fluff. "Here are 3 things I teach nurses who are burning out." Post 3 (Friday): one honest opinion about the wellness industry, the healthcare system, or the common advice nurses receive that you disagree with. Opinions create engagement. Agreement creates followers.\n\nThe call to action: every post ends the same way. "If this resonates, subscribe to The Shift (link in bio) — I send a practical technique every Tuesday." Every post is growing your email list.\n\nThe 90-day goal: 500 LinkedIn followers who are healthcare professionals and 200 email subscribers. Those numbers sound small. They are not. 200 warm email subscribers who trust you convert to programs at 5-10x the rate of cold social followers.\n\nYour next step in the next 24 hours: write your first LinkedIn post using the story format. One personal experience. One honest insight. Under 300 words. Post it tonight.`,
    },
    forleo_2: {
        keyRecommendation: 'Lead every piece of content with your personal "I worked in healthcare and burned out" story — it is your most powerful differentiator and must be in every channel bio and first post.',
        adviceText: `You are hiding the most powerful thing about you.\n\nEvery generic wellness coach in the world has certifications. Every mindfulness program has research behind it. What none of them have is YOUR story — the specific experience of working in healthcare, feeling the weight of it, and finding a way through.\n\nThat story is not just marketing context. It is your product. It is why a burned-out nurse will trust YOU over a coach with better credentials and a nicer website.\n\nHere is how to activate it.\n\nThe story structure: (1) Who you were before — eager, committed, loving your work. (2) What happened — the shift. Not a dramatic breakdown. The quiet erosion. When did you first notice something was wrong? (3) What you tried — the things that did not work. This is crucial. If you skipped straight to "I discovered mindfulness and everything changed," you have lost your audience. Show the struggle. (4) What changed — the specific insight or technique that shifted things. Be precise. Not "I started taking care of myself." What did you actually do? (5) Who you are now — not a superhero. A person who has found a sustainable way to be in this work and is teaching others.\n\nWhere to use it: your LinkedIn "About" section, your website homepage, your workshop opening 3 minutes, your first DM to a potential client (shortened version).\n\nThe line that will make people stop scrolling: "I sat in my car for 20 minutes after every shift, unable to go inside. If you know that feeling, I built this for you."\n\nYour next step in the next 24 hours: write your full story using the 5-step structure above. Do not edit it. Just write it. Then sleep on it and read it again tomorrow.`,
    },
    forleo_3: {
        keyRecommendation: 'Add a "Bring a Colleague" bonus to the enrollment page: both participants receive a $150 credit toward the alumni membership when they enroll together.',
        adviceText: `Healthcare workers talk to each other in break rooms, in parking lots, in the endless group chats of their units. That word-of-mouth channel is more powerful than any ad you could run. Here is how to design it into your program.\n\nThe referral mechanism: call it the "Shift Buddy" program. When any enrolled participant refers a colleague who also enrolls, both receive a $150 credit toward the alumni membership (which you are launching after the program). This does three things: it incentivizes referrals, it introduces the alumni membership concept before launch, and it creates cohorts where participants already have a friend — which dramatically increases completion rates and satisfaction.\n\nThe language on your enrollment page: "Know a colleague who is going through the same thing? Bring them with you. You both get a $150 Shift Buddy credit when you enroll together. Because having someone to go through this with makes everything better."\n\nThe in-program referral moment: in Week 2, when participants are experiencing their first real results, prompt them explicitly: "This is the week when people start texting their colleagues about this program. If there is someone in your unit who needs this, now is the time to share." Do not leave referrals to chance. Prompt them at the exact moment of peak enthusiasm.\n\nThe post-program referral: in your final session, include a segment called "Who in your world needs this next?" Give participants a shareable one-page PDF they can send directly to a colleague. Make sharing as easy as possible.\n\nYour next step in the next 24 hours: add "Bring a Colleague" language to your enrollment page or pre-sale message. Even if the alumni membership does not exist yet, you can still offer a credit toward future programs.`,
    },
    davinci_1: {
        keyRecommendation: 'Identify and articulate the one counterintuitive insight about burnout you have observed that nobody else in the wellness industry is saying — that becomes your thought leadership pillar.',
        adviceText: `Every practitioner in your space is saying some version of the same three things: rest more, set better boundaries, practice mindfulness. You have spent years watching healthcare workers try these things and still burn out. What have you observed that contradicts the received wisdom?\n\nThat observation — that counterintuitive insight — is your innovation.\n\nHere are some prompts to find it:\n\nWhat do you believe about burnout that most wellness coaches get wrong? Not just a different technique, but a fundamentally different understanding of what burnout actually is.\n\nWhat have you seen healthcare workers do that actually works, that nobody in the wellness industry talks about?\n\nWhere does the conventional burnout advice actually make things worse? (For example: telling someone who is overwhelmed to "practice self-care" creates guilt when they cannot. Does any advice in your field create that kind of backfire?)\n\nWhat is the one thing your best clients understand about stress that your struggling clients do not?\n\nOnce you find your insight, it becomes your thought leadership pillar. You write about it, speak about it, name your methodology after it. It is what makes you uncopyable — because nobody else has your exact combination of clinical experience, practitioner training, and years of observation.\n\nExamples of what this might sound like: "Burnout is not caused by overwork. It is caused by the gap between who you thought you would be and who you actually are at work. Close that gap, and the workload becomes manageable." Or: "Most burnout interventions fail because they address the symptoms during time off, not the triggers during the shift. You cannot rest your way out of a broken stress response."\n\nYour next step in the next 24 hours: write your answer to this question: "What do I believe about burnout that is different from what most coaches teach?" Write for 10 minutes without stopping. That raw document is where your unique insight lives.`,
    },
    davinci_2: {
        keyRecommendation: 'Combine your stress management methodology with biometric awareness (wearable data like HRV from Apple Watch or Garmin) so participants can see their stress patterns shift measurably over the program.',
        adviceText: `You are building a therapeutic coaching program. What if you combined it with something nobody else in your space has thought to combine it with?\n\nThe cross-disciplinary integration I see for you: biometric data. Specifically, heart rate variability (HRV) — a measurable, real-time indicator of stress response that anyone with an Apple Watch, Garmin, or Fitbit can see.\n\nHere is what this looks like in practice:\n\nIn Week 1, every participant downloads a free HRV tracking app (HRV4Training or the built-in health app). They take a 1-minute morning measurement every day. They share their weekly average in the group.\n\nThrough the program, as they learn and apply the stress mastery techniques, their HRV trends upward — measurably, visually, objectively. They can see, in a number, that what they are learning is working. Their nervous system is changing.\n\nAt the end of Week 6, every participant has a graph. Before the program: HRV average of 22ms (low, indicating chronic stress). After: 38ms (improved, indicating better recovery). That graph is more powerful than any testimonial because it is not subjective — it is data.\n\nThis combination — therapeutic coaching + biometric tracking — does not exist in your market. It creates:
(1) Objective proof of transformation for marketing
(2) Differentiation that no competitor can quickly replicate
(3) A data narrative that appeals to the analytical, science-minded healthcare professional\n\nYou do not need to become a sleep scientist or a biometric expert. You need to say: "We use your own wearable data to track your stress recovery over the program." That sentence changes your positioning immediately.\n\nYour next step in the next 24 hours: download HRV4Training. Track your own HRV for one week. Learn what the number means. Then decide if you want to build this into your program.`,
    },
    davinci_3: {
        keyRecommendation: 'Position your offer as the first stress management program in healthcare that will integrate AI-personalized audio protocols — generating a waitlist of early adopters before the feature exists.',
        adviceText: `You are building this program in 2025-2026, during a period of extraordinary technological change. The practitioners who will lead the market in 2028 are the ones who are designing for where the world is going, not where it has been.\n\nHere is the future-forward element I would integrate.\n\nAI-personalized audio protocols. Right now, you are creating generic audio relaxation tracks for all participants. In 18 months, you could create a system where each participant's audio tracks are personalized to their specific stress triggers, shift patterns, and physiological responses. The shift worker who dreads handover gets a different protocol than the one who crashes after night shifts.\n\nThis is not science fiction — the tools to do this (ElevenLabs for voice generation, basic AI co-pilots for script variation, HRV data as input) exist today or will within months.\n\nHere is how to use this now, before the technology is fully ready:\n\nPosition your current audio tracks as "Phase 1" of a personalized protocol system. In your enrollment page: "We are developing AI-personalized audio protocols for the next cohort. Beta participants will be the first to receive their custom audio sequence as we build it."\n\nThis does three things: it creates a waitlist of early adopters who want something that does not fully exist yet, it positions you as an innovator rather than a me-too program, and it gives you a research mandate — you are building this with your participants.\n\nThe macro trend working for you: the mental health and wellness tech market is growing rapidly, and healthcare worker burnout is a documented crisis receiving government and institutional attention. A program at the intersection of practitioner-led coaching and emerging health technology is exactly where institutional funding, partnership, and media attention will flow.\n\nYour next step in the next 24 hours: write two sentences describing the AI personalization vision for your program. Add them to your enrollment page as a "Coming in Phase 2" teaser. See who gets excited.`,
    },
};
