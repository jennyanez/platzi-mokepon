# Mokepon

A browser game where players choose a Mokepon, explore a map, move around the arena and battle using different attacks.

## Live demo

Play the deployed version here:

[Open Mokepon](https://platzi-mokepon.onrender.com/)

> The first request may take a little longer because the free hosting service can pause the application after a period without activity.

## Features

- Select a Mokepon before starting a game.
- Explore the map using keyboard or on-screen controls.
- Play against other connected players.
- Select attacks during a battle.
- Track player and opponent health.
- Restart a match after it ends.
- Synchronize players through a Node.js and Express backend.

## Tech stack

- HTML
- CSS
- Vanilla JavaScript
- Node.js
- Express
- CORS
- Canvas API

## Project structure

```text
.
├── index.js              # Express server and game endpoints
├── package.json
├── package-lock.json
└── public/
    ├── index.html        # Game interface
    ├── assets/           # Mokepon and map assets
    ├── js/               # Client-side game logic
    └── styles/           # Game styles
```

## Requirements

- Node.js 18 or newer
- npm
- A modern web browser

## Installation

```bash
git clone https://github.com/jennyanez/platzi-mokepon.git
cd platzi-mokepon
npm install
```

## Run locally

Start the server:

```bash
npm start
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

To test the multiplayer flow locally, open the game in two browser windows or tabs.

## Game flow

1. Choose a Mokepon.
2. Move through the map.
3. Find another connected player.
4. Choose an attack when the battle begins.
5. Compare the result and remaining health.
6. Restart the match when it ends.

## API overview

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/join` | Registers a player and returns its identifier |
| POST | `/mokepon/:jugadorId` | Assigns a Mokepon to a player |
| POST | `/mokepon/:jugadorId/posicion` | Updates a player's position and returns opponents |
| POST | `/mokepon/:jugadorId/ataques` | Stores the attacks selected by a player |
| GET | `/mokepon/:jugadorId/ataques` | Returns the attacks stored for a player |

Player state is kept in memory while the server is running. Restarting the server clears current game sessions.

## Project status

Educational multiplayer browser game built with JavaScript, Canvas and Express.
