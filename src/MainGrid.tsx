import { Flex, Grid, rem, Text } from "@mantine/core";
import { GridTile } from "./GridTile";
import { TopControlBar } from "./TopControlBar";
import { notifications } from "@mantine/notifications";
import { IconX, IconCheck } from '@tabler/icons-react';
import { modals } from "@mantine/modals";
import { useResourceStore } from "./useResourceStore";
import { useDisclosure } from "@mantine/hooks";
import { SettingsDrawer } from "./SettingsDrawer";

export function MainGrid() {
  const {
    terraformRating,
    credit,
    creditProduction,
    steel,
    steelProduction,
    titanium,
    titaniumProduction,
    plants,
    plantsProduction,
    power,
    powerProduction,
    heat,
    heatProduction,
    plantPerGreenery,
    heatPerTemperature,
    setResource,
} = useResourceStore();
const [settingsOpened, { open: openSettings, close: closeSettings }] = useDisclosure(false);

  const confirmResetModal = () => modals.openConfirmModal({
    title: 'Are you sure you want to reset the board?',
    children: (
      <Text size="sm">
        This action is irreversible. Are you sure you want to reset everything back to the default?
      </Text>
    ),
    labels: { confirm: 'RESET TO DEFAULT', cancel: 'Cancel' },
    confirmProps: { color: 'red' },
    onConfirm: () => resetAll(),
  });
  const resetAll = () => {
    setResource('terraformRating', 20);
    setResource('credit', 0);
    setResource('creditProduction', 0);
    setResource('steel', 0);
    setResource('steelProduction', 0);
    setResource('titanium', 0);
    setResource('titaniumProduction', 0);
    setResource('plants', 0);
    setResource('plantsProduction', 0);
    setResource('power', 0);
    setResource('powerProduction', 0);
    setResource('heat', 0);
    setResource('heatProduction', 0);
    setResource('creditPerCard', 3);
    setResource('creditPerSteel', 2);
    setResource('creditPerTitanium', 3);
    setResource('heatPerTemperature', 8);
    setResource('plantPerGreenery', 8);
  }

  const confirmProductionModal = () => modals.openConfirmModal({
    title: 'Are you sure you want to claim your production?',
    children: (
      <Text size="sm">
        This will add your production to your current values, and move your energy to your heat. Are you sure?
      </Text>
    ),
    labels: { confirm: 'Claim Production', cancel: 'Cancel' },
    onConfirm: () => claimProduction(),
  });

  const claimProduction = () => {
    // Credit production also includes current terraform rating
    setResource('credit', credit + creditProduction + terraformRating);
    setResource('steel', steel + steelProduction);
    setResource('titanium', titanium + titaniumProduction);
    setResource('plants', plants + plantsProduction);
    
    // Heat production is current heat + current power + heat production
    // Power is set to the level of production

    setResource('heat', heat + power + heatProduction);
    setResource('power', powerProduction);

    notifications.show({
      title: 'Success!',
      message: 'You have claimed all of your production!',
      icon: checkIcon,
      color: "green",
      position: "bottom-right",
      autoClose: 3000,
    })
  }

  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  const placeGreenery = () => {
    if (plants > plantPerGreenery) {
      setResource('plants', plants - plantPerGreenery);
      notifications.show({
        title: 'Success!',
        message: 'You can now place a greenery tile.',
        icon: checkIcon,
        color: "green",
        position: "bottom-right",
        autoClose: 3000,
      })
    } else {
      notifications.show({
        title: 'Not enough plants!',
        message: `You need at least ${plantPerGreenery} plants to place a greenery tile.`,
        icon: xIcon,
        color: "red"
      })
    }
  }

  const raiseTemperature = () => {
    if (heat > heatPerTemperature) {
      setResource('heat', heat - heatPerTemperature);
      notifications.show({
        title: 'Success!',
        message: 'You can now raise the temperature.',
        icon: checkIcon,
        color: "green",
        position: "bottom-right",
        autoClose: 3000,
      })
    } else {
      notifications.show({
        title: 'Not enough heat!',
        message: `You need at least ${heatPerTemperature} heat to raise the temperature`,
        icon: xIcon,
        color: "red"
      })
    }
  }

  const playCard = () => {
    modals.openContextModal({
      modal: 'playCardModal',
      title: 'Play a card',
      innerProps: {
        payForCard: payForCard
      },
    })
  }

  const payForCard = (cardCredit: number, cardSteel: number, cardTitanium: number) => {
    if (cardCredit > 0) setResource('credit', credit - cardCredit);
    setResource('steel', steel - cardSteel);
    setResource('titanium', titanium - cardTitanium);

    const resourcesUsed = [
        cardCredit > 0 ? `${cardCredit} credits` : null,
        cardSteel > 0 ? `${cardSteel} steel` : null,
        cardTitanium > 0 ? `${cardTitanium} titanium` : null
    ].filter(Boolean);

    const formattedResources = resourcesUsed.length > 1
        ? resourcesUsed.slice(0, -1).join(", ") + " and " + resourcesUsed.slice(-1)
        : resourcesUsed[0] || "";

    notifications.show({
        title: 'Success!',
        message: `You paid for a card using ${formattedResources}.`,
        icon: checkIcon,
        color: "green",
        position: "bottom-right",
        autoClose: 3000,
    });
  }

  const buyCards = () => {
    modals.openContextModal({
      modal: 'buyCardModal',
      title: 'Buy cards',
      innerProps: {},
    })
  }

  return (
    <Flex direction="column" style={{ width: "100%", height: "100%" }}>
      <SettingsDrawer settingsOpened={settingsOpened} closeSettings={closeSettings} />
      <TopControlBar 
        imageUrl="images/TR.png" 
        value={terraformRating}
        setValue={(value: number) => setResource('terraformRating', value)}
        resetFunction={confirmResetModal}
        claimProductionFunction={confirmProductionModal}
        greeneryFunction={placeGreenery}
        raiseTemperatureFunction={raiseTemperature}
        playCardFunction={playCard}
        buyCardsFunction={buyCards}
        openSettings={openSettings}
      />
      <Grid style={{ width: "100%", height: "100%" }}>
        <Grid.Col span={4}>
          <GridTile
            title="Credits"
            height="50%"
            width="100%"
            value={credit}
            setValue={(value: number) => setResource('credit', value)}
            productionValue={creditProduction}
            setProductionValue={(value: number) => setResource('creditProduction', value)}
            imageUrl={"images/megacredit.png"}
            negativeProdAllowed={true}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <GridTile
            title="Steel"
            height="50%"
            width="100%"
            value={steel}
            setValue={(value: number) => setResource('steel', value)}
            productionValue={steelProduction}
            setProductionValue={(value: number) => setResource('steelProduction', value)}
            imageUrl={"images/steel.png"}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <GridTile
            title="Titanium"
            height="50%"
            width="100%"
            value={titanium}
            setValue={(value: number) => setResource('titanium', value)}
            productionValue={titaniumProduction}
            setProductionValue={(value: number) => setResource('titaniumProduction', value)}
            imageUrl={"images/titanium.png"}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <GridTile
            title="Plants"
            height="50%"
            width="100%"
            value={plants}
            setValue={(value: number) => setResource('plants', value)}
            productionValue={plantsProduction}
            setProductionValue={(value: number) => setResource('plantsProduction', value)}
            imageUrl={"images/plant.png"}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <GridTile
            title="Power"
            height="50%"
            width="100%"
            value={power}
            setValue={(value: number) => setResource('power', value)}
            productionValue={powerProduction}
            setProductionValue={(value: number) => setResource('powerProduction', value)}
            imageUrl={"images/power.png"}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <GridTile
            title="Heat"
            height="50%"
            width="100%"
            value={heat}
            setValue={(value: number) => setResource('heat', value)}
            productionValue={heatProduction}
            setProductionValue={(value: number) => setResource('heatProduction', value)}
            imageUrl={"images/heat.png"}
          />
        </Grid.Col>
      </Grid>
    </Flex>
  );
}
