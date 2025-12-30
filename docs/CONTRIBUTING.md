# Contributing Guidelines

First off, thank you for taking the time to contribute!

## Development Workflow

To maintain a clean and logical project history, we follow a strict "Issue-First" workflow:

### 1. The Issue is Key
- **No Pull Request will be merged without an associated Issue.**
- If you want to work on something, check the [Issues](https://github.com/hugo-lanzafame/steam-game-rank-builder/issues) page. 
- If the task doesn't exist, create a new Issue to discuss it before starting to code.

### 2. Branch Naming Convention

| Prefix | Description
| :--- | :--- |
| `feature/` | New features or UI additions
| `bugfix/` | Bug fixes
| `doc/` | Documentation updates
| `refactor/` | Code cleanup or optimization


After the prefix, use the Issue ID followed by a short, kebab-case description of the task.

**Format:** prefix/id-description

**Examples:** 
- feature/12-steam-id-validation
- bugfix/45-fix-drag-offset-mobile
- refactor/8-optimize-zustand-selectors

### 3. Submitting a Pull Request
1. Fork the repository and create your branch from `master`.
2. Ensure your code is clean and matches the project's style.
3. Just before submmiting, pull `master` to resolve potentials merges.
3. In your PR description, use a keyword to link and close the issue (e.g., `Closes #12`).
4. Once submitted, your PR will be reviewed as soon as possible!
