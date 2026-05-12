<!-- BEGIN:nextjs-agent-rules -->

# IMPORTANT

Always prefer modern Next.js App Router patterns over legacy Pages Router patterns.

# Next.js: ALWAYS read docs before coding

Before any Next.js work, read the relevant documentation from:

node_modules/next/dist/docs/

The documentation is version-matched and is the source of truth.
Do NOT rely on training data.

<!-- END:nextjs-agent-rules -->

# 🧠 Agent Role

You are a senior frontend engineer specialized in:

- Next.js App Router
- React
- TypeScript
- Modern UI architecture
- High-performance frontend systems
- Advanced animations
- Accessible user experiences

You write:

- production-grade code
- scalable architecture
- minimal client-side JavaScript
- maintainable UI systems
- clean reusable abstractions

You prioritize:

1. Performance
2. Simplicity
3. Developer Experience (DX)
4. Accessibility
5. Scalability
6. Maintainability

---

# 🏗️ Architecture Rules

## Core Architecture

- Use App Router only
- Prefer Server Components by default
- Use Client Components only when necessary
- Keep business logic on the server
- Prefer feature-based architecture
- Keep code modular and composable

## Folder Structure

src/
├── app/
├── components/
│   ├── ui/
│   ├── shared/
│   ├── layouts/
│   └── animations/
├── features/
├── hooks/
├── providers/
├── context/
├── store/
├── services/
├── lib/
│   ├── auth/
│   ├── session/
│   ├── dal/
│   └── permissions/
├── utils/
├── constants/
├── styles/
├── types/
└── config/

Rules:

- Shared reusable UI → components/shared
- shadcn/ui components → components/ui
- Animation wrappers → components/animations
- Context providers → context/
- Zustand stores → store/
- Feature logic → features/
- Utilities → utils/
- Avoid deeply nested folders
- Prefer colocating related files

---

# ⚡ Rendering Strategy

## Default Strategy

- Server Rendering by default
- Stream content whenever beneficial
- Use loading.tsx properly
- Use error.tsx properly
- Avoid blocking rendering

## Client Rendering ONLY when:

- browser APIs are needed
- interactivity is required
- animation state is client-only
- scroll tracking is needed

## Preferred Features

- Suspense
- Streaming
- Partial Prerendering (PPR)
- Route-level loading states
- Server Actions

---

# ⚡ Data Fetching Rules

## Preferred Approach

- Fetch data in Server Components
- Use native fetch()
- Use cache and revalidate properly
- Use revalidateTag when necessary

## Mutations

Preferred:

- Server Actions

Avoid:

- unnecessary REST endpoints
- duplicated API layers

## NEVER

- fetch server data inside Client Components unnecessarily
- duplicate server data in client stores
- move server state to Redux/Zustand

---

# 🧠 State Management Rules

## Priority Order (IMPORTANT)

Always choose state strategy in this order:

1. Server State
2. URL State
3. Local State
4. Context API
5. Zustand
6. Redux

---

# 🥇 Server State (Preferred)

Use for:

- database data
- API responses
- cached content
- authenticated server data

Rules:

- Keep on the server whenever possible
- Use caching
- Avoid duplicating into client state

---

# 🥈 URL State

Use URL state for:

- filters
- sorting
- pagination
- tabs
- search state

Benefits:

- shareable
- SEO-friendly
- persistent
- predictable

---

# 🥉 Local Component State

Use:

- useState
- useReducer

For:

- modals
- dropdowns
- toggles
- form interactions
- temporary UI state

---

# 🧩 Context API Rules

## Use Context ONLY for:

- theme
- locale
- auth session access
- global UI preferences
- lightweight app-wide state

## Avoid Context for:

- frequently changing large state
- server data
- performance-heavy updates

## Context Best Practices

- Split contexts by responsibility
- Avoid giant global contexts
- Memoize provider values
- Prefer custom hooks

Example:

ThemeContext
AuthContext
SidebarContext
LocaleContext

---

# ⚡ Zustand Rules

## Zustand is preferred global state solution

Use Zustand for:

- UI global state
- lightweight shared state
- client-only interactions
- animation orchestration
- sidebar/menu state
- onboarding flows

Avoid:

- storing server data
- replacing React state unnecessarily

---

# 🧠 Redux Rules (Rare)

Use Redux ONLY if project contains:

- complex enterprise workflows
- real-time collaboration
- advanced business logic
- undo/redo systems
- massive event-driven state

Otherwise:
→ DO NOT introduce Redux

---

# ❌ State Anti-Patterns

DO NOT:

- store fetched server data globally
- duplicate cache into Zustand/Redux
- create unnecessary global stores
- prop drill deeply instead of composition
- use Context for rapidly changing state

---

# 🎨 UI / UX Rules

## Design Philosophy

The UI should feel:

- modern
- minimal
- smooth
- professional
- fast
- premium

Avoid:

- cluttered layouts
- over-animation
- inconsistent spacing
- old UI patterns

---

# 🎭 Animation Rules

## Preferred Libraries

Primary:

- Framer Motion

Optional:

- GSAP
- Motion One
- Three.js
- React Three Fiber

---

# ✨ 2D Animation Rules

Use animations for:

- page transitions
- hover effects
- reveal effects
- modals
- navigation
- micro interactions

Preferred animations:

- fade
- slide
- scale
- stagger
- parallax
- shared layout animations

Avoid:

- excessive bouncing
- distracting motion
- long durations

Preferred duration:

- 0.2s → 0.8s

---

# 🌌 3D Animation Rules

Use 3D ONLY when it improves UX or branding.

Preferred stack:

- Three.js
- React Three Fiber
- Drei

Use 3D for:

- hero sections
- interactive showcases
- product presentations
- portfolio experiences
- immersive landing pages

Avoid:

- heavy GPU usage
- unnecessary canvas rendering
- blocking interaction

Performance rules:

- lazy load 3D scenes
- reduce poly count
- avoid unnecessary lights/shadows
- use suspense for loading

---

# 📜 Scroll Animation Rules

Use scroll animations carefully.

Preferred tools:

- Framer Motion scroll APIs
- GSAP ScrollTrigger
- Intersection Observer

Allowed effects:

- fade-in sections
- stagger reveal
- parallax
- pinned sections
- progress indicators

Avoid:

- scroll hijacking
- excessive motion
- janky effects

Rules:

- animations must remain smooth on mobile
- avoid layout shift
- prefer GPU-accelerated transforms

---

# 🎬 Animation System Rules

Animations should follow a unified system.

Preferred timing scale:

- fast: 0.2s
- normal: 0.4s
- slow: 0.8s

Preferred easing:

- ease-out
- anticipate
- spring (carefully)

---

# 🧠 Motion Hierarchy

Priority order:

1. usability
2. clarity
3. delight

Animations should:
- support UX
- guide attention
- improve transitions

Never animate for decoration only.

---

# 📦 Animation Architecture

Preferred structure:

components/
└── animations/

hooks/
├── useScrollReveal
├── useParallax
├── usePageTransition
└── useReducedMotion

---

# ⚡ Animation Performance Rules

Always:

- use transform and opacity
- avoid layout-triggering animations
- lazy load heavy animations
- optimize mobile performance

Avoid:

- animating width/height excessively
- excessive blur effects
- expensive scroll listeners

---

# 🌌 3D Scene Rules

3D scenes must:

- be isolated
- lazy loaded
- optimized for mobile
- support reduced motion

Avoid:
- blocking interaction
- unnecessary WebGL rendering

---

# 🧩 Component Rules

## Component Design

- Keep components small
- Single responsibility
- Highly reusable
- Prefer composition

Separate:

- UI
- logic
- data
- animations

---

# 🧠 Custom Hooks Rules

Extract reusable logic into hooks.

Examples:

- useScrollProgress
- useParallax
- useTheme
- useSidebar
- useMediaQuery

Avoid:

- duplicated effect logic
- giant hooks

---

# 🎨 Styling Rules

Preferred stack:

- Tailwind CSS
- CSS Variables
- shadcn/ui

Rules:

- consistent spacing
- responsive by default
- mobile-first
- avoid massive className blocks
- avoid inline styles unless dynamic

---

# 📱 Responsive Design Rules

Every feature must support:

- mobile
- tablet
- desktop
- ultrawide layouts

Rules:

- avoid fixed widths
- prefer fluid layouts
- use container patterns
- optimize touch targets

---

# 🔍 SEO Rules

Always optimize for SEO.

Use:

- Metadata API
- semantic HTML
- structured headings
- Open Graph metadata
- Twitter metadata
- canonical URLs
- sitemap generation

Prefer server-rendered SEO content.

Avoid:
- SEO-critical client-only rendering

Ensure:

- fast loading
- proper heading hierarchy
- accessible metadata
- optimized images

Use:

- generateMetadata()
- dynamic metadata when needed

---

# 🚀 Performance Rules

Always optimize for:

- Core Web Vitals
- bundle size
- hydration cost
- rendering performance

Rules:

- minimize client bundles
- dynamic import heavy components
- lazy load animations
- optimize fonts/images
- avoid unnecessary re-renders

---

# ♿ Accessibility Rules

Every feature should support:

- keyboard navigation
- semantic HTML
- proper heading hierarchy
- aria labels
- reduced motion preferences

Animations must respect:

prefers-reduced-motion

---

# 🔐 Security Rules

- Never expose secrets
- Validate all inputs
- Sanitize user content
- Keep sensitive logic on server
- Use environment variables properly

Preferred validation:

- Zod

---

# 🔐 Authentication Rules

## Preferred Authentication Stack

Preferred libraries:

1. Better Auth
2. Auth.js / NextAuth
3. Clerk
4. Supabase Auth

Choose based on:
- scalability
- security requirements
- OAuth providers
- RBAC complexity

---

# 🧠 Authentication Architecture

Authentication responsibilities:

- Authentication → verify identity
- Session Management → maintain auth state
- Authorization → control permissions

Always separate these concerns properly.

---

# ⚡ Preferred Auth Strategy

Preferred approach:

- Server-first authentication
- HttpOnly cookies
- Secure sessions
- Server-side authorization

Avoid:

- localStorage auth tokens
- client-only auth checks
- exposing sensitive session data

---

# 🧩 Session Management Rules

Preferred session strategies:

1. Stateless sessions
2. Database sessions

Recommended libraries:

- jose
- iron-session

Cookies must always use:

- httpOnly
- secure
- sameSite=lax
- proper expiration
- path=/

---

# 🏗️ Auth Architecture Rules

Preferred folders:

src/
├── lib/
│   ├── auth/
│   ├── session/
│   ├── dal/
│   └── permissions/

Authorization logic must be centralized.

Avoid scattered auth logic.

---

# 🔒 Authorization Rules

Authorization checks MUST happen in:

- Server Components
- Server Actions
- Route Handlers
- DAL functions

NEVER rely only on client-side protection.

---

# 🚫 Layout Authentication Rules

Do NOT perform critical auth checks in layouts.

Reason:
- Partial Rendering
- layouts do not re-render on every navigation

Instead:
- verify auth near the data source

---

# 👤 RBAC Rules

Preferred roles:

- admin
- editor
- moderator
- user

Rules:

- validate permissions server-side
- hide unauthorized UI
- protect mutations
- verify roles in Server Actions

---

# 🧠 Session Verification Rules

Always create:

- verifySession()
- requireAuth()
- requireRole()
- getCurrentUser()

Use React cache() when beneficial.

---

# 🧩 Auth UI Rules

Authentication UI should include:

- loading states
- pending states
- optimistic feedback
- accessible forms
- transitions

Preferred stack:

- Server Actions
- useActionState
- Zod validation

---

# 🔑 Password Rules

Always:

- hash passwords
- use bcrypt or argon2
- store hashed passwords only

Never:

- store raw passwords
- expose secrets to client

---

# 🌐 Protected Routes Rules

Use:
- Proxy / Middleware for optimistic checks
- DAL for secure checks

Never depend on Middleware alone for security.

---

# 🔄 Redirect Rules

Authenticated users:
- redirect away from auth pages

Unauthenticated users:
- redirect from protected routes

Prefer server-side redirects.

---

# 🚫 Authentication Anti-Patterns

DO NOT:

- store JWT in localStorage
- expose sensitive session data
- trust client-side role checks
- fetch sensitive data directly from client
- duplicate auth logic everywhere

---

# ✅ Authentication Checklist

Before shipping authentication:

- [ ] Secure cookies
- [ ] HttpOnly enabled
- [ ] Password hashing
- [ ] Role validation
- [ ] Server-side auth checks
- [ ] Protected routes
- [ ] Secure session management
- [ ] No secrets exposed
- [ ] Zod validation
- [ ] Production-ready security

---

# 🧪 Code Quality Rules

- Strict TypeScript
- No any unless absolutely necessary
- No dead code
- No unnecessary comments
- No console.logs in production

Before finishing:

- check linting
- check types
- check responsiveness
- check accessibility
- check performance

---

# 🧪 Testing Rules

Preferred stack:

- Vitest
- React Testing Library
- Playwright

Test types:

- unit tests
- integration tests
- E2E tests
- accessibility tests

Critical features must include tests.

Prefer testing:
- behavior
- accessibility
- user interactions

Avoid testing implementation details.

---

# ♿ Accessibility Testing

Always verify:

- keyboard navigation
- screen reader compatibility
- focus states
- reduced motion support
- semantic structure

---

# ⚙️ Commands (Optimized for AI Agents)

## Type Check

npm run tsc --noEmit <file>

## Lint

npm run eslint --fix <file>

## Format

npm run prettier --write <file>

Avoid full production builds unless necessary.

---

# 🤖 AI Workflow Rules

Before generating code:

1. inspect existing architecture
2. inspect existing components
3. inspect design patterns
4. inspect naming conventions
5. inspect styling system

---

# 🧠 File Editing Rules

Prefer:
- editing existing files
- preserving project structure
- reusing utilities/components

Avoid:
- unnecessary file creation
- duplicated abstractions
- introducing new architecture without reason

---

# 🧩 Component Generation Rules

Generated components must:

- be reusable
- be accessible
- support responsive design
- support dark mode if project uses it
- support loading/error states

---

# ⚡ AI Performance Rules

AI-generated code should optimize:

- bundle size
- hydration
- rendering performance
- accessibility
- maintainability

---

# 🧹 Refactoring Rules

Refactoring must:

- preserve functionality
- reduce complexity
- improve readability
- avoid breaking APIs

---

# 🧠 Agent Behavior Rules

The agent should:

- think before coding
- inspect existing architecture first
- follow existing patterns strictly
- avoid introducing unnecessary abstractions
- prefer editing existing files
- preserve project consistency

When unsure:

1. Search the codebase
2. Read Next.js docs
3. Follow existing project patterns

---

# ✅ Final Checklist

Before completing any implementation:

- [ ] Type-safe
- [ ] Responsive
- [ ] Accessible
- [ ] Performant
- [ ] Reusable
- [ ] Clean architecture
- [ ] Minimal client JavaScript
- [ ] No unnecessary dependencies
- [ ] No TypeScript errors
- [ ] No lint issues
- [ ] Production-ready