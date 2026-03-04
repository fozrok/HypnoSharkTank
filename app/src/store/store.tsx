import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface UserProfile {
  experienceYears: string;
  skills: string[];
  passions: string;
  budget: string;
  hoursPerWeek: string;
  currentModel: string;
  enjoysMost: string;
}

export interface NicheOpportunity {
  id: number;
  name: string;
  painPoint: string;
  idealClient: string;
  deliveryModel: string;
  revenueRange: string;
  credibilityPlay: string;
  scalabilityScore: number;
  easeOfEntry: number;
  overallScore: number;
  gapAnalysis: string;
  summary: string;
}

export interface BusinessModel {
  offerName: string;
  offerDescription: string;
  deliverables: string[];
  transformationPromise: string;
  format: string;
  duration: string;
  pricingModel: string;
  pricePoint: string;
  paymentOptions: string[];
  scalabilityPhases: { phase: string; months: string; description: string }[];
  acquisitionChannels: { channel: string; cost: string; description: string }[];
  positioningStatement: string;
  contrarian: string;
  onePageSummary: string;
}

// ─── Feeding Frenzy Interfaces ────────────────────────────────────

export interface HelpOption {
  id: string;
  buttonLabel: string;
  description: string;
}

export type SharkVerdict = 'invest' | 'conditional_invest' | 'pass';
export type AdviceStatus = 'pending' | 'approved' | 'declined';

export interface SharkEvaluation {
  id: string;
  name: string;
  title: string;
  accentColor: string;
  emoji: string;
  score: number;
  verdict: SharkVerdict;
  observations: string[];
  criticalQuestion: string;
  condition?: string;
  conditionAccepted?: boolean;
  whatWouldChangeMind?: string;
  helpOptions: HelpOption[];
  selectedHelpId?: string;
  adviceText?: string;
  keyRecommendation?: string;
  adviceStatus: AdviceStatus;
}

export interface ApprovedSharkAdvice {
  shark: string;
  title: string;
  selectedHelp: string;
  keyRecommendation: string;
  adviceText: string;
}

export interface FeedingFrenzyResult {
  evaluations: SharkEvaluation[];
  approvedAdvice: ApprovedSharkAdvice[];
  status: 'in_progress' | 'completed';
}

// ─── Downstream Interfaces ────────────────────────────────────────

export interface RevenueProjection {
  assumptions: Record<string, string>;
  months: {
    month: number;
    newClients: number;
    totalClients: number;
    revenue: number;
    costs: number;
    netProfit: number;
  }[];
  milestones: { label: string; month: number }[];
  criticalVariable: string;
  mitigation: string;
}

export interface MessagingData {
  hooks: { type: string; hook: string; angle: string }[];
  outreach: { step: number; label: string; message: string }[];
  prospectSearches: string[];
  trustPhrases: { use: string[]; avoid: string[] };
  topObjection: string;
  objectionResponse: string;
}

export interface LaunchPlan {
  weeks: {
    week: number;
    theme: string;
    actions: { day: string; action: string; done: boolean }[];
    benchmark: string;
  }[];
  kpis: { metric: string; target: string; good: string }[];
  scorecard: string;
}

export interface RealityCheckData {
  failurePatterns: { pattern: string; applies: boolean; detail: string }[];
  missedOpportunities: { title: string; impact: string }[];
  contrarianPlay: string;
  stallRisk: string;
  stallPrevention: string;
  oneSentenceInsight: string;
}

// ─── App State ────────────────────────────────────────────────────

export interface AppState {
  theme: 'light' | 'dark';
  currentStep: number;
  completedSteps: number[];
  userProfile: UserProfile | null;
  selectedNiche: NicheOpportunity | null;
  nicheResults: NicheOpportunity[];
  businessModel: BusinessModel | null;
  feedingFrenzy: FeedingFrenzyResult | null;
  revenueProjection: RevenueProjection | null;
  messagingData: MessagingData | null;
  launchPlan: LaunchPlan | null;
  realityCheck: RealityCheckData | null;
  planName: string;
  planStartDate: string;
  // AI configuration
  openRouterKey: string | null;
  openRouterModel: string;
}

interface AppContextType extends AppState {
  toggleTheme: () => void;
  setCurrentStep: (step: number) => void;
  completeStep: (step: number) => void;
  setUserProfile: (profile: UserProfile) => void;
  setSelectedNiche: (niche: NicheOpportunity) => void;
  setNicheResults: (results: NicheOpportunity[]) => void;
  setBusinessModel: (model: BusinessModel) => void;
  // Feeding Frenzy setters
  setSharkEvaluations: (evaluations: SharkEvaluation[]) => void;
  setHelpSelection: (sharkId: string, helpOptionId: string) => void;
  setConditionAccepted: (sharkId: string, accepted: boolean) => void;
  setSharkAdvice: (sharkId: string, adviceText: string, keyRecommendation: string) => void;
  setAdviceStatus: (sharkId: string, status: AdviceStatus) => void;
  completeFeedingFrenzy: () => void;
  // Downstream
  setRevenueProjection: (projection: RevenueProjection) => void;
  setMessagingData: (data: MessagingData) => void;
  setLaunchPlan: (plan: LaunchPlan) => void;
  setRealityCheck: (check: RealityCheckData) => void;
  // AI config
  setOpenRouterKey: (key: string | null) => void;
  setOpenRouterModel: (model: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    theme: 'light',
    currentStep: 1,
    completedSteps: [],
    userProfile: null,
    selectedNiche: null,
    nicheResults: [],
    businessModel: null,
    feedingFrenzy: null,
    revenueProjection: null,
    messagingData: null,
    launchPlan: null,
    realityCheck: null,
    planName: '',
    planStartDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    openRouterKey: (() => { try { return localStorage.getItem('openrouter_api_key'); } catch { return null; } })(),
    openRouterModel: (() => { try { return localStorage.getItem('openrouter_model') || 'google/gemini-flash-1.5'; } catch { return 'google/gemini-flash-1.5'; } })(),
  });

  const toggleTheme = useCallback(() => {
    setState(prev => {
      const newTheme = prev.theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      return { ...prev, theme: newTheme };
    });
  }, []);

  const setCurrentStep = useCallback((step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
  }, []);

  const completeStep = useCallback((step: number) => {
    setState(prev => ({
      ...prev,
      completedSteps: prev.completedSteps.includes(step)
        ? prev.completedSteps
        : [...prev.completedSteps, step],
    }));
  }, []);

  const setUserProfile = useCallback((profile: UserProfile) => {
    setState(prev => ({ ...prev, userProfile: profile, planName: 'New Business Plan' }));
  }, []);

  const setSelectedNiche = useCallback((niche: NicheOpportunity) => {
    setState(prev => ({ ...prev, selectedNiche: niche, planName: niche.name }));
  }, []);

  const setNicheResults = useCallback((results: NicheOpportunity[]) => {
    setState(prev => ({ ...prev, nicheResults: results }));
  }, []);

  const setBusinessModel = useCallback((model: BusinessModel) => {
    setState(prev => ({ ...prev, businessModel: model }));
  }, []);

  // ─── Feeding Frenzy ───────────────────────────────────────────

  const setSharkEvaluations = useCallback((evaluations: SharkEvaluation[]) => {
    setState(prev => ({
      ...prev,
      feedingFrenzy: { evaluations, approvedAdvice: [], status: 'in_progress' },
    }));
  }, []);

  const setHelpSelection = useCallback((sharkId: string, helpOptionId: string) => {
    setState(prev => {
      if (!prev.feedingFrenzy) return prev;
      return {
        ...prev,
        feedingFrenzy: {
          ...prev.feedingFrenzy,
          evaluations: prev.feedingFrenzy.evaluations.map(e =>
            e.id === sharkId ? { ...e, selectedHelpId: helpOptionId } : e
          ),
        },
      };
    });
  }, []);

  const setConditionAccepted = useCallback((sharkId: string, accepted: boolean) => {
    setState(prev => {
      if (!prev.feedingFrenzy) return prev;
      return {
        ...prev,
        feedingFrenzy: {
          ...prev.feedingFrenzy,
          evaluations: prev.feedingFrenzy.evaluations.map(e =>
            e.id === sharkId ? { ...e, conditionAccepted: accepted } : e
          ),
        },
      };
    });
  }, []);

  const setSharkAdvice = useCallback((sharkId: string, adviceText: string, keyRecommendation: string) => {
    setState(prev => {
      if (!prev.feedingFrenzy) return prev;
      return {
        ...prev,
        feedingFrenzy: {
          ...prev.feedingFrenzy,
          evaluations: prev.feedingFrenzy.evaluations.map(e =>
            e.id === sharkId ? { ...e, adviceText, keyRecommendation } : e
          ),
        },
      };
    });
  }, []);

  const setAdviceStatus = useCallback((sharkId: string, status: AdviceStatus) => {
    setState(prev => {
      if (!prev.feedingFrenzy) return prev;
      return {
        ...prev,
        feedingFrenzy: {
          ...prev.feedingFrenzy,
          evaluations: prev.feedingFrenzy.evaluations.map(e =>
            e.id === sharkId ? { ...e, adviceStatus: status } : e
          ),
        },
      };
    });
  }, []);

  const completeFeedingFrenzy = useCallback(() => {
    setState(prev => {
      if (!prev.feedingFrenzy) return prev;
      const approvedAdvice: ApprovedSharkAdvice[] = prev.feedingFrenzy.evaluations
        .filter(e => e.adviceStatus === 'approved' && e.adviceText && e.keyRecommendation && e.selectedHelpId)
        .map(e => {
          const helpOption = e.helpOptions.find(h => h.id === e.selectedHelpId);
          return {
            shark: e.name,
            title: e.title,
            selectedHelp: helpOption?.buttonLabel ?? '',
            keyRecommendation: e.keyRecommendation!,
            adviceText: e.adviceText!,
          };
        });
      return {
        ...prev,
        feedingFrenzy: { ...prev.feedingFrenzy, approvedAdvice, status: 'completed' },
      };
    });
  }, []);

  // ─── Downstream ───────────────────────────────────────────────

  const setRevenueProjection = useCallback((projection: RevenueProjection) => {
    setState(prev => ({ ...prev, revenueProjection: projection }));
  }, []);

  const setMessagingData = useCallback((data: MessagingData) => {
    setState(prev => ({ ...prev, messagingData: data }));
  }, []);

  const setLaunchPlan = useCallback((plan: LaunchPlan) => {
    setState(prev => ({ ...prev, launchPlan: plan }));
  }, []);

  const setRealityCheck = useCallback((check: RealityCheckData) => {
    setState(prev => ({ ...prev, realityCheck: check }));
  }, []);

  const setOpenRouterKey = useCallback((key: string | null) => {
    try {
      if (key) localStorage.setItem('openrouter_api_key', key.trim());
      else localStorage.removeItem('openrouter_api_key');
    } catch { }
    setState(prev => ({ ...prev, openRouterKey: key }));
  }, []);

  const setOpenRouterModel = useCallback((model: string) => {
    try { localStorage.setItem('openrouter_model', model); } catch { }
    setState(prev => ({ ...prev, openRouterModel: model }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        toggleTheme,
        setCurrentStep,
        completeStep,
        setUserProfile,
        setSelectedNiche,
        setNicheResults,
        setBusinessModel,
        setSharkEvaluations,
        setHelpSelection,
        setConditionAccepted,
        setSharkAdvice,
        setAdviceStatus,
        completeFeedingFrenzy,
        setRevenueProjection,
        setMessagingData,
        setLaunchPlan,
        setRealityCheck,
        setOpenRouterKey,
        setOpenRouterModel,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
