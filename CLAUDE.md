# Daily News Brief - Web App

## Project Overview

**Name**: Daily News Brief Web App
**Type**: Real-time news aggregator with AI curation
**Status**: Visual redesign in progress (Phase 1 - Design System Foundation)

### High-Level Description

A web application that displays AI-curated news briefs with Israel-focused coverage from 15 international sources. The app provides real-time updates via Supabase WebSocket connections and supports three languages (Hebrew, Arabic, English) with proper RTL layout support.

**Current Goal**: Visual redesign using Aero glass design language while maintaining compatibility with existing backend.

---

## Tech Stack

### Frontend
- **Framework**: Nuxt 4 (Vue 3 Composition API + script setup)
- **Styling**: Tailwind CSS 3.x with custom design tokens
- **TypeScript**: Strict mode enabled
- **State**: Local component state + composables (no Pinia yet)
- **i18n**: @nuxtjs/i18n (being added in Phase 1)

### Backend
- **Database**: Supabase PostgreSQL
- **Real-time**: Supabase Realtime (WebSocket)
- **API**: Nuxt server API routes (SSR-compatible)
- **Deployment**: Vercel

### Dependencies (Allowed)
```json
{
  "@nuxtjs/tailwindcss": "^6.14.0",
  "@supabase/supabase-js": "^2.84.0",
  "@vueuse/nuxt": "^14.0.0",
  "@nuxtjs/i18n": "latest",
  "nuxt": "^4.2.1",
  "vue": "^3.5.24",
  "vue-router": "^4.6.3"
}
```

**Disallowed**:
- ❌ Heavy CSS-in-JS libraries (Emotion, styled-components)
- ❌ State management (Pinia) - not needed yet
- ❌ Component libraries (Vuetify, PrimeVue) - custom components only
- ❌ Animation libraries (GSAP, Framer Motion) - CSS transitions sufficient

---

## Directory Structure

```
news-webapp/
├── app/                              # Nuxt 4 app directory
│   ├── app.vue                       # Root component
│   ├── assets/
│   │   └── css/
│   │       └── main.css              # Global styles (being created)
│   ├── components/
│   │   ├── ArticleCard.vue           # Article display (being created)
│   │   ├── ArticleDrawer.vue         # Detail drawer (being created)
│   │   ├── ArticleSkeleton.vue       # Loading state (being created)
│   │   └── LanguageToggle.vue        # Language switcher (exists, updating)
│   ├── composables/
│   │   └── useRealtimeBrief.ts       # Real-time WebSocket hook (exists)
│   ├── locales/                      # i18n translations (being created)
│   │   ├── en.json
│   │   ├── he.json
│   │   └── ar.json
│   └── pages/
│       └── index.vue                 # Main page (exists, updating)
├── server/
│   ├── api/
│   │   └── brief/
│   │       └── latest.get.ts         # Main API endpoint (needs type cleanup)
│   └── utils/
│       └── supabase.ts               # Supabase client
├── types/
│   └── brief.ts                      # Shared TypeScript types (exists)
├── public/
│   └── favicon.svg
├── nuxt.config.ts                    # Nuxt configuration (updating)
├── tailwind.config.js                # Tailwind config (updating)
└── package.json
```

---

## Coding Style & Conventions

### Vue Components
- **Always use**: `<script setup lang="ts">` with Composition API
- **Props**: Define with TypeScript interfaces + `defineProps<Props>()`
- **Emits**: Define with TypeScript `defineEmits<Emits>()`
- **Computed**: Use `computed()` for derived state
- **Refs**: Use `ref()` for reactive state, `Ref<Type>` for typing

**Example Pattern**:
```vue
<script setup lang="ts">
import type { BriefArticle } from '~/types/brief'

interface Props {
  article: BriefArticle
  variant?: 'feature' | 'compact'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'compact'
})

const emit = defineEmits<{
  (e: 'click', article: BriefArticle): void
}>()

const { t } = useI18n()
</script>
```

### TypeScript
- **Strict mode**: Enabled
- **No `any`**: Use proper types or `unknown`
- **Imports**: Always use `type` imports for types: `import type { ... }`
- **Single source of truth**: All shared types in `types/brief.ts`
- **No inline types**: Never duplicate type definitions

### Styling
- **Tailwind first**: Use utility classes for all styling
- **Custom utilities**: Define in `@layer components` in main.css
- **No inline styles**: Use Tailwind or CSS classes
- **Responsive**: Mobile-first breakpoints (sm:, md:, lg:)
- **RTL-aware**: Use logical properties (padding-inline vs padding-left)

### i18n
- **All UI text**: Use `t('key')` from `useI18n()`
- **Pluralization**: `"{count} singular | {count} plural"`
- **No hardcoded strings**: Except for language names in LanguageToggle
- **Keys structure**: `section.subsection.key` (e.g., `article.sources`)

---

## Global Constraints

### Backend Compatibility
**CRITICAL**: The redesign must work with the current backend schema. No assumptions about fields that don't exist.

**What exists in DB**:
- `curated_articles`: id, unified_title, original_article_ids, article_count, rank_position, israel_relevant, target_language, curated_at
- `articles`: id, url, title, source, language, published_date, scraped_at

**What does NOT exist** (don't assume):
- ❌ summary
- ❌ category
- ❌ importance
- ❌ is_live
- ❌ reading_time_minutes

### RTL Support
- Hebrew and Arabic are RTL languages
- Use `dir` attribute on `<html>`: `dir="rtl"` or `dir="ltr"`
- Use logical CSS properties: `margin-inline-start` instead of `margin-left`
- Test thoroughly with Hebrew/Arabic content

### Real-time Updates
- **Don't break**: Real-time functionality via `useRealtimeBrief` must continue working
- **WebSocket**: Supabase Realtime listens for INSERT on `curated_articles`
- **Client-only**: Real-time composable only runs on client (`import.meta.server` guard)

### Accessibility
- **Keyboard navigation**: All interactive elements must be keyboard accessible
- **ARIA labels**: Use proper `role`, `aria-label`, `aria-modal` attributes
- **Focus management**: Trap focus in drawer, restore on close
- **Color contrast**: Meet WCAG AA standards (4.5:1 for text)

---

## Design System (Aero Glass)

### Color Tokens
```javascript
colors: {
  canvas: {
    DEFAULT: '#f5f7fb',
    from: '#f9fafb',
    to: '#eef2ff',
  },
  glass: {
    DEFAULT: 'rgba(255, 255, 255, 0.85)',
    border: 'rgba(255, 255, 255, 0.95)',
    hover: 'rgba(255, 255, 255, 0.92)',
  },
  ink: {
    primary: '#0f172a',
    secondary: '#475569',
    muted: '#64748b',
  },
  accent: {
    primary: '#2563eb',
    israel: '#dc2626',
  },
}
```

### Shadows
```javascript
boxShadow: {
  glass: '0 8px 32px rgba(15, 23, 42, 0.06), 0 2px 8px rgba(15, 23, 42, 0.04)',
  'glass-hover': '0 12px 40px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.06)',
  'glass-lg': '0 20px 48px rgba(15, 23, 42, 0.1)',
}
```

### Usage
- **Glass cards**: `.glass-card` utility class (defined in main.css)
- **Background**: Radial gradients on body
- **Backdrop blur**: `backdrop-blur-glass` (16px)

---

## Non-Goals (Not Doing)

### Feature Non-Goals
- ❌ Hero + Priority Stack layout → Requires backend changes
- ❌ Time-blocked streams → Flawed for batch curation model
- ❌ Category chips → No category field in DB
- ❌ Live indicators per article → No is_live field
- ❌ Reading time badges → Not calculated
- ❌ Filters (All/Israel/Region/World) → Deferred to v2
- ❌ /sources or /about pages → Out of scope

### Technical Non-Goals
- ❌ Backend changes → Working with current schema
- ❌ Database migrations → No new fields
- ❌ Authentication → Not needed for public news
- ❌ Analytics → Can add later
- ❌ Testing framework → Manual testing for now

---

## Overall Goals

### Visual Transformation ✅
1. Implement Aero glass design language
2. Translucent cards with backdrop blur
3. Soft radial gradients on background
4. Refined shadows with depth
5. Featured article treatment (first in each section)

### UX Improvements ✅
1. Article drawer for details
2. Loading skeletons (not spinner)
3. Better mobile experience
4. Smooth animations
5. Clear visual hierarchy

### Technical Improvements ✅
1. Type consolidation (no duplication)
2. UI internationalization (he/ar/en)
3. Better component structure
4. Accessibility (keyboard, ARIA)
5. Performance optimization

---

## Current Status

**Phase**: 1 (Design System Foundation)
**Started**: 2024-11-30

### Phase Progress
- [ ] Phase 1: Design System Foundation (Day 1)
  - [ ] Update Tailwind config with Aero tokens
  - [ ] Create global CSS with glass utilities
  - [ ] Consolidate types (remove inline definitions)
  - [ ] Install and configure @nuxtjs/i18n
  - [ ] Create translation files (en/he/ar)

- [ ] Phase 2: Core Components (Day 2)
- [ ] Phase 3: Layout & Main Page (Day 3)
- [ ] Phase 4: Polish & Refinements (Day 4)
- [ ] Phase 5: Testing & Cleanup (Day 5)

---

## Open Questions / Design Decisions

### Resolved ✅
- ✅ **Backend compatibility**: Confirmed working with current schema
- ✅ **Type duplication**: Will consolidate in Phase 1
- ✅ **i18n approach**: Using @nuxtjs/i18n module
- ✅ **Design system**: Aero glass with Tailwind tokens
- ✅ **Component structure**: Feature/compact variants for ArticleCard

### To Decide Later 🤔
- **Performance**: May need intersection observer for large article lists
- **Animations**: May need to reduce on `prefers-reduced-motion`
- **Bundle size**: Monitor after i18n module added
- **Browser support**: May need fallbacks for older Safari (backdrop-blur)

---

## Quick Reference

### Run Commands
```bash
npm run dev           # Development server
npm run build         # Production build
npm run preview       # Preview production build
npm install           # Install dependencies
```

### Environment Variables
```bash
SUPABASE_URL          # Supabase project URL
SUPABASE_ANON_KEY     # Supabase anonymous key
```

### Important Files
- **Main page**: `app/pages/index.vue`
- **Types**: `types/brief.ts`
- **API**: `server/api/brief/latest.get.ts`
- **Config**: `nuxt.config.ts`, `tailwind.config.js`
- **Real-time**: `app/composables/useRealtimeBrief.ts`

---

## Notes for Future Sessions

### If Real-time Breaks
Check `app/composables/useRealtimeBrief.ts` - it expects `Ref<Language>` as first argument.

### If Types Error
All types should import from `types/brief.ts`. No inline definitions in API or pages.

### If i18n Not Working
- Check `nuxt.config.ts` has `@nuxtjs/i18n` in modules
- Verify locale files exist in `locales/` directory
- Confirm keys match between usage (`t('key')`) and locale files

### If Glass Effects Don't Show
- Safari < 14 doesn't support `backdrop-blur`
- Can increase opacity of `.glass` color as fallback
- Check browser DevTools for CSS errors

---

**Last Updated**: 2024-11-30
**Plan Location**: `/Users/roi.maishar/.claude/plans/tingly-drifting-torvalds.md`
