import { GridItem, Grid } from "@chakra-ui/react";

import { AllCharactersContainer } from "./uikit/containers/AllCharactersContainer";

function App() {
  return (
    <Grid
      h="100vh"
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(7, 1fr)"
      gap={2}
    >
      <GridItem rowSpan={2} colSpan={5}>
        <AllCharactersContainer />
      </GridItem>
      <GridItem rowSpan={3} colSpan={2} bg="papayawhip" />
      <GridItem colSpan={5} bg="tomato" />
    </Grid>
  );
}

export default App;
