# Design Guidelines

## Component Architecture

### Stack

- **Primitives:** Radix UI (form controls, overlays) + Base UI React (button)
- **Variants:** `class-variance-authority` (CVA) — all base components use `cva()` for size/variant
- **Class merging:** `cn()` = `clsx` + `tailwind-merge`
- **Styling:** Tailwind CSS v4 + `tailwindcss-animate` plugin
- **Font:** Inter (self-hosted)

### Base Components (26)

`badge` `button` `calendar` `checkbox` `container` `datepicker` `dialog` `dropdown-menu` `h-stack` `input` `input-group` `label` `popover` `radio-group` `select` `sheet` `show` `skeleton` `slider` `switch` `table` `tabs` `textarea` `toaster` `tooltip` `v-stack`

Location: `src/components/base/`

### Widget Pattern (3-File)

```
feature/
├── feature.widget.tsx    # Entry point, prop definitions, modal registration
├── feature.ui.tsx        # Pure UI, receives props from script
└── feature.script.ts     # Hook with business logic
```

## Color System

### Strategy

- CSS class-based dark mode (`.light` / `.dark` on root)
- Semantic tokens via CSS variables → flow into Tailwind via `@theme inline`
- Components use token names only — never raw hex values
- Same token auto-resolves per theme, no `dark:` prefix needed

## Spacing & Layout

### Spacing

Tailwind v4 default scale (4px base): `gap-1` = 4px, `gap-2` = 8px, `p-4` = 16px, etc.
No custom spacing tokens.

### Layout Components

- `h-stack` — horizontal flex with CVA gap/align variants
- `v-stack` — vertical flex with CVA gap variants
- `container` — custom wrapper component
- Split panes — resizable horizontal/vertical panels (custom CSS)

### Breakpoints

Tailwind v4 defaults: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px).

## Animation Standards

### Component Transitions

Standard pattern across form controls:

```
transition-[specific-props] duration-150 ease-out
```

- Always list specific properties (no `transition-all` on form controls)
- Duration: `150ms` for micro-interactions
- Easing: `ease-out` default

### Overlay Animations

- Sheet slide: `0.3s ease-out` (enter), `0.2s ease-in` (exit)
- Toast: blur + scale + translateY with staggered delays
- Plugin: `tailwindcss-animate` for declarative enter/exit

## Naming Conventions

| Element       | Convention                         | Example                                   |
| ------------- | ---------------------------------- | ----------------------------------------- |
| Files         | kebab-case, descriptive            | `enable-trading.ui.tsx`                   |
| Components    | PascalCase exports                 | `EnableTradingUI`                         |
| Hooks         | camelCase, `use` prefix            | `useEnableTradingScript`                  |
| Hook files    | camelCase                          | `usePositionsScript.ts`                   |
| Script files  | kebab-case `.script.ts`            | `leverage.script.tsx`                     |
| CSS variables | `--color-{category}-{variant}`     | `--color-surface-primary-medium`          |
| SVG icons     | kebab-case file, PascalCase export | `arrow-right-icon.tsx` → `ArrowRightIcon` |
| CVA variants  | camelCase keys                     | `buttonVariants({ variant, size })`       |

## File Sources

| File                          | Purpose                                                           |
| ----------------------------- | ----------------------------------------------------------------- |
| `src/styles/globals.css`      | Theme tokens (`@theme inline`), imports                           |
| `src/styles/themes/light.css` | Light theme raw values                                            |
| `src/styles/themes/dark.css`  | Dark theme raw values                                             |
| `src/styles/style.css`        | Global resets, custom button hover CSS, scrollbar, split panes    |
| `src/styles/reset.css`        | HTML element resets                                               |
| `src/styles/animations.css`   | Keyframe definitions for sheets                                   |
| `src/assets/fonts/fonts.css`  | Inter font import                                                 |
| `src/components/base/`        | All 26 base components (no barrel exports, import by direct path) |
| `src/utils/generic.ts`        | `cn()` utility for class merging                                  |
