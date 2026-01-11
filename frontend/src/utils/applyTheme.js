// utils/applyTheme.js
export const applyTheme = (theme) => {
  const root = document.documentElement;

  Object.keys(theme).forEach(key => {
    const cssVar = `--${key.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}`;
    root.style.setProperty(cssVar, theme[key]);
  });
};
