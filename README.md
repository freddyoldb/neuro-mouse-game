# NeuroMouse World

NeuroMouse World is an interactive, shared multi-user learning environment where an autonomous agent (a mouse) navigates a grid world while learning from user-submitted text inputs. The system combines real-time simulation mechanics, neural network visualization, and collaborative text-based learning.

---

## Features

- **Interactive Grid Simulation:** A canvas-based 2D world where a mouse navigates while avoiding hazards (cats, traps) and finding rewards (cheese, tunnels).
- **Global Neural Learning:** Users can submit words or patterns via the input field to teach the mouse new behaviors and shape its learning phase in real-time.
- **Neural Network Visualizer:** An animated, node-based brain canvas that dynamically reflects neural activity and active learning patterns.
- **Real-time Synchronization:** Continuous state tracking including survival time, personal records, current action patterns, and active vocabulary count.
- **Modern Responsive UI:** Built with Tailwind CSS and styled with a dark, high-contrast aesthetic.

---

## Tech Stack

- **Frontend:** HTML5, Tailwind CSS (via CDN), JavaScript (Canvas API)
- **Backend Integration:** REST API endpoints (`/api/world`, `/api/world/teach`, `/api/world/tick`)

---

## Getting Started

1. Save the main HTML interface file to your project directory (e.g., `index.html`).
2. Set up a backend server that implements the required API routes (`/api/world`, `/api/world/teach`, and `/api/world/tick`).
3. Serve the static HTML file through your web server.
4. Open the application in your browser to start interacting with the simulation and teaching the mouse.

---

## API Endpoints Reference

- `GET /api/world` - Retrieves the current state of the world, including mouse position, hazards, items, and memory.
- `POST /api/world/teach` - Submits a new word to train the mouse and update its behavior patterns.
- `POST /api/world/tick` - Advances the simulation state by one tick.
