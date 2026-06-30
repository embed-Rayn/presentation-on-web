# CLAUDE.md

This file defines the project structure, build/test commands, and conventions for Claude.
Common design principles and coding standards are inherited from [AGENTS.md](AGENTS.md).

---

## 🛠️ Build and Development Commands

Navigate to the specific presentation folder (e.g., `./the-art-of-loop-engineering`) before running commands:
- **Install Dependencies**: `npm install`
- **Development Server**: `npm run dev`
- **Production Build**: `npm run build`
- **Linting**: `npm run lint`

---

## 📂 Project Layout & Conventions

- `template/` - **IMPORTANT: DO NOT modify any files in this directory.** It serves as the baseline template.
- `[presentation-name]/` - The directory where individual web presentations are generated and run.
- `AGENTS.md` - Common rules for all agents (styling, UI components, React standards).
- `GEMINI.md` - Guidelines specifically configured for Gemini workflows.

---

## ⚠️ Important Rules & Constraints

- **Template Preservation**: `IMPORTANT: YOU MUST NOT modify /template directly.` Keep it completely clean.
- **Workflow & Verbs**: `IMPORTANT: Multi-step workflows (like copying templates, initializing directories) should be performed dynamically using workspace tools or custom scripts. Do not hardcode procedures in this file.`
- **Content Readability**: `IMPORTANT: Ensure all generated slides avoid walls of text. Emphasize key concepts using standard inline styles or HTML highlight tags as defined in AGENTS.md.`
- **Auto Memory**: `IMPORTANT: Rely on Claude's built-in auto-memory feature for persisting learned preferences or local context. Do not manually record memory inside this configuration.`
