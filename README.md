
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


## Automotive Data Model

Revora uses TypeScript interfaces to define the structure of vehicle records.

The initial data model is located in `types/vehicle.ts`.

### Vehicle Information

Each vehicle record contains:

- Vehicle identity: make, model, model year, trim, and market
- Specifications: body style, seating capacity, drivetrain, horsepower, and fuel economy
- Features: ambient lighting availability
- Pricing: estimated Canadian market price, when verified
- Verification: source references and verification dates

Unknown specifications are represented using `null`, rather than assumed values.

### Development Dataset

The file `data/vehicles.ts` contains two synthetic vehicle records used for development.

These records are fictional and must not be presented as real vehicle recommendations.

### Data Verification Strategy

Future Canadian-market vehicle data will be sourced from official manufacturer specifications and other reliable sources.

Vehicle specifications must be verified before being used in production recommendations.

### Current Limitations

- No real vehicle database is connected.
- No verified Canadian vehicle records have been added.
- No recommendation algorithm has been implemented.
- Vehicle search currently displays a placeholder message.
- TypeScript interfaces do not provide runtime data validation.

### Next Development Milestones

1. Introduce runtime validation for vehicle records.
2. Establish a verified Canadian vehicle dataset.
3. Implement basic vehicle filtering and matching.
4. Connect the recommendation engine to the user interface.
5. Add unit and integration tests.

## Vehicle Recommendation Engine

Revora includes a deterministic TypeScript recommendation engine.

### Current Functionality

- Vehicle filtering by body style
- Drivetrain requirements
- Minimum seating capacity
- Maximum budget in CAD
- Preference scoring for ambient lighting
- Ranking eligible vehicles by score
- Exclusion of vehicles that fail mandatory requirements
- Handling searches with no eligible vehicles

### Automated Testing

The project uses Vitest to test its core business logic.

Run the tests using:

```bash
npm test
```

Latest verified results:
- Vehicle filtering: 8 tests passed
- Preference scoring: 3 tests passed
- Recommendation pipeline: 4 tests passed
- Total: 15 tests passed

### Current Limitations

The recommendation engine currently uses synthetic test data and is not connected to the website.

Real vehicle recommendations, natural-language extraction, and AI integration are planned for future development.
