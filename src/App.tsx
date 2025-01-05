import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { MainGrid } from "./MainGrid";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <MainGrid/>
    </MantineProvider>);
}
