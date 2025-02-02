import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme/theme";
import { StatementProvider } from "./presentation/context/StatementProvider";
import { FileProcessingContainer } from "./presentation/pages/FileProcessing/FileProcessingContainer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StatementProvider>
        <FileProcessingContainer />
      </StatementProvider>
    </ThemeProvider>
  );
}

export default App;
