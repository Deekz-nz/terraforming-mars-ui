import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { MainGrid } from "./MainGrid";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { PlayCardModal } from "./PlayCardModal";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <ModalsProvider
         modals={{ playCardModal: PlayCardModal /* ...other modals */ }}
      >
        <Notifications />
        <MainGrid/>
      </ModalsProvider>
    </MantineProvider>);
}
