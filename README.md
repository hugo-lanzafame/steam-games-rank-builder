# Steam Games Rank Builder

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Zustand](https://img.shields.io/badge/State-Zustand-orange)](https://docs.pmnd.rs/zustand/)
[![Steam API](https://img.shields.io/badge/Steam_API-v1-000000?logo=steam&logoColor=white)](https://steamcommunity.com/dev)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/hugo-lanzafame/steam-game-rank-builder)](https://github.com/hugo-lanzafame/steam-game-rank-builder/releases)

A webapp that allows users to rank their Steam library into an interactive tierlist.

## Features

- Steam Integration: Automatically fetch owned games using a Steam ID (supports Vanity URLs).
- Drag & Drop Interface: Intuitive ranking system to move games between tiers (S, A, B, C, D) and the "Unranked" pool, powered by @dnd-kit for 60fps hardware-accelerated animations
- State Persistence: Your Tier List is automatically saved in your browser's LocalStorage via Zustand, so you don't lose your progress.
- Responsive Design: Fully functional on desktop with a clean, steam-inspired UI.

## Quick Start

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v20.0.0 or higher)
- A [Steam](https://store.steampowered.com/) account

### 2. Installation

1. Clone the repository
```bash
git clone https://github.com/hugo-lanzafame/steam-game-rank-builder.git
cd steam-game-rank-builder
```

2. Create your configuration file
```bash
cp .env.example .env
```

3. Fill your Steam API Key in your .env file.
```bash
# To get your Steam API Key, check https://steamcommunity.com/dev/apikey
STEAM_API_KEY=YourApiKeyHere
```

4. Install dependencies
```bash
npm i
```

5. Run the development server
```bash
npm run dev
```

## Security

- This application is a client-side focused tool. It does not use a remote database to store your data. All rankings and Steam IDs are stored locally in your browser. No personal data is collected or shared with third parties.

- The `STEAM_API_KEY` is handled via Next.js API Routes (Server-side), ensuring it remains hidden from the browser and is never exposed to the end-user.

**IMPORTANT:** Never share or commit your .env file, or your `STEAM_API_KEY`.

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE.MD) file for details.

## Contributing

Everyone is welcome to contribute to this project! You don't need to be a developer to help out:

- **Share your feedback**: Use the issues to discuss your user experience or suggest improvements.
- **Report a bug**: If something isn't working, let me know by opening an issue.
- **Request a feature**: Have an idea for a new tool? I'd love to hear about it. Open a new issue.
- **Code**: Whether you want to fix a bug or build a new feature, you can pick up an existing issue or propose a new one.

For technical details on how to set up the project and our coding standards, please read our [Contributing Guidelines](docs/CONTRIBUTING.md).

Check the [Issues](https://github.com/hugo-lanzafame/steam-game-rank-builder/issues) page to see what's currently being worked on.
