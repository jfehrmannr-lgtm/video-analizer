# Agent Instructions

- **Never update this file**

## Project

- Web application built with React and Next.js for exploring and analyzing the video catalog of Barbakahn.
- The application provides an interface for browsing videos, viewing video information, searching content, applying filters, exploring categories, and viewing statistics about the channel and its content.
- The application should use a modern, dark, technological, and content-focused visual design.
- Prioritize a simple and understandable architecture that can evolve as new application requirements are introduced.

## Technology Stack

- React v19.
- Next.js v16 using the App Router.
- TypeScript v6.
- `@types/node` v20.
- Tailwind CSS v4.
- Use existing dependencies when they already provide the required functionality.

## Commands

- Development: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

## Constraints

- Remove unused symbols before building.
- Never install, remove, upgrade, or replace a dependency without explicit user authorization.
- If a task requires a dependency that is not currently installed, stop before implementing that part and ask the user for permission to install it.
- When requesting permission, state the dependency name and briefly explain why it is required.
- Never delete, rename, or move an existing file without explicit user authorization.
- Create new files when required to follow the project structure and code conventions.
- Do not create unnecessary files or directories.

## Code Conventions

- Prioritize readable, maintainable code over clever abstractions or micro-optimizations.
- Use descriptive names and avoid unnecessary abbreviations.
- Declare functions and React components using arrow functions.
- Use `lowerCamelCase` for functions, utilities, variables, hooks, and constants.
- Use `UpperCamelCase` for React components and component files.
- Do not use global variables or global mutable state.
- Keep constants scoped as locally as possible.
- Prefer early returns and extracted logic over deeply nested conditions.
- Avoid overly compact one-liners when they reduce readability.
- **NEVER** define more than one React component in the same file.
- **EVERY** React component MUST live in its own dedicated file.
- Do not create helper/internal React components inside another component file.
- If a component needs to be split, create a separate file for each resulting component.

## Next.js Conventions

- Use the App Router.
- Prefer Server Components by default.
- Only use `"use client"` when client-side functionality actually requires it.
- Do not add `"use client"` preemptively.
- Keep Next.js route files inside `app/`.
- Use Next.js special file conventions such as `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` when appropriate.
- Special Next.js UI files must expose the component expected by Next.js through their default export.
- Pages should primarily compose components instead of containing the complete implementation of large UI sections.
- Do not implement Server Actions, Route Handlers, middleware, caching strategies, or data-fetching architecture unless explicitly requested.

## Tailwind CSS Conventions

- Prefer Tailwind CSS built-in utilities, naming conventions, and design patterns instead of creating custom alternatives.
- Always prefer Tailwind canonical utilities suggested by Tailwind CSS IntelliSense (e.g. `tracking-wider` instead of `tracking-[0.05em]`) and avoid arbitrary values when an equivalent built-in utility exists.
- Keep class lists minimal: avoid redundant, overlapping, duplicated, or conflicting utilities.
- Before adding a utility, check whether an existing class already provides or overrides the same behavior.
- When custom Tailwind theme tokens, colors, utilities, or animations are required, define them in `app/globals.css`.

## Documentation

- Document functions, hooks, services, repositories, utilities, and React components using TSDoc.
- Document parameters, return values, behavior, and relevant constraints when they are not obvious from the code.
- Use inline comments only for non-obvious logic, architectural decisions, workarounds, or external integration behavior.
- Do not add comments that simply restate the code.
- Keep documentation concise and synchronized with the implementation.

## AI Changelog

- After completing any task that modifies the project, append an entry to `AIChangelog.md`.
- Follow the format and rules defined inside `AIChangelog.md`.
- Log only completed project changes, not discussions, planning, or unanswered prompts.
- Keep entries concise and add the newest entry at the top.

## Basic App Structure

app/
├── feature/
│   ├── [id]/
│   │   └── page.tsx
│   └── page.tsx
│
├── layout.tsx
├── page.tsx
└── globals.css

components/
└── ComponentFolder/
    ├── Component.tsx
    ├── ComponentPart1.tsx
    ├── ComponentPart2.tsx
    └── ...

services/
└── example.service.ts

hooks/
└── useHookExample.ts

types/
└── example.types.ts

utils/
└── example.util.ts

assets/