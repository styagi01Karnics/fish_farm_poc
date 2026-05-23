# Fish Farming

React + TypeScript web app converted from the [Figma design](https://www.figma.com/design/Xs8wTPk3VQnHUdg9LKh2RZ/Fishing-Pond-Monitor).

## Screens

| Route | Description |
|-------|-------------|
| `/login` | Log in |
| `/dashboard` | Overview with nitrogen cycle metrics, alerts, charts |
| `/ponds` | Pond list with full water parameter columns |
| `/real-time` | Live readings per pond |
| `/water-quality` | Parameter guide (ideal ranges) + trends |
| `/alerts` | Water alerts + fish disease reference |
| `/reports` | Compliance reports and templates |
| `/history` | Water tests and treatment log |
| `/camera` | Camera feeds + behavioral watch list |
| `/team` | Field staff and sampling records |
| `/settings` | Thresholds, notifications, chemicals reference |

Data and ideal ranges are based on `fish_pond_water_parameters.pdf` and `fish_diseases_complete_guide.pdf`.

## Stack

- **React 19** + **TypeScript**
- **Vite** — dev server and build
- **React Router** — routing
- **Lucide React** — icons (replacing Fluent icons from Figma)
- **Recharts** — dashboard charts
- **CSS Modules** — styling (design tokens in `src/styles/variables.css`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Use **Login** to reach the dashboard.

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    layout/     # Sidebar, Header, AppLayout
    ponds/      # PondTable
    ui/         # Badge, Card, StatCard
  pages/        # Login, Dashboard, Ponds
  data/         # Mock pond & dashboard data
  styles/       # Global CSS & design tokens
```

## Design notes

- Colors and layout follow the Figma file (`#0145cc` primary, `#02162e` sidebar, `#f5f8fd` page background).
- Hero/login images use temporary Figma MCP asset URLs (expire after ~7 days). Replace with local assets under `public/` for production.
