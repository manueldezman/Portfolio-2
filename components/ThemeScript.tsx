export function ThemeScript() {
  const code = `
    (function () {
      try {
        var storedTheme = window.localStorage.getItem("theme");
        var theme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : "dark";
        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;
      } catch (error) {
        document.documentElement.dataset.theme = "dark";
        document.documentElement.style.colorScheme = "dark";
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
