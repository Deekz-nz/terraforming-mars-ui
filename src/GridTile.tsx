import { Button, Divider, Flex, Text, Title, Image, BackgroundImage } from "@mantine/core";

interface GridTileProps { 
  title: string;
  width: string | number;
  height: string | number;
  value: number;
  setValue: (val: number) => void;
  productionValue: number;
  setProductionValue: (val: number) => void;
  imageUrl: string;
  negativeProdAllowed?: boolean;
}
export function GridTile(props: GridTileProps) {

  const { negativeProdAllowed = false } = props;

  const modifyValue = (delta: number) => {
    props.setValue(props.value + delta)
  }

  const modifyProductionValue = (delta: number) => {
    props.setProductionValue(props.productionValue + delta);
  }
  return (
    <Flex direction="column" align="center" style={{width: props.width}} gap={10}>
      <Image w={100} h={100} src={props.imageUrl} />
      <Text size="60px">{props.value}</Text>
      <Flex gap={10}>
        <Button size="lg" w="100px" onClick={() => modifyValue(1)}>
          +1
        </Button>
        <Button size="lg" w="100px" onClick={() => modifyValue(5)}>
          +5
        </Button>
        <Button size="lg" w="100px" onClick={() => modifyValue(10)}>
          +10
        </Button>
      </Flex>
      <Flex gap={10}>
        <Button size="lg" w="100px" onClick={() => modifyValue(-1)} disabled={props.value < 1}>
          -1
        </Button>
        <Button size="lg" w="100px" onClick={() => modifyValue(-5)} disabled={props.value < 5}>
          -5
        </Button>
        <Button size="lg" w="100px" onClick={() => modifyValue(-10)} disabled={props.value < 10}>
          -10
        </Button>
      </Flex>
      <Divider size="md" w="100%"/>
      <Flex w="100%" p={20} pt={0} pb={0}>
        <BackgroundImage
          src="images/production_bg.png"
          radius="sm"
          w="100%"
        >
          <Flex direction="column" gap={10} align="center" w="100%" p={5}>
            <Text size="40px">{props.productionValue}</Text>
            <Button size="lg" w="200px" onClick={() => modifyProductionValue(1)}>
              +1 Prod
            </Button>
            <Button size="lg" w="200px" onClick={() => modifyProductionValue(-1)} disabled={negativeProdAllowed ? false : props.productionValue < 1}>
              -1 Prod
            </Button>
          </Flex>
        </BackgroundImage>
      </Flex>
    </Flex>
  )
}