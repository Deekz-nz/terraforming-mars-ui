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
            imageUrl={"images/megacredit.png"}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <GridTile
              title="Steel"
              height="50%"
              width="100%"
              value={credit}
              setValue={setCredit}
              productionValue={creditProduction}
              setProductionValue={setCreditProduction}
              imageUrl={"images/steel.png"}
            />
        </Grid.Col>
        <Grid.Col span={4}>
          <GridTile
              title="Titanium"
              height="50%"
              width="100%"
              value={credit}
              setValue={setCredit}
              productionValue={creditProduction}
              setProductionValue={setCreditProduction}
              imageUrl={"images/titanium.png"}
            />
        </Grid.Col>
        <Grid.Col span={4}>
          <GridTile
              title="Plants"
              height="50%"
              width="100%"
              value={credit}
              setValue={setCredit}
              productionValue={creditProduction}
              setProductionValue={setCreditProduction}
              imageUrl={"images/plant.png"}
            />
        </Grid.Col>
        <Grid.Col span={4}>
          <GridTile
              title="Power"
              height="50%"
              width="100%"
              value={credit}
              setValue={setCredit}
              productionValue={creditProduction}
              setProductionValue={setCreditProduction}
              imageUrl={"images/power.png"}
            />
        </Grid.Col>
        <Grid.Col span={4}>
          <GridTile
              title="Heat"
              height="50%"
              width="100%"
              value={credit}
              setValue={setCredit}
              productionValue={creditProduction}
              setProductionValue={setCreditProduction}
              imageUrl={"images/heat.png"}
            />
        </Grid.Col>
      </Grid>
    </Flex>
  )
}