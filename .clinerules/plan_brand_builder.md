# Pre.dev Master Plan for Brand Builder

This document outlines the detailed development roadmap, technical specifications, and implementation patterns for the Brand Builder project, focusing on a pure React frontend and Node.js/Express backend, adhering strictly to the specified tech stack and MVP priorities.

## 1. Project Overview & MVP Scope

**Project Goal:** To democratize brand development for solo founders, entrepreneurs, and small startup teams through an AI-powered web application that guides them through a cohesive brand creation process.

**MVP Priority:** Nailing the end-to-end guided workflow through all five phases with smooth AI integration and a seamless onboarding/project setup. This ensures users experience clear value quickly and can complete brand kits without friction.

**Core User Flow:**
`Landing Page -> Authentication (Login/Signup) -> User Dashboard -> Project Creation -> Phase 1: Audience Research -> Phase 2: Strategy Formulation -> Phase 3: Identity Design -> Phase 4: Positioning -> Phase 5: Visual Asset Generation -> Export Brand Kit -> Logout`

**Tech Stack:**
-   **Frontend:** Pure React (no Next.js), Vite (for rapid development), Redux Toolkit (global state), React Query (API data fetching/caching), React Hook Form (form inputs), Framer Motion (animations), shadcn/ui (UI components), Tailwind CSS (styling).
-   **Backend:** Node.js, Express, PostgreSQL (via TypeORM), Joi (validation), Winston (logging), JWT + bcrypt (authentication), express-validator (input sanitization), OpenAI GPT-4, DALL·E, Stable Diffusion (AI models), BullMQ + Redis (job queue/caching), Pinecone (vector store), AWS S3 + CloudFront (asset storage/CDN), Sharp (image processing), SendGrid (email verification).
-   **Tooling:** Yarn Workspaces (monorepo), ESLint, Prettier, Husky, CI GitHub Actions, Sentry (error tracking), Datadog (metrics), Terraform (IaC).

## 2. Detailed Development Roadmap (10-Week Plan)

### Week 1-2: Environment & Core Setup

**Milestone:** Project scaffolding, authentication module, basic CRUD endpoints.

**Atomic Tasks:**
-   **Environment Setup:**
    -   Initialize Yarn workspaces (`api/`, `ui/`).
    -   Configure ESLint, Prettier for both packages.
    -   Set up Husky hooks for pre-commit linting/formatting.
    -   Create `.env.example` files for all environment variables (e.g., `PORT`, `DATABASE_URL`, `JWT_SECRET`, `OPENAI_API_KEY`).
-   **Backend Core:**
    -   Set up Node.js/Express server in `api/`.
    -   Configure PostgreSQL connection with TypeORM.
    -   Implement central error middleware and Winston logging.
    -   Define base API routes (`/v1/users`, `/v1/projects`).
    -   Implement `User` entity model and repository (TypeORM).
    -   Develop `AuthService` and `AuthController`.
    -   Implement JWT generation, refresh token flow, and HttpOnly cookie management.
    -   Integrate bcrypt for password hashing.
    -   Set up basic user signup and login endpoints.
-   **Frontend Core:**
    -   Initialize pure React project with Vite in `ui/`.
    -   Configure Tailwind CSS.
    -   Set up Redux Toolkit store for user/session data.
    -   Implement basic `AuthContext` and `useAuth` hook.
    -   Create Login and Signup pages/components.
    -   Integrate `apiClient.js` for backend communication.
    -   Implement `PhaseStepper` component shell (static, 5 phases).

**Dependencies:** Backend setup before frontend API integration.

### Week 3-4: Onboarding, Project Creation & Phase 1 (Audience Research) & Phase 2 (Strategy Formulation)

**Milestone:** Audience Research and Strategy modules with AI integration stubs and UI wizard phases 1-2.

**Atomic Tasks:**
-   **Onboarding & Project Creation:**
    -   **Frontend:**
        -   Develop `ProjectCreation` component: input for project name, industry/brand type selection (dropdown/radio buttons).
        -   Implement `DashboardPage` to display user's projects.
        -   Integrate `PhaseStepper` with dynamic progress tracking (horizontal stepper, labels, checkmarks).
        -   Develop initial tutorial/intro modal/slides highlighting 5 phases and AI assistance.
        -   Implement UI for easy access to saved work (project list on dashboard).
        -   Integrate contextual AI tips as tooltips or side panels during onboarding and phase transitions.
    -   **Backend:**
        -   Define `Project` entity model (name, industry, user_id, current_phase).
        -   Implement `ProjectService` and `ProjectController` with CRUD operations.
        -   API endpoints for project creation, retrieval, and updates (`/v1/projects`).
        -   Implement basic authorization middleware for project ownership.
-   **Phase 1: Audience Research:**
    -   **Frontend:**
        -   Scaffold `<AudienceResearch>` component.
        -   Implement form inputs using React Hook Form for guided research workflow (demographics, known traits, external resource links).
        -   Display AI-generated persona cards (static mockups initially).
        -   UI for inputting market trends, cultural insights, competitor names/websites.
        -   UI for primary research capture (interview notes, survey summaries).
    -   **Backend:**
        -   Define `AudienceResearch` entity model (JSONB for questionnaire data, persona data, insights).
        -   API endpoints for `AudienceResearch` data persistence and retrieval (`/v1/phases/audience-research`).
        -   **AI Integration Stub:** Create `AudienceAIService` (placeholder for OpenAI calls).
        -   Implement initial prompt templates for persona generation (Handlebars).
-   **Phase 2: Strategy Formulation:**
    -   **Frontend:**
        -   Scaffold `<StrategyBuilder>` component.
        -   Implement form inputs for Brand Purpose, Mission, Vision, Core Values, Goals, SWOT, Personality (React Hook Form).
        -   Display AI-generated drafts for statements (static mockups initially).
        -   UI for value selection (checkboxes, custom input).
        -   UI for personality sliders/quiz.
    -   **Backend:**
        -   Define `BrandStrategy` entity model (JSONB for purpose, mission, vision, values, goals, SWOT, personality).
        -   API endpoints for `BrandStrategy` data persistence and retrieval (`/v1/phases/strategy-formulation`).
        -   **AI Integration Stub:** Create `StrategyAIService` (placeholder for OpenAI calls).
        -   Implement initial prompt templates for mission/vision/value statements.

**Dependencies:** Onboarding/Project creation before phase access. Phase 1 data feeds into Phase 2 AI prompts.

### Week 5-6: Phase 3 (Identity Design) & Phase 4 (Positioning)

**Milestone:** Identity Design and Positioning modules; backend DALL·E wrapper; UI phases 3-4.

**Atomic Tasks:**
-   **Phase 3: Identity Design (Naming, Voice, Story, Tagline):**
    -   **Frontend:**
        -   Scaffold `<IdentityDesigner>` component.
        -   UI for AI-powered name generator (keywords, style filters, shortlist).
        -   Integrate one-click links to external name/domain checkers (e.g., Namechk).
        -   UI for tone/personality selector (adjectives, archetypes, voice sliders).
        -   Display AI-generated voice profiles and guidelines.
        -   UI for guided story framework (StoryBrand elements).
        -   Display AI-assisted story drafts.
        -   UI for optional tagline generator (style options, evaluation feedback).
    -   **Backend:**
        -   Define `BrandIdentity` entity model (JSONB for name, voice, story, tagline).
        -   API endpoints for `BrandIdentity` data persistence and retrieval (`/v1/phases/identity-design`).
        -   **AI Integration:** Implement `IdentityAIService` (OpenAI GPT-4 for naming, voice, story, tagline).
        -   Develop prompt templates for each identity element.
-   **Phase 4: Brand Positioning:**
    -   **Frontend:**
        -   Scaffold `<PositioningAssistant>` component.
        -   UI for AI-driven USP identification (inputs for unique offerings, problem solving).
        -   UI for positioning statement builder (template fields, AI suggestions).
        -   UI for value proposition refinement (customer benefit focus).
        -   UI for reasons-to-believe/proof point uploads (fields for awards, testimonials, stats, credentials; file upload for evidence).
        -   Implement interactive Perceptual Map visualization (2x2 chart, draggable points).
        -   UI for AI-powered review and refinement (feedback loop).
    -   **Backend:**
        -   Define `BrandPositioning` entity model (JSONB for USP, statement, value prop, proof points).
        -   API endpoints for `BrandPositioning` data persistence and retrieval (`/v1/phases/positioning`).
        -   **AI Integration:** Implement `PositioningAIService` (OpenAI GPT-4 for USP, statement, refinement).
        -   Develop prompt templates for positioning elements.
        -   Implement DALL·E wrapper for image generation (if used for perceptual map elements).

**Dependencies:** Phase 1 & 2 data feeds into Phase 3 & 4 AI prompts. Backend AI wrappers needed before frontend integration.

### Week 7-8: Phase 5 (Visual Asset Generation) & Data Enhancements

**Milestone:** Visual Asset Generation module; S3 integration; vector store setup; UI phase 5.

**Atomic Tasks:**
-   **Phase 5: Visual Asset Generation:**
    -   **Frontend:**
        -   Scaffold `<AssetGenerator>` component.
        -   UI for Logo Generation Wizard (style selection, inputs, AI concepts, customization tools).
        -   Implement dynamic previews/mockups for logos (business card, website header, etc.).
        -   UI for AI-powered Color Palette Generator (keywords, inspiration, color details/codes).
        -   UI for Typography Selector & Font Pairing Tool (AI recommendations, tone-based filtering, live previews).
        -   UI for Imagery & Iconography Style Selector (mood board inspiration, style filters, do's/don'ts examples).
        -   UI for Graphic Motifs, Shapes, and Layout Elements Picker (motif library, consistency in visual language).
    -   **Backend:**
        -   Define `VisualIdentity` entity model (JSONB for logo, colors, typography, imagery, graphics).
        -   API endpoints for `VisualIdentity` data persistence and retrieval (`/v1/phases/visual-assets`).
        -   **AI Integration:** Implement `VisualAIService` (DALL·E/Stable Diffusion for logo/imagery, GPT-4 for color/font rationale).
        -   Develop prompt templates for visual elements.
        -   Integrate Sharp for server-side image processing (e.g., stitching images/text overlays for mockups).
-   **Data & Storage Enhancements:**
    -   Configure Redis for session caching and AI prompt throttling.
    -   Set up Pinecone index for vector store (sharded by project).
    -   Provision AWS S3 buckets and CloudFront distributions.
    -   Implement signed URL services for secure uploads/downloads to S3.
    -   Integrate BullMQ + Redis for asynchronous AI/inference tasks.
    -   Implement WebSocket for real-time status updates of long-running AI jobs.

**Dependencies:** All prior phase data for AI personalization. AWS S3/CloudFront/Pinecone setup for asset storage and advanced AI features.

### Week 9: Export & Packaging, Testing, Bug Fixes

**Milestone:** Exportable brand kit; end-to-end workflow testing; bug fixes.

**Atomic Tasks:**
-   **Export & Packaging:**
    -   **Backend:**
        -   Implement backend job to bundle finalized brand kits (PNG, SVG, PDF) into downloadable ZIPs.
        -   Develop `ExportService` to generate comprehensive Brand Identity Brief (PDF/Word) from all phase data.
    -   **Frontend:**
        -   Implement client-side download trigger for brand kits and style guides.
        -   UI for Brand Style Guide preview and export options.
-   **Testing:**
    -   Conduct comprehensive end-to-end testing of the entire guided workflow.
    -   Perform integration tests across frontend-backend API calls.
    -   Execute unit tests for all critical functions and components.
    -   Run security tests (authentication, authorization, input sanitization, rate limiting).
    -   Perform performance benchmarks (API latency, frontend load times).
-   **Bug Fixing:** Address all identified bugs and issues from testing.

**Dependencies:** All phases complete for export. Testing requires functional features.

### Week 10: Production Deployment & Launch

**Milestone:** Deployment pipeline (CI/CD), production hardening, documentation, MVP launch.

**Atomic Tasks:**
-   **CI/CD & Deployment:**
    -   Configure CI/CD pipelines in GitHub Actions for build and deployment.
    -   Define build pipeline stages (lint, test, build, deploy).
    -   Set up Docker containers for frontend and backend applications.
    -   Configure AWS ECS for container deployment, auto-scaling, and health checks.
    -   Implement infrastructure as code (Terraform) for AWS resources.
    -   Define deployment verification tests.
    -   Establish rollback procedures and criteria.
-   **Observability & Performance:**
    -   Integrate Sentry for production error tracking.
    -   Integrate Datadog for infrastructure metrics and application monitoring.
    -   Set up monitoring thresholds for alerting.
-   **Documentation:**
    -   Finalize project READMEs and API documentation.
    -   Create user-facing documentation/FAQs for the app.
-   **Launch:**
    -   Perform final pre-launch checks.
    -   Deploy to production environment.
    -   Announce MVP launch.
-   **Post-Launch Monitoring:**
    -   Set up user feedback surveys.
    -   Configure usage metrics tracking (completion rates, time spent, asset downloads).
    -   Monitor API latency, AI call success rates, S3 utilization.

**Dependencies:** All development and testing complete.

## 3. Technical Implementation Specifications

### 3.1. Component Interfaces, Props, and State

-   **`<PhaseStepper>`:**
    -   **Props:** `currentPhase: number`, `phases: Array<{id: number, label: string, completed: boolean}>`
    -   **State:** None (receives props from parent).
-   **`<AudienceResearch>` / `<StrategyBuilder>` / etc. (Phase Components):**
    -   **Props:** `projectId: string`, `initialData: object` (data for current phase), `onSave: (data: object) => void`, `onNext: () => void`
    -   **State:** Form data (managed by React Hook Form), loading states for AI calls.
-   **`<LivePreview>`:**
    -   **Props:** `content: string` (HTML/CSS for preview), `brandColors: object`, `brandFonts: object`
    -   **State:** None.
-   **Shared UI Components (shadcn/ui):** Utilize their defined props and state management. Custom wrappers for accessibility and consistent styling.

### 3.2. Inter-Component Communication Patterns

-   **Props Drilling:** For simple parent-child communication.
-   **React Context:** For global state like authentication status, user details, or theme settings.
-   **Redux Toolkit:** For complex global state (user/session data, project list, current project phase data).
-   **React Query:** For fetching, caching, and updating API data, managing server state.
-   **Event Handlers:** For triggering actions in parent components from children.

### 3.3. API Contract (Frontend-Backend)

-   **RESTful API:** Versioned routes (`/v1/users`, `/v1/projects`, `/v1/phases/:phaseName`, `/v1/assets`).
-   **JSON Payloads:** All requests/responses use JSON.
-   **Authentication:** JWT in `Authorization` header for protected routes.
-   **Standard Responses:**
    -   Success: `200 OK`, `201 Created`, `204 No Content` with relevant JSON data.
    -   Errors: Standardized JSON error format (`{ "message": "Error description", "code": "ERROR_CODE" }`) with appropriate HTTP status codes (`400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `500 Internal Server Error`).
-   **WebSockets:** For real-time updates on AI job progress (e.g., `/ws/project/:projectId/ai-status`).

### 3.4. Design Patterns

-   **Frontend:**
    -   **Container/Presentational Components:** Separate logic from UI rendering for better reusability and testability.
    -   **Custom Hooks:** Encapsulate reusable stateful logic.
    -   **Redux Slices:** Organize Redux state, reducers, and actions by feature.
-   **Backend:**
    -   **Controller-Service-Repository:** Clear separation of concerns for HTTP handling, business logic, and data access.
    -   **Dependency Injection:** For services and repositories to improve testability and modularity.
    -   **Strategy Pattern:** For different AI models or prompt variations.

### 3.5. Algorithmic Approaches (Complex Operations)

-   **AI Prompt Generation:** Handlebars templating engine to dynamically inject user inputs into GPT-4 prompts.
-   **Image Processing (Sharp):** Algorithms for resizing, cropping, watermarking, and compositing images (e.g., for mockups or final asset bundling).
-   **Vector Search (Pinecone):** K-nearest neighbors (KNN) or approximate nearest neighbors (ANN) for retrieving relevant embeddings based on user input for AI context.
-   **Perceptual Map Visualization:** D3.js or similar library for plotting points and handling user interaction on a 2D canvas.
-   **Brand Kit Bundling:** Archiving library (e.g., `archiver` in Node.js) to compress various file types (PNG, SVG, PDF) into a single ZIP file.

## 4. Core Functionality Implementation Patterns

### 4.1. Authentication Flow

-   **Signup:** User provides email, password. Password hashed with bcrypt. Email verification via SendGrid. JWT and refresh token issued.
-   **Login:** User provides email, password. Password compared. New JWT and refresh token issued.
-   **Refresh Token:** Frontend sends refresh token to backend when JWT expires. Backend validates refresh token, issues new JWT and refresh token.
-   **Logout:** Invalidate refresh token on backend, clear tokens from HttpOnly cookies.
-   **Middleware:** Authentication middleware to protect routes, authorization middleware for role-based access.

### 4.2. Real-time Features (AI Job Status)

-   **WebSocket Strategy:** Use Socket.IO or native WebSockets.
-   **Backend:** When an AI job is initiated (via BullMQ), the backend publishes status updates (e.g., `"processing"`, `"completed"`, `"failed"`) to a specific WebSocket room (e.g., `project/:projectId`).
-   **Frontend:** Subscribes to the relevant WebSocket room for the active project to display real-time progress indicators or notifications.
-   **Fallback:** If WebSocket connection fails, implement a polling mechanism (e.g., every 5-10 seconds) to check job status via a REST API endpoint.

### 4.3. AI Integration & Job Queue

-   **Asynchronous Processing:** All long-running AI inference tasks (GPT-4, DALL·E, Stable Diffusion) are pushed to a BullMQ queue.
-   **Job Workers:** Dedicated Node.js processes consume jobs from the queue, execute AI calls, and update the database with results.
-   **Error Handling:** Implement retry mechanisms with exponential backoff for failed AI calls.
-   **Status Updates:** Job workers publish status updates via WebSockets.
-   **Throttling:** Redis cache used to throttle repeated AI prompts from the same user within a short timeframe (e.g., 5 minutes).

## 5. Comprehensive Data Schema (PostgreSQL via TypeORM)

-   **User Entity:**
    -   `id: UUID (PK)`
    -   `email: string (UNIQUE)`
    -   `passwordHash: string`
    -   `isVerified: boolean`
    -   `role: string` (e.g., 'user', 'admin')
    -   `createdAt: timestamp`
    -   `updatedAt: timestamp`
-   **RefreshToken Entity:**
    -   `id: UUID (PK)`
    -   `token: string (UNIQUE)`
    -   `userId: UUID (FK to User.id)`
    -   `expiresAt: timestamp`
    -   `createdAt: timestamp`
-   **Project Entity:**
    -   `id: UUID (PK)`
    -   `name: string`
    -   `industry: string`
    -   `userId: UUID (FK to User.id)`
    -   `currentPhase: number` (1-5)
    -   `createdAt: timestamp`
    -   `updatedAt: timestamp`
-   **PhaseData Entity (Polymorphic/JSONB approach):**
    -   `id: UUID (PK)`
    -   `projectId: UUID (FK to Project.id)`
    -   `phaseType: string` (e.g., 'audience_research', 'brand_strategy', 'identity_design', 'positioning', 'visual_identity')
    -   `data: JSONB` (stores all phase-specific inputs and AI-generated outputs)
    -   `createdAt: timestamp`
    -   `updatedAt: timestamp`
    -   **Justification for JSONB:** Flexibility for evolving schema within phases, reduces need for many tables for each phase's unique data structure.
-   **PromptTemplate Entity:**
    -   `id: UUID (PK)`
    -   `name: string (UNIQUE)`
    -   `template: text` (Handlebars template string)
    -   `version: string`
    -   `isActive: boolean`
    -   `createdAt: timestamp`
    -   `updatedAt: timestamp`
-   **AuditLog Entity:**
    -   `id: UUID (PK)`
    -   `userId: UUID (FK to User.id)`
    -   `projectId: UUID (FK to Project.id, nullable)`
    -   `action: string` (e.g., 'AI_PROMPT_GENERATE', 'PROJECT_EXPORT')
    -   `details: JSONB` (e.g., prompt content, AI response summary)
    -   `timestamp: timestamp`

**Relationships:**
-   One-to-Many: User has many Projects.
-   One-to-Many: Project has many PhaseData entries (one per phaseType).
-   One-to-Many: User has many RefreshTokens.

**Indexing Strategy:**
-   Indexes on `userId` in `Project` and `RefreshToken` for fast user-specific lookups.
-   Index on `projectId` and `phaseType` in `PhaseData` for efficient retrieval of phase-specific data.
-   Index on `email` in `User` for fast authentication.
-   Index on `name` in `PromptTemplate` for quick template retrieval.

**Caching Policy (Redis):**
-   **Session Caching:** Store user session data (e.g., active project ID, last activity) for quick retrieval.
-   **AI Prompt Throttling:** Store user-specific prompt counts and timestamps to enforce rate limits.
-   **Frequently Accessed Prompts:** Cache `PromptTemplate` data.
-   **Invalidation:** Implement cache invalidation for updated data.

**Sample Query Patterns:**
-   `SELECT * FROM projects WHERE userId = :userId ORDER BY createdAt DESC;` (Get all projects for a user)
-   `SELECT data FROM phase_data WHERE projectId = :projectId AND phaseType = 'audience_research';` (Get specific phase data for a project)
-   `UPDATE phase_data SET data = :newData WHERE projectId = :projectId AND phaseType = :phaseType;` (Update phase data)

## 6. Test Coverage Requirements

-   **Unit Tests:**
    -   **Backend:** `AuthService`, `ProjectService`, `AudienceAIService`, `UserController`, `ProjectRepository`, TypeORM entities (methods).
    -   **Frontend:** React components (e.g., `Button`, `PhaseStepper`), custom hooks (`useAuth`, `useFormValidation`), Redux slices (reducers, actions).
    -   **Coverage Target:** 80% for core logic and UI components.
-   **Integration Tests:**
    -   **Backend:** API routes (`/v1/users/login`, `/v1/projects`), service-repository interactions.
    -   **Frontend:** React Query hooks interacting with API, Redux state updates from API responses.
-   **End-to-End Tests (Cypress/Playwright):**
    -   User Signup -> Login -> Create Project -> Navigate Phase 1 -> Save Data -> Navigate Phase 2.
    -   Complete all 5 phases for a sample project.
    -   Export Brand Kit.
    -   Error boundary triggering and display.
-   **Performance Benchmarks:**
    -   API response time: < 200ms for CRUD operations, < 1000ms for AI-triggered operations (excluding long-running jobs).
    -   Frontend initial load time: < 3 seconds.
    -   AI job completion time: Monitor and optimize, target < 60 seconds for most generations.
-   **Security Test Cases:**
    -   Unauthorized access to protected routes.
    -   Invalid JWT/refresh token handling.
    -   Rate limit enforcement.
    -   Input sanitization effectiveness (XSS, SQL injection attempts).
    -   GDPR data deletion verification.

## 7. UI Component Architecture

-   **Component Hierarchy:**
    -   `App.js` (Root, Context Providers)
    -   `Layout.js` (Header, Footer, Navigation)
    -   `DashboardPage.js` (Project List, Project Creation)
    -   `ProjectWizard.js` (Manages `PhaseStepper`, renders current phase component)
    -   `PhaseXComponent.js` (e.g., `AudienceResearch`, `StrategyBuilder` - contains forms, AI previews)
    -   `SharedUIComponents/` (Buttons, Modals, Cards from shadcn/ui, customized with Tailwind)
-   **State Propagation:** Global state (user, project list) via Redux. Phase-specific form state via React Hook Form. Server state via React Query.
-   **Responsive Breakpoints:** Mobile-first approach with Tailwind CSS breakpoints (`sm`, `md`, `lg`, `xl`). Adapt layouts using flexbox/grid for different screen sizes.
-   **Form Validation:** Client-side validation with React Hook Form. Server-side validation with Joi (backend) for data integrity.
-   **Error State Handling (Forms):** Display inline error messages for invalid inputs. Highlight fields with errors.
-   **Accessibility Requirements:**
    -   ARIA roles and attributes for custom interactive elements.
    -   Keyboard navigation for all forms, buttons, and phase navigation.
    -   Focus management for modals and dynamic content.
    -   Semantic HTML5 elements.
-   **Animation Timing & Performance:**
    -   Framer Motion for smooth phase transitions and micro-interactions.
    -   Animations should be performant (use `transform` and `opacity` for hardware acceleration).
    -   Avoid excessive animations that could degrade performance on lower-end devices.

## 8. Error Handling Protocol

-   **Error Types & Codes:**
    -   `400 Bad Request`: `VALIDATION_ERROR`, `INVALID_INPUT`
    -   `401 Unauthorized`: `AUTH_REQUIRED`, `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`
    -   `403 Forbidden`: `ACCESS_DENIED`, `RATE_LIMIT_EXCEEDED`
    -   `404 Not Found`: `RESOURCE_NOT_FOUND`
    -   `409 Conflict`: `RESOURCE_EXISTS`
    -   `500 Internal Server Error`: `SERVER_ERROR`, `AI_SERVICE_ERROR`, `DATABASE_ERROR`
-   **Logging Format:** Structured JSON logs with Winston (e.g., `timestamp`, `level`, `message`, `correlationId`, `userId`, `projectId`, `errorStack`).
-   **Retry Policies:** Exponential backoff for external API calls (e.g., OpenAI, SendGrid, S3) and BullMQ job retries.
-   **Monitoring Thresholds (Datadog/Sentry):
    -   Alert on 5xx errors > 1% of requests.
    -   Alert on critical log messages.
    -   Alert on AI job failures > 5%.
    -   Alert on database connection issues.
-   **Standardized Error Response:** `{ "message": "User-friendly error message.", "code": "INTERNAL_ERROR_CODE", "details": { ... } }`

## 9. CI/CD Requirements (GitHub Actions)

-   **Build Pipeline Stages:**
    1.  `Lint & Format`: ESLint, Prettier checks.
    2.  `Test`: Run unit, integration tests for both `api/` and `ui/`.
    3.  `Build`: Create production builds for `ui/` (Vite) and `api/` (Node.js).
    4.  `Docker Build`: Build Docker images for frontend and backend.
    5.  `Docker Push`: Push images to AWS ECR.
    6.  `Deploy`: Trigger Terraform to deploy/update ECS services.
-   **Validation Gates:** All stages must pass for deployment to proceed.
-   **Environment Configuration:** Use GitHub Actions secrets for sensitive environment variables. Terraform for managing AWS environment configurations.
-   **Database Migration Strategy:** Use TypeORM migrations. Apply migrations automatically during deployment (or via a separate, controlled step).
-   **Deployment Verification Tests:** Post-deployment health checks on ECS services. Basic smoke tests on deployed application (e.g., login, create project).
-   **Rollback Procedures:** Manual rollback to previous stable Docker image version on ECS in case of critical issues.

## 10. Performance Optimization Requirements

-   **Potential Bottlenecks & Mitigation:**
    -   **AI Inference Latency:** Use BullMQ for async processing, WebSockets for real-time feedback. Optimize prompt engineering.
    -   **Database Queries:** Indexing, TypeORM query optimization, eager/lazy loading strategies.
    -   **Image Processing:** Offload to Sharp on backend, use CDN (CloudFront).
    -   **Frontend Bundle Size:** Code splitting, lazy loading components (React.lazy, Suspense).
-   **Caching Strategy (Redis):**
    -   **AI Prompt Throttling:** Prevent excessive AI calls.
    -   **Session Data:** Reduce database load for user sessions.
    -   **Static Data:** Cache frequently accessed static data (e.g., industry lists, prompt templates).
    -   **Invalidation:** Implement cache invalidation for updated data.
-   **Code Splitting & Lazy Loading:** Split React application into smaller chunks. Lazy load phase components and large libraries.
-   **Query Optimization:** Use TypeORM's query builder for complex joins. Select only necessary columns.
-   **Asset Optimization:** Compress images (PNG, JPEG), minify CSS/JS bundles. Leverage browser caching for static assets.