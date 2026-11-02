const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Statische Auslieferung des Frontends aus demselben Ordner
app.use(express.static(path.join(__dirname)));

// Globaler Simulations-Zustand
let worldState = {
  mouse: { x: 5, y: 5 },
  cat: { x: 15, y: 15 },
  cheese: [
    { x: 3, y: 3 },
    { x: 12, y: 4 },
    { x: 8, y: 14 }
  ],
  traps: [
    { x: 6, y: 6 },
    { x: 14, y: 8 }
  ],
  tunnels: [
    { x: 1, y: 18 },
    { x: 18, y: 1 }
  ],
  memory: {},
  currentPattern: 'none',
  survivalTime: 0,
  bestRecord: 0,
  runId: 1
};

// GET /api/world - Liefert den aktuellen Weltstatus
app.get('/api/world', (req, res) => {
  res.json(worldState);
});

// POST /api/world/teach - Verarbeitet gelerntes Wort
app.post('/api/world/teach', (req, res) => {
  const { word } = req.body;
  if (!word) {
    return res.status(400).json({ ok: false, error: 'Kein Wort angegeben' });
  }

  const cleanWord = word.trim().toLowerCase();
  
  // Einfache Musterzuweisung basierend auf dem Wortinhalt
  let pattern = 'exploration';
  if (cleanWord.includes('lauf') || cleanWord.includes('schnell')) {
    pattern = 'speed_boost';
  } else if (cleanWord.includes('falle') || cleanWord.includes('vorsicht')) {
    pattern = 'evade_traps';
  } else if (cleanWord.includes('käse') || cleanWord.includes('suche')) {
    pattern = 'cheese_hunter';
  } else if (cleanWord.includes('tunnel')) {
    pattern = 'tunnel_teleport';
  }

  worldState.memory[cleanWord] = pattern;
  worldState.currentPattern = pattern;

  res.json({ ok: true, pattern });
});

// POST /api/world/tick - Lässt die Simulation einen Schritt weiterlaufen
app.post('/api/world/tick', (req, res) => {
  worldState.survivalTime += 6;

  // Einfache autonome Bewegung der Katze Richtung Maus
  if (worldState.cat.x < worldState.mouse.x) worldState.cat.x++;
  else if (worldState.cat.x > worldState.mouse.x) worldState.cat.x--;

  if (worldState.cat.y < worldState.mouse.y) worldState.cat.y++;
  else if (worldState.cat.y > worldState.mouse.y) worldState.cat.y--;

  // Maus-Flucht- oder Suchlogik je nach Muster
  if (worldState.currentPattern === 'speed_boost') {
    worldState.mouse.x = (worldState.mouse.x + 2) % 20;
    worldState.mouse.y = (worldState.mouse.y + 1) % 20;
  } else if (worldState.currentPattern === 'evade_traps') {
    // Bewegt sich weg von Fallen
    worldState.mouse.x = Math.max(0, Math.min(19, worldState.mouse.x + (Math.random() > 0.5 ? 1 : -1)));
    worldState.mouse.y = Math.max(0, Math.min(19, worldState.mouse.y + (Math.random() > 0.5 ? 1 : -1)));
  } else {
    // Standard-Zufallsbewegung
    worldState.mouse.x = (worldState.mouse.x + (Math.random() > 0.5 ? 1 : -1) + 20) % 20;
    worldState.mouse.y = (worldState.mouse.y + (Math.random() > 0.5 ? 1 : -1) + 20) % 20;
  }

  // Kollisionsprüfung (Maus fängt Käse)
  worldState.cheese = worldState.cheese.filter(c => {
    const caught = c.x === worldState.mouse.x && c.y === worldState.mouse.y;
    return !caught;
  });

  // Wenn Käse leer ist, neuen Käse spawnen
  if (worldState.cheese.length === 0) {
    worldState.cheese.push({
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20)
    });
  }

  // Kollisionsprüfung (Katze fängt Maus -> Reset)
  if (worldState.cat.x === worldState.mouse.x && worldState.cat.y === worldState.mouse.y) {
    if (worldState.survivalTime > worldState.bestRecord) {
      worldState.bestRecord = worldState.survivalTime;
    }
    worldState.survivalTime = 0;
    worldState.runId++;
    worldState.mouse = { x: 5, y: 5 };
    worldState.cat = { x: 15, y: 15 };
    worldState.currentPattern = 'none';
  }

  res.json({ ok: true, world: worldState });
});

app.listen(PORT, () => {
  console.log(`NeuroMouse World Server läuft auf Port ${PORT}`);
});
