import { Flex, Grid } from "@mantine/core";
import { GridTile } from "./GridTile";
import { useState } from "react";

export function MainGrid() {

  const [ credit, setCredit ] = useState<number>(0);
  const [ creditProduction, setCreditProduction ] = useState<number>(0);

  return (
    <Flex style={{width: "100%", height: "100%"}}>
      <Grid style={{width: "100%", height: "100%"}}>
        <Grid.Col span={4}>
          <GridTile
            title="Credits"
            height="50%"
            width="100%"
            value={credit}
            setValue={setCredit}
            productionValue={creditProduction}
            setProductionValue={setCreditProduction}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          Steel
        </Grid.Col>
        <Grid.Col span={4}>
          Titanium
        </Grid.Col>
        <Grid.Col span={4}>
          Plants
        </Grid.Col>
        <Grid.Col span={4}>
          Electicity
        </Grid.Col>
        <Grid.Col span={4}>
          Heat
        </Grid.Col>
      </Grid>
    </Flex>
  )
}