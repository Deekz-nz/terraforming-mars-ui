import { Button, Divider, Flex, Text, Title } from "@mantine/core";

interface GridTileProps { 
  title: string;
  width: string | number;
  height: string | number;
  value: number;
  setValue: (val: number) => void;
  productionValue: number;
  setProductionValue: (val: number) => void;
}
export function GridTile(props: GridTileProps) {

  const modifyValue = (delta: number) => {
    props.setValue(props.value + delta)
  }
  return (
    <Flex direction="column" align="center" style={{width: props.width}} gap={10}>
      <Title>{props.title}</Title>
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
      <Divider my="md" size="md" w="100%"/>
      <Text size="40px">{props.productionValue}</Text>
      <Button size="lg" w="200px">
        +1 Prod
      </Button>
      <Button size="lg" w="200px">
        -1 Prod
      </Button>
    </Flex>
  )
}