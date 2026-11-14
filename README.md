
# Revora

**Intelligent Automotive Discovery**

Revora is an AI-powered automotive discovery and recommendation platform designed to help Canadian drivers find vehicles that match their budgets, lifestyles, and preferences.

The project is being developed as both a potential SaaS product and a full-stack software engineering portfolio project.

## Project Status

**In Development — Phase 1: Foundation**

The current application includes an initial responsive landing page and an interactive vehicle search interface.

Vehicle recommendations and AI integration are planned features and are not yet implemented.

## Planned Features

- Natural-language vehicle discovery
- Personalized recommendations
- Verified Canadian vehicle specifications
- Explainable vehicle matching
- Vehicle comparisons
- Budget and ownership-cost considerations

## Technology Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Git and GitHub

Planned additions include PostgreSQL, Supabase, OpenAI API integration, automated testing, and CI/CD.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Development Checks

Run ESLint:

```bash
npm run lint
```

Run TypeScript validation:

```bash
npx tsc --noEmit
```

## Current Testing Status

- Homepage manually verified in Google Chrome.
- Search input and placeholder button interaction verified.
- ESLint passed.
- TypeScript validation passed.
- Production dependency audit reported zero vulnerabilities.

The full dependency audit identified eight moderate-severity findings in development tooling, which remain under review.

## Roadmap

- [x] Initialize Next.js application
- [x] Build initial landing page
- [x] Implement interactive search input
- [x] Run initial code-quality checks
- [ ] Build vehicle database
- [ ] Implement recommendation engine
- [ ] Integrate AI-powered requirement extraction
- [ ] Create vehicle comparison interface
- [ ] Add automated tests
- [ ] Configure GitHub Actions
- [ ] Deploy application

## Current Limitations

Revora is in early development. The vehicle search button currently displays a placeholder message rather than generating recommendations.

Vehicle information, live dealership listings, and personalized ownership-cost calculations are not yet available.
