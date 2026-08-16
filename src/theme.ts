import { useSyncExternalStore } from 'react'

/**
 * Tiny theme store: the html.dark class is the single source of truth
 * (set before first paint by the inline script in index.html), so React
 * state can never desync from what's painted.
 */

export type Theme = 'light' | 'dark'

const listeners = new Set<() => void>()

export function getTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function setTheme(t: Theme) {
  localStorage.setItem('theme', t)
  document.documentElement.classList.toggle('dark', t === 'dark')
  listeners.forEach((l) => l())
}

export function useTheme(): Theme {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    getTheme,
    () => 'light',
  )
}
