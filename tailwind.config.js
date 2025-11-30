/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        // Canvas backgrounds
        canvas: {
          DEFAULT: '#f5f7fb',
          from: '#f9fafb',
          to: '#eef2ff',
        },
        // Glass surfaces
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.85)',
          border: 'rgba(255, 255, 255, 0.95)',
          hover: 'rgba(255, 255, 255, 0.92)',
        },
        // Text colors
        ink: {
          primary: '#0f172a',
          secondary: '#475569',
          muted: '#64748b',
        },
        // Accent colors
        accent: {
          primary: '#2563eb',
          israel: '#dc2626',
        },
        // Legacy (for backward compatibility during migration)
        'israel-relevant': '#dc2626',
        'other-coverage': '#9ca3af',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(15, 23, 42, 0.06), 0 2px 8px rgba(15, 23, 42, 0.04)',
        'glass-hover': '0 12px 40px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.06)',
        'glass-lg': '0 20px 48px rgba(15, 23, 42, 0.1)',
      },
      backdropBlur: {
        glass: '16px',
      },
    },
  },
  plugins: [],
}

