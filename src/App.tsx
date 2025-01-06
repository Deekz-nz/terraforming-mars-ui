import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { MainGrid } from "./MainGrid";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { PlayCardModal } from "./PlayCardModal";
import { BuyCardsModal } from "./BuyCardsModal";

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark" forceColorScheme="dark">
      <ModalsProvider
         modals={{ 
          playCardModal: PlayCardModal,
          buyCardModal: BuyCardsModal,

          }}
      >
        <Notifications />
        <MainGrid/>
      </ModalsProvider>
    </MantineProvider>);
}
