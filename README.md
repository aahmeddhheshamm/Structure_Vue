# Structure Vue

A modern Vue 3 admin dashboard application built with TypeScript, featuring authentication, product management, supplier management, and a fully responsive design with RTL support and internationalization.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Architecture](#architecture)
- [Features](#features)
- [Routing](#routing)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Internationalization (i18n)](#internationalization-i18n)
- [Styling](#styling)
- [Scripts](#scripts)

---

## Overview

Structure Vue is a feature-rich admin panel that provides:

- **Authentication** — Login and registration flows with form validation
- **Dashboard** — Central hub with sidebar navigation
- **Products Module** — Product listing with filtering, sorting, and pagination
- **Suppliers Module** — Supplier management with data tables
- **Theme Support** — Light/dark mode with system preference detection
- **Multi-language** — English and Arabic with RTL layout support

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Vue 3 (Composition API) |
| **Build Tool** | Vite 6 |
| **Language** | TypeScript |
| **State Management** | Pinia |
| **Routing** | Vue Router 4 |
| **Data Fetching** | TanStack Vue Query |
| **Form Validation** | VeeValidate + Yup |
| **UI Components** | PrimeVue 4 (Aura theme) |
| **Styling** | Tailwind CSS 3, SCSS |
| **Internationalization** | Vue I18n |
| **Notifications** | Vue3 Toastify |
| **Utilities** | Moment.js, Headless UI |

---

## Project Structure

```
Structure_Vue/
├── public/                    # Static assets
│   └── logo.svg
├── src/
│   ├── assets/                # App assets
│   │   ├── fonts/             # Cairo, Lexend fonts
│   │   ├── images/            # Images and logos
│   │   └── styles/            # Global styles
│   │       ├── main.scss      # Main stylesheet
│   │       ├── _variables.scss
│   │       ├── _primevue.scss
│   │       ├── _mainTable.scss
│   │       └── _fonts.scss
│   │
│   ├── components/            # Reusable components
│   │   ├── buttons/           # MainButton, IconButton, BackButton, etc.
│   │   ├── form/              # InputTextField, SelectBox, DatePicker, etc.
│   │   ├── icons/             # SVG icon components
│   │   ├── table/             # MainDataTable, RowSelect
│   │   └── UI/                # Box, PagesHeader, SpinnerLoading, etc.
│   │
│   ├── composables/           # Composition API logic
│   │   ├── useFetch.ts        # TanStack Query wrapper for GET requests
│   │   ├── useMutate.ts       # TanStack Query wrapper for mutations
│   │   ├── useLocaleSettings.ts
│   │   └── useSideBar.ts
│   │
│   ├── constants/             # App constants
│   │   └── status.ts          # Status colors mapping
│   │
│   ├── layouts/
│   │   ├── auth/              # Auth layout (login, register)
│   │   └── dashboard/        # Dashboard layout
│   │       ├── components/
│   │       │   ├── navbar/    # Top navbar, search, language switch
│   │       │   └── sidebar/   # Collapsible sidebar
│   │       └── index.vue
│   │
│   ├── locales/               # i18n translations
│   │   ├── en.json
│   │   └── ar.json
│   │
│   ├── modules/               # Feature modules
│   │   ├── auth/              # Authentication
│   │   │   ├── api/           # Auth API calls
│   │   │   ├── composables/   # useLoginForm, useRegisterForm
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── auth.routes.ts
│   │   ├── home/              # Dashboard home
│   │   ├── products/          # Products module
│   │   │   ├── components/    # ProductsFilterForm
│   │   │   ├── composables/   # useProductsFields
│   │   │   ├── Index.vue
│   │   │   └── products.routes.ts
│   │   ├── suppliers/         # Suppliers module
│   │   │   ├── composables/   # useSuppliersFields
│   │   │   ├── Index.vue
│   │   │   └── suppliers.routes.ts
│   │   └── index.routes.ts    # Main admin routes
│   │
│   ├── plugins/               # Vue plugins
│   │   ├── i18n.ts
│   │   ├── toast.ts
│   │   └── index.ts           # PrimeVue, i18n, Toast registration
│   │
│   ├── router/
│   │   └── index.ts           # Vue Router configuration
│   │
│   ├── store/                 # Pinia stores
│   │   ├── auth.ts            # Auth state (token, user, logout)
│   │   └── theme.ts           # Light/dark theme
│   │
│   ├── types/                 # TypeScript types
│   │   ├── global.ts          # API response types, Pinia extensions
│   │   ├── FormComponents.ts
│   │   └── UserData.ts
│   │
│   ├── utils/                 # Utility functions
│   │   └── index.ts           # changeDateFormat, timeConvert, formateNumbers
│   │
│   ├── App.vue
│   ├── main.ts                # App entry point
│   ├── InterceptorHelper.ts   # HTTP interceptor (auth, errors, API base URL)
│   ├── NotFound.vue
│   └── types.d.ts
│
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.ts
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Structure_Vue

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Runs the app at `http://localhost:5173` (or the next available port).

### Build

```bash
npm run build
```

Outputs to `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## Environment Variables

Create a `.env` file in the project root:

| Variable | Description |
|----------|-------------|
| `VITE_APP_API_URL` | Base URL for the backend API (e.g., `https://api.example.com/`) |

Example:

```env
VITE_APP_API_URL=https://your-api.com/
```

---

## Architecture

### Application Flow

1. **Entry Point** (`main.ts`) — Registers Vue Query, Pinia, Router, and global plugins (PrimeVue, i18n, Toast).
2. **Router** — Splits routes into admin (dashboard) and auth layouts.
3. **Layouts** — `auth` for login/register, `dashboard` for authenticated pages with sidebar and navbar.
4. **Modules** — Each feature (auth, products, suppliers) is self-contained with its own routes, composables, and components.

### Key Patterns

- **Composition API** — All components use `<script setup>` and composables.
- **Feature-based modules** — Logic grouped by domain (auth, products, suppliers).
- **Centralized API** — `InterceptorHelper` handles all HTTP requests with auth headers and error toasts.
- **TanStack Query** — Server state managed via `useFetch` and `useMutate` composables.

---

## Features

### MainDataTable Component

A reusable data table with:

- **API mode** — Fetches data from `listUrl` with pagination, search, and sorting
- **Filter slot** — Custom filter forms via `#filters` slot
- **Action slot** — Per-row actions via `#actions` slot
- **Column slots** — Custom cell rendering via `#columnKey` slots (e.g., `#status`, `#company_image`)
- **Column config** — `key`, `label`, `type` (date, rounded-char), `sortable`, `hasTooltip`

### Form Components

- `InputTextField`, `InputPasswordField`
- `SelectBox`, `DatePickerField`, `CheckBoxField`
- `SearchInput`, `ToggleSwitchButton`

### Theme Store

- Light/dark mode toggle
- Persists to `localStorage`
- Falls back to system preference (`prefers-color-scheme`)

---

## Routing

| Path | Name | Layout | Description |
|------|------|--------|-------------|
| `/` | — | — | Redirects to `/admin-panel` |
| `/admin-panel` | admin-panel | dashboard | Dashboard home |
| `/admin-panel/products` | products | dashboard | Products list (requires auth) |
| `/admin-panel/suppliers` | suppliers | dashboard | Suppliers list (requires auth) |
| `/auth/login` | auth-login | auth | Login page |
| `/auth/register` | auth-register | auth | Register page |
| `*` | NotFound | — | 404 page |

---

## State Management

### Auth Store (`store/auth.ts`)

- `token` — JWT stored in localStorage
- `userData` — Logged-in user info
- `isAuthenticated` — Boolean
- Actions: `setToken`, `setUserData`, `logout`, `clearAuth`

### Theme Store (`store/theme.ts`)

- `currentTheme` — `'light' | 'dark'`
- Actions: `setTheme`, `toggleTheme`
- Uses `document.documentElement.className` for PrimeVue dark mode

---

## API Integration

### InterceptorHelper

Located in `src/InterceptorHelper.ts`:

- **Base URL** — From `VITE_APP_API_URL`
- **Request** — Adds `Authorization: Bearer <token>`, `Content-Type`, `Accept`, `lang` headers
- **Response** — Parses JSON, shows error toasts on failure, rejects on non-2xx
- **Method** — `intercept<T>(url, options?, queryParams?)` for standard requests

### Expected API Response Shape

For list endpoints (e.g., products, suppliers):

```json
{
  "data": [...],
  "pagination": {
    "total": 100,
    "last_page": 10,
    "has_more_pages": true
  }
}
```

Query params sent: `page`, `per_page`, `search`, `ordering`, plus any `urlParams` from the component.

---

## Internationalization (i18n)

- **Locales** — English (`en`), Arabic (`ar`)
- **Storage** — Selected locale in `localStorage` under `locale`
- **Usage** — `$t('key')` or `t('key')` from `useLocaleSettings()`
- **Translation files** — `src/locales/en.json`, `src/locales/ar.json`

Keys cover: fields, validations, buttons, auth, sidebar, status, pagination, etc.

---

## Styling

- **Tailwind CSS** — Utility-first styling with custom colors (primary, neural, gray, status)
- **SCSS** — Variables, PrimeVue overrides, table styles, fonts
- **Fonts** — Lexend (Latin), Cairo (Arabic)
- **Dark mode** — Via `.dark` class on `document.documentElement`

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (`vue-tsc -b && vite build`) |
| `npm run preview` | Preview production build |

---

## License

Private project.
