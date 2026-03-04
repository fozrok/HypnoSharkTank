1. UX Foundations
Before exploring visual directions, these UX principles and information architecture apply to all three design options. They define how the app works regardless of how it looks.

1.1 Design Principles
Progressive disclosure: Show only what the user needs at each step. The 7-feature chain is complex, but each screen should feel simple.
Context persistence: Users should always see where they are in the chain, what they have completed, and what comes next.
Edit without fear: Every output should be editable. Changes propagate downstream with clear "stale" indicators, not silent overwrites.
Celebrate progress: Micro-celebrations at each completed step. The practitioner is building something real; the app should make that feel rewarding.
Trust the user: No unnecessary tutorials or tooltips. Contextual help only when needed. Respect the intelligence of working professionals.

1.2 Information Architecture
The app is organized around 4 top-level areas:

+------------------------------------------------------------------+
|                     HYPNOSHARKTANK APP                           |
+------------------------------------------------------------------+
|                                                                  |
|  [1] DASHBOARD          - Active plans, recent activity,         |
|                           quick-resume                           |
|                                                                  |
|  [2] INNOVATION LAB     - The 7-feature prompt chain             |
|      |                    (core product experience)              |
|      +-- Niche Finder                                            |
|      +-- Model Builder                                           |
|      +-- Market Validator                                        |
|      +-- Revenue Projector                                       |
|      +-- Messaging Engine                                        |
|      +-- Launch Sprint                                           |
|      +-- Reality Check                                           |
|                                                                  |
|  [3] MY PLANS           - Saved plans, comparisons,              |
|                           exports, version history               |
|                                                                  |
|  [4] SETTINGS           - Profile, subscription,                 |
|                           preferences                            |
+------------------------------------------------------------------+


1.3 Core User Flow
Every user follows this fundamental flow, regardless of which design option is used:

  ONBOARD         DISCOVER           BUILD              VALIDATE
  +------+       +----------+       +-----------+       +----------+
  | Fill |       | Generate |       | Design    |       | Stress   |
  | out  | ----> | niche    | ----> | business  | ----> | test     |
  | profile      | options  |       | model     |       | market   |
  +------+       +----------+       +-----------+       +----------+
                      |                   ^                   |
                      |                   |  (if pivot)       |
                      |                   +-------------------+
                      |                                       |
                      |  (if kill)                            |
                      +<--------------------------------------+
                                                              |
   PLAN              MESSAGE            LAUNCH          AUDIT |
  +----------+       +----------+       +----------+    +-----v----+
  | Project  |       | Create   |       | 30-day   |    | Brutal   |
  | revenue  | <---- | go-to-   | <---- | sprint   | <- | reality  |
  | model    |       | market   |       | plan     |    | check    |
  +----------+       +----------+       +----------+    +----------+


1.4 Key Screen Types
Across all design options, these 5 screen types recur:

Screen Type
Purpose
Intake Form
Collects structured user input (profile, assumptions, constraints). Used by Features 1 and 4.
Generation View
Displays AI-generated output as ranked cards, sections, or reports. Used by all 7 features.
Edit/Refine View
Allows inline editing of generated outputs with section-level regeneration. Used by Features 2, 5.
Verdict/Decision
Presents a binary or ternary decision (go/pivot/kill) with clear visual hierarchy. Used by Feature 3.
Action Plan
Displays time-sequenced tasks with checkboxes, KPIs, and daily schedules. Used by Feature 6.


1.5 Responsive Strategy
HypnoSharkTank targets practitioners who work on laptops, tablets, and phones. Design for desktop-first (where most business planning occurs), then adapt for tablet and mobile. On mobile, the sidebar navigation collapses into a bottom tab bar, and card layouts shift to full-width single column.
