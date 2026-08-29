# AI Finance Manager — Project Progress

## Project Goal

AI-powered personal finance management application that helps users track
income and expenses, manage budgets, understand spending patterns, and
eventually receive AI-powered financial insights and assistance.

---

# Architecture Decisions

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- bcrypt password hashing
- Service → Controller → Route architecture

## Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS v4
- Recharts (planned for charts)

## Authentication

- JWT is stored in an HTTP-only cookie.
- Frontend does NOT read the JWT directly.
- Axios uses `withCredentials: true`.
- Backend `authMiddleware.authUser` verifies the JWT.
- Protected frontend routes should verify authentication through the backend,
  not through `localStorage`.

---

# Backend Progress

## Authentication

- Register API ✅
- Login API ✅
- Logout API ✅
- JWT authentication ✅
- HTTP-only cookie authentication ✅
- Authentication middleware ✅

## Expense

- Expense model ✅
- Create expense ✅
- Get expenses ✅
- Get expense by ID ✅
- Update expense ✅
- Delete expense ✅
- Expense analytics/category data ✅

## Income

- Income model ✅
- Income CRUD ✅
- Monthly income analytics ✅

## Budget

- Budget model ✅
- Budget CRUD ✅
- Budget start/end date system ✅
- Overlapping budgets supported ✅
- Budget date-range analytics ✅
- Active budget retrieval ✅
- Budget analytics for active budgets ✅
- Budget indexes added ✅

## Dashboard / Financial Data

- Monthly income data ✅
- Monthly expense data ✅
- Savings calculation ✅
- Expense category analytics ✅
- Monthly financial trend ✅
- Active budget analytics ✅
- Financial context service for future AI integration ✅

---

# Frontend Progress

## Setup

- Vite + React created ✅
- ESLint configured ✅
- Tailwind CSS v4 configured ✅
- `@tailwindcss/vite` configured in `vite.config.js` ✅
- `@import "tailwindcss";` added to `src/index.css` ✅

## Authentication UI

- Register page created ✅
- Clean Premium Fintech visual direction chosen ✅
- Desktop split-screen authentication design ✅
- Mobile authentication design simplified to form-only ✅
- Responsive foundation added ✅
- Register form connected to React state ✅
- Register form validation for empty fields ✅
- Register API integration ✅
- Successful registration navigation implemented ✅

## Current Frontend Authentication Architecture

- JWT remains in HTTP-only cookie.
- Do NOT use `localStorage` for JWT.
- Axios instance uses `withCredentials: true`.
- Protected route still needs to be implemented correctly using a backend
  authentication check.

---

# Design Direction

## Overall Style

Clean Premium Fintech.

Design principles:

- Modern but not overly trendy
- Professional and suitable for a major portfolio project
- Clean typography
- Neutral backgrounds
- White surfaces/cards
- Restrained use of color
- Subtle borders and shadows
- Minimal animation
- Avoid excessive gradients, glassmorphism, and "neon AI" styling

## Design Process

Design decisions should be made interactively while building.

Do NOT finalize all colors, typography, spacing, or visual details upfront.

Process:

Build → View → Evaluate → Recommend options → Choose → Continue

---

# Frontend Page Plan

## Authentication

- Register
- Login

## Main Application

- Dashboard
- Expenses
- Income
- Budgets
- Reports
- Profile
- Settings
- AI Assistant (later)

## Dashboard

Default view should focus on the current month.

Planned dashboard sections:

- Income
- Expenses
- Savings
- Savings rate
- Income vs expense trend
- Active budgets
- Spending breakdown
- Recent transactions

A period selector may later allow:

- This month
- Last month
- Last 3 months
- Last 6 months
- This year
- Custom range

Dashboard should summarize the user's financial situation.
Reports should provide deeper analysis.

---

# Production Development Flow

1. Problem Statement ✅
2. Requirements Gathering ✅
3. Feature Planning ✅
4. Tech Stack Selection ✅
5. Database Design ✅
6. API Design ✅
7. Folder Structure ✅
8. UI/UX Design 🔄
9. Backend Development ✅
10. Frontend Development 🔄
11. AI Integration ⏳
12. Testing ⏳
13. Deployment ⏳
14. Documentation ⏳

---

# Current Task

## Frontend Authentication

Next:

1. Create proper protected route.
2. Because authentication uses an HTTP-only cookie, do NOT check
   `localStorage` for the JWT.
3. Protected route should verify authentication through the backend.
4. Complete Login UI.
5. Connect Login to backend.
6. Verify authenticated navigation.
7. Then start Dashboard UI.

---

# Important Development Rules

- Build step-by-step.
- Explain WHY each important decision is made.
- Don't dump the entire project structure or implementation at once.
- Prefer production-correct approaches over shortcuts.
- Test each feature before moving forward.
- Keep frontend design decisions interactive.
- When a major feature is completed, update this file.
- Avoid unnecessary complexity until it is actually needed.

# Nivora — Master UI/UX Design Direction

Nivora is an AI-powered personal finance manager. The product should feel **professional, trustworthy, modern, clean, and slightly futuristic**, combining a fintech aesthetic with a subtle AI personality.

## Core Design Philosophy

Use **one consistent visual identity across desktop and mobile**, but do NOT simply shrink the desktop layout for mobile.

Desktop and mobile can have different compositions and spacing while maintaining the same:

- Color system
- Typography
- Component language
- Border radius
- Button styles
- Visual hierarchy
- Finance + AI identity

The UI should feel like a **real production SaaS/fintech product**, not a generic template.

---

## Color System

### Primary Palette

- Background: `#F8FAFC`
- Surface/Card: `#FFFFFF`
- Primary Finance: `#10B981`
- Primary Hover: `#059669`
- AI Accent: `#8B5CF6`
- AI Deep Accent: `#6D28D9`
- Main Text: `#0F172A`
- Secondary Text: `#64748B`
- Border: `#E2E8F0`

### Color Meaning

**Emerald = Finance**

Use emerald for:

- Primary buttons
- Income
- Savings
- Positive financial progress
- Successful actions
- Budget progress
- Important finance-related highlights

**Violet = AI**

Use violet for:

- AI insights
- AI recommendations
- Smart analysis
- Predictions
- AI-generated suggestions
- AI-specific UI elements

Do NOT make the entire application purple.

The overall product should remain **light, clean, and professional**, with violet used strategically to establish the AI identity.

---

## Overall Brand Identity

Nivora should communicate:

> **Professional finance + intelligent AI**

The visual hierarchy should generally be:

**White / Slate → foundation**

**Emerald → finance/action**

**Violet → AI/intelligence**

Avoid excessive gradients, excessive glassmorphism, excessive shadows, or overly flashy effects.

The design should feel premium through **spacing, typography, hierarchy, and subtle animation**, rather than visual clutter.

---

# Authentication Pages

Login and Register should share the same design system.

## Desktop

Use a spacious two-column layout.

### Left Section

The left side should communicate the product value.

Include:

- Nivora logo
- Short eyebrow/label
- Large headline
- Supporting description
- Optional subtle financial visual such as an animated bar chart

The left side should feel spacious and editorial rather than like a dashboard.

Example Login messaging:

> Your financial workspace

> Welcome back.
> Your money is waiting.

Example Register messaging:

> Your financial workspace

> Start your journey.
> Build better money habits.

The exact wording can change, but Login and Register should have **different messaging while maintaining the same visual structure**.

### Right Section

Use a clean white authentication card.

Characteristics:

- White background
- Rounded corners
- Subtle border
- Soft shadow
- Generous padding
- Rounded inputs
- Emerald primary button

The card should feel like a premium SaaS authentication experience.

---

# Mobile Authentication

Mobile should be designed specifically for mobile rather than being a compressed desktop layout.

A **dark violet mobile authentication shell** can be used while preserving the same Nivora brand identity.

Recommended mobile direction:

- Dark navy/purple background
- Subtle violet radial glow
- Rounded phone-like container
- Light/purple typography
- Dark input fields
- Violet/soft-purple CTA
- Minimal decorative elements
- Large readable headings
- Comfortable touch targets

Example visual colors:

- Shell: `#110D25`
- Inner surface: `#18142D`
- Border: `#554B7C`
- Primary light violet: `#D4C2F3`
- Secondary violet: `#B59AE6`

The mobile design should feel **AI-oriented and premium**, while desktop remains cleaner and more fintech-oriented.

However, both should clearly feel like the same Nivora product.

---

# Login Page

Login should include:

- Email
- Password
- Show/hide password
- Forgot password
- Login button
- Link to Register
- Error/success states

The authentication flow should remain separate from visual design work.

Do not introduce UI controls that do not have actual functionality.

For example, do not add a "Remember me" checkbox unless the authentication system actually supports its behavior.

Social login buttons such as Google/Apple should only be presented as functional once OAuth is implemented.

---

# Register Page

Register should visually match Login.

Include:

- Name
- Email
- Password
- Create account button
- Registration success/error state
- Link to Login

Use different messaging from Login so the pages feel like two purposeful screens rather than duplicates.

Example:

> Create your Nivora account

> Set up your financial workspace and start managing your money.

---

# Dashboard Direction

The dashboard should follow the same foundation:

- Light slate background
- White cards
- Emerald finance indicators
- Violet AI insight components
- Rounded but not excessively rounded cards
- Clear spacing
- Strong typography hierarchy

Potential dashboard structure:

- Overview
- Balance
- Income
- Expenses
- Budget usage
- Recent transactions
- AI financial insight

AI insight components should be visually distinguishable through **violet accents**, not by making the entire dashboard purple.

---

# AI Feature Direction

AI should feel like a distinct layer inside the finance application.

Use violet for:

- AI Insight cards
- AI recommendations
- Smart spending analysis
- Budget suggestions
- Financial predictions
- AI assistant interactions

Example:

**Finance data → Emerald**

**AI interpretation → Violet**

This distinction should become a recognizable part of Nivora's UX.

---

# Component Style

Prefer:

- `rounded-xl` to `rounded-3xl` depending on component importance
- Soft borders
- Subtle shadows
- Clean white surfaces
- Comfortable padding
- Clear typography
- Smooth hover/focus states
- Minimal animations

Avoid:

- Excessive neon
- Excessive gradients
- Heavy glassmorphism
- Too many colors
- Overly decorative backgrounds
- Generic dashboard templates
- Excessive rounded elements everywhere

---

# Animation Philosophy

Animations should be **subtle and purposeful**.

Good examples:

- Button hover movement
- Progress bars drawing in
- Financial chart bars appearing sequentially
- AI insight appearing smoothly
- Card hover elevation
- Small transitions between states

Avoid:

- Constant bouncing
- Excessive floating elements
- Distracting page animations
- Animations that slow down usability

The goal is:

> **Premium, not flashy.**

---

# Responsive Design Rule

Do NOT assume:

> Desktop design → simply scale down for mobile.

Instead:

> **Same brand system → different responsive composition.**

Desktop can prioritize:

- Spacious layouts
- Two-column structures
- Larger visual storytelling

Mobile can prioritize:

- One focused screen
- Strong hierarchy
- Touch-friendly controls
- Compact content
- Purpose-built mobile composition

---

# Important Development Rule

When implementing Nivora UI:

1. Preserve existing functionality.
2. Do not rewrite working backend/API logic unnecessarily.
3. Separate functionality changes from design changes.
4. First make the page functional.
5. Then implement the agreed design.
6. Then polish responsiveness.
7. Finally add animations and production-level details.

Design decisions should be discussed interactively when reaching each relevant page/component. Do not redesign the entire application blindly in advance.

---

## Nivora Visual Identity in One Line

**Nivora = Clean fintech foundation + Emerald finance identity + Violet AI intelligence + Premium responsive UX.**
