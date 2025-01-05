import { Button, Flex, Title, Text, rem } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals"
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import { useResourceStore } from "./useResourceStore";

export const BuyCardsModal = ({ context, id: modalId }: ContextModalProps<{}>) => {

  const {
    creditPerCard,
    credit,
    setResource,
  } = useResourceStore();
  const closeModal = () => {
    context.closeModal(modalId);
  };

  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  
  const buyCards = () => {
    setResource("credit", credit - cardNumber * creditPerCard);
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
        <Button size="lg" disabled={cardNumber * creditPerCard > credit || cardNumber === 0} onClick={() => buyCards()}>
          {cardNumber * creditPerCard > credit ? 
          "Not enough credit(s)"
          :
            "Buy cards"
          }
          
        </Button>
      </Flex>

    </Flex>
  )
}