import { Button, Divider, Flex, Text, Image, BackgroundImage } from "@mantine/core";
import { animate } from "framer-motion";
import { useRef, useEffect } from "react";

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
  
  const valueRef = useRef<HTMLDivElement>(null);
  const previousValueRef = useRef<number>(props.value);

  useEffect(() => {
    if (!valueRef.current) return;

    const fromValue = previousValueRef.current;
    const toValue = props.value;
    previousValueRef.current = props.value;

    animate(fromValue, toValue, {
      duration: 0.2,
      onUpdate: (currentValue) => {
        valueRef.current!.textContent = Math.round(currentValue).toString();
      }
    });
  }, [props.value]);

  const modifyValue = (delta: number) => {
    props.setValue(props.value + delta);
  }

  const modifyProductionValue = (delta: number) => {
    props.setProductionValue(props.productionValue + delta);
  }

  return (
    <Flex direction="column" align="center" gap={10} style={{ width: props.width }}>
      <Flex align="center" gap={10} w={150} justify="space-between">
        <Image w={100} h={100} src={props.imageUrl} />
        
        {/* Animated Counter using a ref and framer-motion's animate */}
        <Text size="60px">
          <div ref={valueRef}>{props.value}</div>
        </Text>
      </Flex>

      <Flex gap={10}>
        <Button size="lg" w="100px" onClick={() => modifyValue(1)}>+1</Button>
        <Button size="lg" w="100px" onClick={() => modifyValue(5)}>+5</Button>
        <Button size="lg" w="100px" onClick={() => modifyValue(10)}>+10</Button>
      </Flex>
      <Flex gap={10}>
        <Button size="lg" w="100px" onClick={() => modifyValue(-1)} disabled={props.value < 1}>-1</Button>
        <Button size="lg" w="100px" onClick={() => modifyValue(-5)} disabled={props.value < 5}>-5</Button>
        <Button size="lg" w="100px" onClick={() => modifyValue(-10)} disabled={props.value < 10}>-10</Button>
      </Flex>
      <Divider size="md" w="100%"/>
      <Flex w="100%" p={20} pt={0} pb={0}>
        <BackgroundImage src="images/production_bg.png" radius="sm" w="100%">
          <Flex direction="column" gap={10} align="center" w="100%" p={5}>
            <Text size="40px">{props.productionValue}</Text>
            <Flex gap={10}>
              <Button size="lg" w="100px" onClick={() => modifyProductionValue(-1)} disabled={!negativeProdAllowed && props.productionValue < 1}>-1</Button>
              <Button size="lg" w="100px" onClick={() => modifyProductionValue(1)}>+1</Button>
            </Flex>
          </Flex>
        </BackgroundImage>
      </Flex>
    </Flex>
  )
}
