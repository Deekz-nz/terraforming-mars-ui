import { Flex, Grid, rem, Text } from "@mantine/core";
import { GridTile } from "./GridTile";
import { useState } from "react";
import { TopControlBar } from "./TopControlBar";
import { notifications } from "@mantine/notifications";
import { IconX, IconCheck } from '@tabler/icons-react';
import { modals } from "@mantine/modals";

export function MainGrid() {
  const [terraformRating, setTerraformRating] = useState<number>(20);

  const [credit, setCredit] = useState<number>(0);
  const [creditProduction, setCreditProduction] = useState<number>(0);

  const [steel, setSteel] = useState<number>(0);
  const [steelProduction, setSteelProduction] = useState<number>(0);

  const [titanium, setTitanium] = useState<number>(0);
  const [titaniumProduction, setTitaniumProduction] = useState<number>(0);

  const [plants, setPlants] = useState<number>(0);
  const [plantsProduction, setPlantsProduction] = useState<number>(0);

  const [power, setPower] = useState<number>(0);
  const [powerProduction, setPowerProduction] = useState<number>(0);

  const [heat, setHeat] = useState<number>(0);
  const [heatProduction, setHeatProduction] = useState<number>(0);

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
    setCredit(0);
    setCreditProduction(0);

    setSteel(0);
    setSteelProduction(0);

    setTitanium(0);
    setTitaniumProduction(0);

    setPlants(0);
    setPlantsProduction(0);

    setPower(0);
    setPowerProduction(0);

    setHeat(0);
    setHeatProduction(0);

    setTerraformRating(20);
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
    setCredit(credit + creditProduction + terraformRating);
    setSteel(steel + steelProduction);
    setTitanium(titanium + titaniumProduction);
    setPlants(plants + plantsProduction);
    
    // Heat production is current heat + current power + heat production
    // Power is set to the level of production

    setHeat(heat + power + heatProduction);
    setPower(powerProduction);

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
    if (plants > 7) {
      setPlants(plants - 8);
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
        message: 'You need at least 8 plants to place a greenery tile.',
        icon: xIcon,
        color: "red"
      })
    }
  }

  const raiseTemperature = () => {
    if (heat > 7) {
      setHeat(heat - 8);
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
        message: 'You need at least 8 heat to raise the temperature',
        icon: xIcon,
        color: "red"
      })
    }
  }

  const playCard = () => {
    modals.openContextModal({
      modal: 'playCardModal',
      title: 'OUTER TITLE',
      innerProps: {
        credit: credit,
        steel: steel,
        titanium: titanium,
        payForCard: payForCard
      },
    })
  }

  const payForCard = (cardCredit: number, cardSteel: number, cardTitanium: number) => {
    if (cardCredit > 0) setCredit(credit - cardCredit);
    setSteel(steel - cardSteel);
    setTitanium(titanium - cardTitanium);

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

  return (
    <Flex direction="column" style={{ width: "100%", height: "100%" }}>
      <TopControlBar 
        imageUrl="images/TR.png" 
        value={terraformRating}
        setValue={setTerraformRating}
        resetFunction={confirmResetModal}
        claimProductionFunction={confirmProductionModal}
        greeneryFunction={placeGreenery}
        raiseTemperatureFunction={raiseTemperature}
        playCardFunction={playCard}
      />
      <Grid style={{ width: "100%", height: "100%" }}>
        <Grid.Col span={4}>
          <GridTile
            title="Credits"
            height="50%"
            width="100%"
            value={credit}
            setValue={setCredit}
            productionValue={creditProduction}
            setProductionValue={setCreditProduction}
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
            setValue={setSteel}
            productionValue={steelProduction}
            setProductionValue={setSteelProduction}
            imageUrl={"images/steel.png"}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <GridTile
            title="Titanium"
            height="50%"
            width="100%"
            value={titanium}
            setValue={setTitanium}
            productionValue={titaniumProduction}
            setProductionValue={setTitaniumProduction}
            imageUrl={"images/titanium.png"}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <GridTile
            title="Plants"
            height="50%"
            width="100%"
            value={plants}
            setValue={setPlants}
            productionValue={plantsProduction}
            setProductionValue={setPlantsProduction}
            imageUrl={"images/plant.png"}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <GridTile
            title="Power"
            height="50%"
            width="100%"
            value={power}
            setValue={setPower}
            productionValue={powerProduction}
            setProductionValue={setPowerProduction}
            imageUrl={"images/power.png"}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <GridTile
            title="Heat"
            height="50%"
            width="100%"
            value={heat}
            setValue={setHeat}
            productionValue={heatProduction}
            setProductionValue={setHeatProduction}
            imageUrl={"images/heat.png"}
          />
        </Grid.Col>
      </Grid>
    </Flex>
  );
}
