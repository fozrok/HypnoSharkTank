2. Option A: The Guided Pathway
Design Philosophy: "One thing at a time, done beautifully."
A linear, step-by-step wizard experience inspired by the calm confidence of meditation apps (Calm, Headspace) crossed with the structured progress of Notion. Each feature occupies a full screen with a persistent progress rail on the left. The user never feels overwhelmed because they only see the current step and a gentle indicator of what comes next.

WHO THIS SERVES BEST
New practitioners, less tech-savvy users, and anyone who wants to be guided through the process without making decisions about navigation. The app "holds their hand" without being patronizing.


A.1 Visual Identity
Attribute
Specification
Aesthetic
Clean, warm, editorial. Feels like a high-end business journal.
Color Palette
Primary: Deep teal (#0D4F4F). Secondary: Warm cream (#FBF7F0). Accent: Coral (#E8734A). Success: Sage green (#7BAE7F). Warning: Soft amber (#D4A843).
Typography
Headlines: DM Serif Display (elegant, grounded). Body: Source Sans 3 (highly readable, professional). Mono: JetBrains Mono (for data/numbers).
Iconography
Line icons, 1.5px stroke weight, rounded corners. Feather or Lucide icon set. Minimal use.
Backgrounds
Warm cream base with subtle paper-grain texture. Feature sections use alternating cream/white panels.
Borders/Cards
Very subtle shadows (0 2px 8px rgba(0,0,0,0.04)). Cards use thin 1px borders in warm gray (#E8E4DE).
Motion
Slow, deliberate. Content fades in on a 400ms ease. Step transitions use a horizontal slide (300ms). No bounce or spring physics.
Dark Mode
Charcoal (#1E1E2E) base, cream text (#F0EDE6), teal accent preserved. Paper-grain overlay at 3% opacity.



A.2 Layout Structure

+----+---------------------------------------------------+
|    |                                                     |
| P  |              MAIN CONTENT AREA                     |
| R  |                                                     |
| O  |  +---------------------------------------------+   |
| G  |  |                                             |   |
| R  |  |         STEP TITLE + DESCRIPTION            |   |
| E  |  |                                             |   |
| S  |  +---------------------------------------------+   |
| S  |                                                     |
|    |  +---------------------------------------------+   |
| R  |  |                                             |   |
| A  |  |         INPUT FORM / OUTPUT CARDS            |   |
| I  |  |                                             |   |
| L  |  |   (scrollable content area)                 |   |
|    |  |                                             |   |
|    |  +---------------------------------------------+   |
|    |                                                     |
|    |            [ Back ]        [ Continue >> ]          |
|    |                                                     |
+----+---------------------------------------------------+


Progress Rail (Left Sidebar)
A narrow (240px) vertical rail showing all 7 features as labeled steps connected by a vertical line. Completed steps show a green checkmark. The current step is highlighted with the teal accent. Future steps are grayed but visible. Clicking a completed step jumps back to review (with a "stale" warning if inputs have changed).

+----------------------------------+
|  HYPNOSHARKTANK                  |
|  Progress                        |
|                                  |
|  [*] 1. Niche Finder       DONE  |
|   |                              |
|  [*] 2. Model Builder      DONE  |
|   |                              |
|  [>] 3. Market Validator  ACTIVE  |
|   |                              |
|  [ ] 4. Revenue Projector         |
|   |                              |
|  [ ] 5. Messaging Engine          |
|   |                              |
|  [ ] 6. Launch Sprint             |
|   |                              |
|  [ ] 7. Reality Check             |
|                                  |
|  ================================|
|  Plan: "Stress Coaching"          |
|  Started: Feb 20                  |
+----------------------------------+




A.3 Key Screen Wireframes
Screen: Niche Opportunity Results (Feature 1 Output)
+----+---------------------------------------------------+
| R  |                                                     |
| A  |  YOUR TOP 6 NICHE OPPORTUNITIES                    |
| I  |  Ranked by overall fit score                        |
| L  |                                                     |
|    |  +------------------+  +------------------+         |
|    |  | #1 RECOMMENDED   |  | #2               |         |
|    |  |                  |  |                  |         |
|    |  | Stress Mgmt for  |  | Sleep Coaching   |         |
|    |  | Healthcare       |  | for New Parents  |         |
|    |  | Workers          |  |                  |         |
|    |  |                  |  | Score: 82/100    |         |
|    |  | Score: 91/100    |  | Revenue: $4-8k/m |         |
|    |  | Revenue: $5-12k/m|  | Scalability: 7   |         |
|    |  | Scalability: 8   |  | Ease: 8          |         |
|    |  | Ease: 7          |  |                  |         |
|    |  |                  |  | [View Details]   |         |
|    |  | [SELECT THIS]    |  | [View Details]   |         |
|    |  +------------------+  +------------------+         |
|    |                                                     |
|    |  +------------------+  +------------------+         |
|    |  | #3               |  | #4               |         |
|    |  | Performance      |  | Grief Support    |         |
|    |  | Coaching for     |  | Memberships      |         |
|    |  | Entrepreneurs    |  |                  |         |
|    |  | Score: 78/100    |  | Score: 71/100    |         |
|    |  +------------------+  +------------------+         |
+----+---------------------------------------------------+



Screen: Market Validation Verdict (Feature 3 Output)
+----+---------------------------------------------------+
| R  |                                                     |
| A  |  MARKET VALIDATION VERDICT                          |
| I  |                                                     |
| L  |  +---------------------------------------------+   |
|    |  |     +============================+           |   |
|    |  |     |                            |           |   |
|    |  |     |      GREEN LIGHT           |           |   |
|    |  |     |      Proceed to build      |           |   |
|    |  |     |                            |           |   |
|    |  |     +============================+           |   |
|    |  |                                               |   |
|    |  |  "Strong demand signals from nursing          |   |
|    |  |   forums + LinkedIn. Competition exists but   |   |
|    |  |   lacks the practitioner credibility angle." |   |
|    |  |                                               |   |
|    |  +---------------------------------------------+   |
|    |                                                     |
|    |  +-- Market Size ----+  +-- Competitors ------+    |
|    |  | TAM: $2.1B        |  | Calm for Work (6/10)|    |
|    |  | SAM: $180M        |  | BetterUp (7/10)     |    |
|    |  | Revenue cap: $48k |  | Gap: personal touch |    |
|    |  +-------------------+  +---------------------+    |
|    |                                                     |
|    |         [ Build Revenue Model >> ]                  |
+----+---------------------------------------------------+


