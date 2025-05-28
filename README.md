# Escape Room Game - Angular Project

Welcome to the **Escape Room Game**, a web-based interactive puzzle game built with Angular. This project demonstrates the use of modern Angular features including components, services, directives, Material Design, forms, and more.

## Live Demo

Play the game here: [https://escape-a27b5.web.app/](https://escape-a27b5.web.app/)

## Project Features & Requirements

This project fulfills the following development requirements:

### ✅ Compilation & Runtime
- No TypeScript or Angular compilation errors (`ng serve` runs cleanly).
- No runtime errors in the browser console.

### ✅ Data Modeling
- Defined **at least 4 TypeScript interfaces or classes** for core entities (e.g., `Room`, `Puzzle`, `Player`, `Timer`).
- Each model is tied to a corresponding data collection.

### ✅ Component Architecture
- The application is decomposed into multiple, logically separated Angular components.
- No single component exceeds:
  - 250 lines of TypeScript or HTML code.
  - 400 characters per line.

### ✅ UI & Responsiveness
- Mobile-first, fully **responsive** design.
- All data is clearly visible and correctly formatted in both mobile and desktop views.

### ✅ Directives
- Utilizes **at least 2 different attribute directives**, such as `ngClass`, `ngStyle`, or custom ones.

### ✅ Control Flow
- Implements **at least 2 built-in control structures**, such as:
  - `*ngIf`
  - `*ngFor`
  - `ngSwitch`

### ✅ Component Communication
- Demonstrates **parent-child communication**:
  - Uses `@Input()` for passing data to a child.
  - Uses `@Output()` and `EventEmitter` for emitting events back to the parent.

### ✅ Angular Material Integration
- Uses **at least 10 different Angular Material components**, for example:
  - `MatCard`, `MatButton`, `MatDialog`, `MatInput`, `MatToolbar`, etc.

### ✅ Form Handling
- Implements **at least 2 Angular forms** (template-driven or reactive) for user input.
  - Examples: User login, puzzle answer input.

### ✅ Custom Pipes
- Contains and uses **at least 1 custom pipe class**, for example to format time or escape messages.

## Getting Started

### Installation
```bash
git clone https://github.com/your-username/escape-room-game.git
cd escape-room-game
npm install
ng serve
