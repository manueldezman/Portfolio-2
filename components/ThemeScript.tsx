export function ThemeScript() {
  const code = `
    (function () {
      try {
        var storedTheme = window.localStorage.getItem("theme");
        var systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        var theme = storedTheme || systemTheme;
        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;
      } catch (error) {
        document.documentElement.dataset.theme = "light";
        document.documentElement.style.colorScheme = "light";
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
