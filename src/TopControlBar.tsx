import { Button, Flex, Grid, Image, Text } from "@mantine/core";

interface TopControlBarProps{
  imageUrl: string;
  value: number;
  setValue: (val: number) => void;
  resetFunction: () => void;
  claimProductionFunction: () => void;
  greeneryFunction: () => void;
  raiseTemperatureFunction: () => void;
  playCardFunction: () => void;
  buyCardsFunction: () => void;
}

export function TopControlBar(props: TopControlBarProps) {
  const modifyTerraformRating = (delta: number) => {
    props.setValue(props.value + delta);
  }
  return (
    <Flex p={10} w="100%" justify="space-between" align="center">
      <Grid w="100%">
        <Grid.Col span={2.5}>
          <Flex align="center" w="450px" justify="space-between">
            <Image w={100} h={100} src={props.imageUrl}/>
            <Text size="60px">{props.value}</Text>
            <Button size="lg" w="100px" onClick={() => modifyTerraformRating(-1)}>
              -1
            </Button>
            <Button size="lg" w="100px" onClick={() => modifyTerraformRating(1)}>
              +1
            </Button>
          </Flex>
        </Grid.Col>
        <Grid.Col span={7}>
          <Flex align="center" h="100%" justify="center" gap={10}>
            <Button size="lg" onClick={() => props.playCardFunction()}>
              Play Card
            </Button>
            <Button size="lg" onClick={() => props.greeneryFunction()}>
              Place Greenery
            </Button>
            <Button size="lg" onClick={() => props.raiseTemperatureFunction()}>
              Raise Temperature
            </Button>
            <Button size="lg" onClick={() => props.buyCardsFunction()}>
              Buy Card(s)
            </Button>
          </Flex>

        </Grid.Col>
        <Grid.Col span={2.5}>
          <Flex align="center" h="100%" justify="center" gap={10}>
            <Button size="lg" onClick={() => props.claimProductionFunction()}>
              Claim Production
            </Button>
            <Button size="lg" onClick={() => props.resetFunction()}>
              RESET
            </Button>
          </Flex>
        </Grid.Col>
      </Grid>
    </Flex>
  )
}