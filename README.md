# Horse Racing Simulator 🏇🏼

A simple horse racing simulation built with Vue 3 and TypeScript. Watch horses compete in 6 different laps with varying distances. 🏇🏼

## Live Demo

The application is deployed and live at: **[https://insider-one-case.vercel.app/](https://insider-one-case.vercel.app/)**

## Features

- Generate random racing programs with 6 laps
- 20 unique horses with different conditions and colors
- Real-time race animations
- Automatic race progression
- Live results tracking

## Tech Stack

- Vue 3 (Composition API)
- TypeScript
- Vuex (State Management)
- Vite
- Cypress (E2E Testing)

## Getting Started

### Prerequisites

- Node.js 20.19.0+ or 22.12.0+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Type Check

```bash
npm run type-check
```

### Testing

#### Run E2E Tests (Headless)

```bash
npm run test:e2e
```

#### Open Cypress Test Runner

```bash
npm run test:e2e:open
```

## How It Works

1. Click **GENERATE PROGRAM** to create a new racing schedule
2. Click **START** to begin the races
3. Watch as horses compete in 6 consecutive laps (1200m - 2200m)
4. Results appear automatically after each lap completes

## Project Structure

```
src/
├── components/
│   ├── HorseRacing.vue
│   ├── HorseList.vue
│   ├── RaceTrack.vue
│   ├── RaceProgram.vue
│   └── RaceResults.vue
├── store/
│   └── index.ts
└── types/
    └── index.ts
cypress/
└── e2e/
    └── race-flow.cy.ts
```

## Race Mechanics

Horse performance is calculated based on:

- **Base time**: 3 seconds
- **Condition factor**: Lower condition = slower speed
- **Random factor**: Adds unpredictability to each race

The horse with the shortest time wins!

## Testing

The project includes comprehensive E2E tests using Cypress:

### Test Coverage

- **Full race flow**: Program generation - race start - results verification
- **UI validation**: Horse information display (name, condition, color)
- **Results validation**: Placement order and finish times
- **Button states**: Disabled states during race execution
- **Multiple races**: New program generation after race completion

### Running Tests

```bash
npm run test:e2e
npm run test:e2e:open
```
