import { Button, Flex, Grid, Text, Title } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { useState } from "react";

export const PlayCardModal = ({ context, id: modalId, innerProps }: ContextModalProps<{ 
  credit: number,
  steel: number,
  titanium: number,
  payForCard: (credit: number, selectedSteel: number, selectedTitanium: number) => void
}>) => {
  const [enteredValue, setEnteredValue] = useState<number>(0);

  const closeModal = () => {
    context.closeModal(modalId);
  };

  const handleNumberClick = (num: number) => {
    setEnteredValue((prev) => prev !== 0 ? Number(`${prev}${num}`) : num);
  };

  const handleClear = () => {
    setEnteredValue(0);
  };

  const [selectedSteel, setSelectedSteel] = useState<number>(0);

  const modifySelectedSteel = (delta: number) => {
    setSelectedSteel(selectedSteel + delta);
  }

  const [selectedTitanium, setSelectedTitanium] = useState<number>(0);

  const modifySelectedTitanium = (delta: number) => {
    setSelectedTitanium(selectedTitanium + delta);
  }

  const calculateFinalCreditCost = () => {
    return enteredValue - 2 * selectedSteel - 3* selectedTitanium
  }

  const confirmPlayCard = () => {
    innerProps.payForCard(calculateFinalCreditCost(), selectedSteel, selectedTitanium)
    closeModal();
  }
  return (
    <Flex direction="column" gap="md">
      <Title>Enter card cost</Title>
      <Text size="xl">Entered Value: {enteredValue !== null ? enteredValue : 0}</Text>
      <Grid gutter="xs">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Grid.Col key={num} span={4}>
            <Button fullWidth h={"100px"} size="xl" onClick={() => handleNumberClick(num)}>{num}</Button>
          </Grid.Col>
        ))}
        <Grid.Col span={4}></Grid.Col>
        <Grid.Col span={4}>
          <Button fullWidth h={"100px"} size="xl" onClick={() => handleNumberClick(0)}>0</Button>
        </Grid.Col>
        <Grid.Col span={4}>
          <Button fullWidth h={"100px"} size="xl" onClick={handleClear}>CLEAR</Button>
        </Grid.Col>
      </Grid>
      <Flex justify="space-between" w="100%" align="center">
        <Text size="xl">Use steel?</Text>
        <Flex align="center" gap={10}>
          <Button size="lg" onClick={() => {modifySelectedSteel(-1)}} disabled={selectedSteel === 0}>
            -
          </Button>
          <Text size="xl">{selectedSteel} / {innerProps.steel}</Text>
          <Button size="lg" onClick={() => {modifySelectedSteel(1)}} disabled={selectedSteel >= innerProps.steel}>
            +
          </Button>
        </Flex>
      </Flex>
      
      <Flex justify="space-between" w="100%" align="center">
        <Text size="xl">Use titanium?</Text>
        <Flex align="center" gap={10}>
          <Button size="lg" onClick={() => {modifySelectedTitanium(-1)}} disabled={selectedTitanium === 0}>
            -
          </Button>
          <Text size="xl">{selectedTitanium} / {innerProps.titanium}</Text>
          <Button size="lg" onClick={() => {modifySelectedTitanium(1)}} disabled={selectedTitanium >= innerProps.titanium}>
            +
          </Button>
        </Flex>
      </Flex>

      <Flex justify="space-between" w="100%" align="center">
        <Text size="xl">Remainder (to be paid using credits):</Text>
        <Text size="xl">{calculateFinalCreditCost()}</Text>
      </Flex>

      {calculateFinalCreditCost() < 0 &&
        <Text c="red">Warning: You are overpaying!</Text>
      }

      <Flex justify="space-between">
        <Button size="lg" onClick={closeModal}>Cancel</Button>
        <Button size="lg" disabled={calculateFinalCreditCost() > innerProps.credit} onClick={() => confirmPlayCard()}>
          {calculateFinalCreditCost() > innerProps.credit ? "Not enough credits!" : "Play Card"}
        </Button>
      </Flex>
    </Flex>
  );
};
