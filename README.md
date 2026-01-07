# Horse Racing Simulator

A simple horse racing simulation built with Vue 3 and TypeScript. Watch horses compete in 6 different laps with varying distances.

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

## How It Works

1. Click **GENERATE PROGRAM** to create a new racing schedule
2. Click **START** to begin the races
3. Watch as horses compete in 6 consecutive laps (1200m - 2200m)
4. Results appear automatically after each lap completes

## Project Structure

```
src/
├── components/
│   ├── HorseRacing.vue    # Main container
│   ├── HorseList.vue      # Horse roster display
│   ├── RaceTrack.vue      # Race animation view
│   ├── RaceProgram.vue    # Upcoming races
│   └── RaceResults.vue    # Completed race results
├── store/
│   └── index.ts           # Vuex state management
└── types/
    └── index.ts           # TypeScript definitions
```

## Race Mechanics

Horse performance is calculated based on:

- **Base time**: 3 seconds
- **Condition factor**: Lower condition = slower speed
- **Random factor**: Adds unpredictability to each race

The horse with the shortest time wins!
