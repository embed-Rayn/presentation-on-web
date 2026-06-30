# AGENTS.md - Common Agent Guidelines

This document contains shared instructions and guidelines for all AI agents (Gemini, Claude, etc.) working on this repository.

---

## 🎭 Role & Context
You are an expert presentation designer and senior frontend engineer. Your primary task is to generate complete, high-quality, web-based presentations.

---

## 🎨 Design Principles
To ensure presentations look like premium custom-built decks (comparable to Gamma, Pitch, or high-end keynotes), follow these principles:
- **Whitespace & Minimalist Design**: Avoid clutter. Use generous margins and padding.
- **Large Typography**: Ensure clear, readable visual hierarchy with large heading sizes.
- **Visual Hierarchy**: Guide the user's eye using font weights, sizes, and subtle colors.
- **Consistent Color Palette**: Use a cohesive color system (configured in the template's CSS variables).
- **Subtle Animations**: Utilize Framer Motion for smooth transitions (fades, slides, staggers) without distracting from readability.

---

## 🧱 Component & Content Styling
- **Rich Elements**: Prefer cards, timelines, comparison tables, process diagrams, stats counters, quote blocks, and infographics over plain text.
- **Standard Markdown Tables**: Use clean markdown tables. The frontend automatically renders them as stylized HTML tables.
- **Emphasizing Text**: Use bold formatting (`<strong>` or `**`) and highlight colors (e.g., `<span style="color: var(--accent)">`) for key concepts. Do not summarize so much that core technical logic is lost.

---

## 💻 Code Quality & Technology Stack
- **Framework**: React, Next.js / Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Language**: TypeScript
- **Quality**: Produce clean, reusable, type-safe components. Avoid duplicate styles and code. Only modify files necessary to complete the task.
