import {
  Avatar,
  CloseButton,
  Heading,
  Img,
  SimpleGrid,
  Text,
  useToken,
  VStack,
} from "@chakra-ui/react";
import { useCharacterStore } from "../../modules/characters/characterStore";
import { ABILITY_NAME } from "../../shared/constant";
import Bg from "../../img/Mortal-Kombat-Logo.png";
import shallow from "zustand/shallow";

export const MyTeamContainer = () => {
  const [team, getAverageTeamValue, removeCharacterFromTeam] =
    useCharacterStore(
      (state) => [
        state.selectedCharacters,
        state.getAverageTeamValue,
        state.removeCharacterFromTeam,
      ],
      shallow
    );
  const boxShadow = useToken("colors", "box-shadow");

  return (
    <VStack w="100%" h="100%" p="2.5rem 1rem">
      <VStack
        w="100%"
        h="100%"
        className="my-team"
        boxShadow={boxShadow}
        borderRadius="0.5rem"
        p="1rem"
        spacing="2.5rem"
        bg="white"
      >
        <Heading>
          {team.length === 5
            ? "Your champions!"
            : team.length
            ? "Complete your roster"
            : "Your team is empty"}
        </Heading>

        <SimpleGrid w="80%" columns={5} spacing="1rem" h="10rem">
          {team.map((char) => (
            <VStack w="100%" h="100%" position="relative" key={char.name}>
              <Avatar
                src={char.thumbnail}
                name={char.name}
                boxSize="3.75rem"
                cursor="pointer"
              />
              <Text textAlign="center" fontSize="sm" fontWeight="bold">
                {char.name}
              </Text>
              <CloseButton
                bg="blackAlpha.300"
                position="absolute"
                bottom="0.5rem"
                onClick={() => removeCharacterFromTeam(char.name)}
              />
            </VStack>
          ))}
        </SimpleGrid>

        <SimpleGrid columns={3} w="100%" mt="5rem !important">
          {ABILITY_NAME.map((item, i) => (
            <VStack w="100%" align="center" h="100%" key={i}>
              <Text fontWeight="bold" fontSize="1.35rem">
                {item}
              </Text>
              <Text
                color={getAverageTeamValue(item) === 10 ? "red" : "black"}
                fontWeight="bold"
                fontSize="1.25rem"
              >
                {getAverageTeamValue(item) || "-"}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>

        <Text>* Total as average for team</Text>

        <Img src={Bg} />
      </VStack>
    </VStack>
  );
};
