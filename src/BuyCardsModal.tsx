import { Button, Flex, Title, Text, rem } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals"
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";

export const BuyCardsModal = ({ context, id: modalId, innerProps }: ContextModalProps<{ 
  credit: number,
  setCredit: (val: number) => void;
}>) => {

  const closeModal = () => {
    context.closeModal(modalId);
  };

  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  
  const buyCards = () => {
    innerProps.setCredit(innerProps.credit - cardNumber * 3);
    notifications.show({
        title: 'Success!',
        message: `You bought ${cardNumber} card(s).`,
        icon: checkIcon,
        color: "green",
        position: "bottom-right",
        autoClose: 3000,
    });
    closeModal();
  }

  const [ cardNumber, setCardNumber ] = useState<number>(0);
  return (
    <Flex direction="column" gap="md" align="center">
      <Title>How many cards?</Title>
      <Flex gap={30} align="center">
        <Button size="xl" disabled={cardNumber === 0} onClick={() => setCardNumber(cardNumber-1)}>-</Button>
        <Text size="xl">{cardNumber}</Text>
        <Button size="xl" onClick={() => setCardNumber(cardNumber+1)}>+</Button>
      </Flex>
      <Flex w="100%" justify="space-between">
        <Button size="lg" onClick={() => closeModal()}>Cancel</Button>
        <Button size="lg" disabled={cardNumber*3 > innerProps.credit || cardNumber === 0} onClick={() => buyCards()}>
          {cardNumber * 3 > innerProps.credit ? 
          "Not enough credit(s)"
          :
            "Buy cards"
          }
          
        </Button>
      </Flex>

    </Flex>
  )
}