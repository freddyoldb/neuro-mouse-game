# neuro-mouse-game

A local-only language-learning mouse simulation.

This version is not deployed to GitHub Pages. It runs locally on your computer and keeps everything in a private in-memory world.

Features:
- single-user local world
- no global public backend
- train the mouse by typing words
- automatic word-to-behavior learning
- no reset button, no turbo, no shared state

## Install

1. Open a terminal in the project folder.
2. Run:
   npm install

## Start locally

Run:
npm start

Then open:
http://localhost:3000

## Local development

npm run dev

## What this version does

- uses a local Express backend
- serves the game from your computer
- keeps all game state in memory only
- is fully private to the machine running it
- can be packaged later into a desktop app if desired

## Notes

This is intentionally not a public GitHub Pages app. It is designed to run fully local and privately.
