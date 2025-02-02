import { render as rtlRender } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme/theme";

function render(ui: React.ReactElement, options = {}) {
  return rtlRender(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    ),
    ...options,
  });
}

export { screen, fireEvent, waitFor } from "@testing-library/react";
export { render };
