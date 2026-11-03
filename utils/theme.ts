export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'

// Inlined in <head> so the theme is applied before the first paint (no flash).
// Saved choice wins; otherwise follow the browser, falling back to light.
// Without a saved choice it also follows browser theme changes live.
export const themeScript = `(function () {
  try {
    var root = document.documentElement
    var media = window.matchMedia('(prefers-color-scheme: dark)')
    var saved = function () { return localStorage.getItem('${THEME_STORAGE_KEY}') }
    var apply = function () {
      var theme = saved()
      root.classList.toggle('dark', theme ? theme === 'dark' : media.matches)
    }
    apply()
    media.addEventListener('change', function () { if (!saved()) apply() })
  } catch (e) {}
})()`

export const setTheme = (theme: Theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Storage blocked (private mode): the theme still applies until reload
  }
}
