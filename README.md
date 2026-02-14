# ColoSim-Trainer: Evidence-Based Colonoscopy Simulation

A web-based 3D colonoscopy training application designed to provide real-time feedback on navigation and loop reduction.

## Features
- **Procedural Colon Generation**: Infinite variations of colon anatomy.
- **Physics-Based Controls**: Realistic scope movement and collision.
- **Real-Time Feedback HUD**: 
    - **Force Gauge**: Visualizes wall impact force.
    - **Loop Warning**: Detects excessive rotation without forward progress.
    - **Polyp Counter**: Tracks found pathologies.

## Getting Started

1. Navigate to the trainer directory:
   ```bash
   cd ColoSim-Trainer
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Tech Stack
- React
- Three.js (@react-three/fiber)
- Cannon.js (@react-three/cannon)
- Vite
