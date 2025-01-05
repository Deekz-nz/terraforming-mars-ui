import { Drawer, Flex, Title, Text, Button } from "@mantine/core";
import { useResourceStore } from "./useResourceStore";

interface SettingsDrawerProps {
  settingsOpened: boolean;
  closeSettings: () => void;
}

export function SettingsDrawer(props: SettingsDrawerProps) {
    const {
      creditPerSteel,
      creditPerTitanium,
      plantPerGreenery,
      heatPerTemperature,
      setResource,
  } = useResourceStore();

  return (
    <Drawer opened={props.settingsOpened} onClose={props.closeSettings} position="right">
      <Flex direction="column" w="100%" gap={30}>
      <Title>
        Advanced Settings
      </Title>
      <Flex justify="space-between" w="100%" align="center">
        <Text size="xl">
          Credits per steel
        </Text>
        <Flex align="center" gap={30}>
          <Button size="xl" disabled={creditPerSteel === 0} onClick={() => setResource("creditPerSteel", creditPerSteel-1)}>-</Button>
          <Text size="xl">{creditPerSteel}</Text>
          <Button size="xl" onClick={() => setResource("creditPerSteel", creditPerSteel+1)}>+</Button>
        </Flex>
      </Flex>
      <Flex justify="space-between" w="100%" align="center">
        <Text size="xl">
          Credits per titanium
        </Text>
        <Flex align="center" gap={30}>
          <Button size="xl" disabled={creditPerTitanium === 0} onClick={() => setResource("creditPerTitanium", creditPerTitanium-1)}>-</Button>
          <Text size="xl">{creditPerTitanium}</Text>
          <Button size="xl" onClick={() => setResource("creditPerTitanium", creditPerTitanium+1)}>+</Button>
        </Flex>
      </Flex>
      <Flex justify="space-between" w="100%" align="center">
        <Text size="xl">
          Plants per greenery
        </Text>
        <Flex align="center" gap={30}>
          <Button size="xl" disabled={plantPerGreenery === 0} onClick={() => setResource("plantPerGreenery", plantPerGreenery-1)}>-</Button>
          <Text size="xl">{plantPerGreenery}</Text>
          <Button size="xl" onClick={() => setResource("plantPerGreenery", plantPerGreenery+1)}>+</Button>
        </Flex>
      </Flex>
      <Flex justify="space-between" w="100%" align="center">
        <Text size="xl">
          Heat per temp
        </Text>
        <Flex align="center" gap={30}>
          <Button size="xl" disabled={heatPerTemperature === 0} onClick={() => setResource("heatPerTemperature", heatPerTemperature-1)}>-</Button>
          <Text size="xl">{heatPerTemperature}</Text>
          <Button size="xl" onClick={() => setResource("heatPerTemperature", heatPerTemperature+1)}>+</Button>
        </Flex>
      </Flex>
      </Flex>
    </Drawer>
  )
}