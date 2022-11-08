import { GridItem, Grid } from "@chakra-ui/react";
import { Onboarding } from "./uikit/components/Onboarding";

import { AllCharactersContainer } from "./uikit/containers/AllCharactersContainer";
import { CharacterDetailContainer } from "./uikit/containers/CharacterDetailContainer";
import { MyTeamContainer } from "./uikit/containers/MyTeamContainer";

function App() {
  return (
    <>
      <Onboarding />
      <Grid
        h="100vh"
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(7, 1fr)"
        gap={2}
      >
        <GridItem rowSpan={2} colSpan={5}>
          <AllCharactersContainer />
        </GridItem>
        <GridItem rowSpan={3} colSpan={2}>
          <MyTeamContainer />
        </GridItem>
        <GridItem colSpan={5}>
          <CharacterDetailContainer />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
