import {
  Center,
  CloseButton,
  HStack,
  Img,
  Spinner,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Tag,
  SimpleGrid,
  Text,
  Button,
} from "@chakra-ui/react";
import shallow from "zustand/shallow";
import { useGetCharacterByID } from "../../modules/characters/characterHooks";
import { useCharacterStore } from "../../modules/characters/characterStore";
import { Character } from "../../types";
import { EmptyStateCharacterDetail } from "../components/EmptyStateCharacterDetail";

const Name = (props: { name: string }) => {
  return (
    <FormControl>
      <FormLabel>Name</FormLabel>
      <Input type="text" readOnly value={props.name} />
    </FormControl>
  );
};

const Tags = (props: { tags: Character["tags"] }) => {
  return (
    <FormControl>
      <FormLabel>Tags</FormLabel>
      <HStack>
        {/* The difference of colors for tags should come from BE */}
        {props.tags?.map((tag) => (
          <Tag>{tag.tag_name}</Tag>
        ))}
      </HStack>
    </FormControl>
  );
};

export const CharacterDetailContainer = () => {
  const [
    selectedID,
    setSelectedID,
    selectedCharacters,
    setSelectedCharacters,
    checkIsInTeam,
  ] = useCharacterStore(
    (state) => [
      state.selectedID,
      state.setSelectedID,
      state.selectedCharacters,
      state.setSelectedCharacters,
      state.checkIsInTeam,
    ],
    shallow
  );

  const { data, isLoading } = useGetCharacterByID(
    { id: selectedID || 0 },
    { enabled: !!selectedID }
  );

  if (isLoading) {
    return (
      <Center w="100%" h="100%">
        <Spinner />
      </Center>
    );
  }

  if (!data) {
    return <EmptyStateCharacterDetail />;
  }

  return (
    <HStack w="100%" h="100%" p="2.5rem">
      <HStack
        position="relative"
        bg="white"
        py="1rem"
        borderRadius="0.5rem"
        boxShadow="md"
      >
        <CloseButton
          onClick={() => setSelectedID(null)}
          position="absolute"
          right="2rem"
          top="2rem"
        />

        <Img
          src={data.image}
          alt={data.name}
          h="15rem"
          boxShadow="lg"
          borderRadius="0.5rem"
          bg="white"
        />

        <VStack
          align="start"
          h="100%"
          spacing="1rem"
          ml="2rem !important"
          mr="5rem !important"
        >
          <Name name={data.name} />
          <Tags tags={data.tags} />
        </VStack>

        <SimpleGrid w="100%" columns={5} gap="1">
          {data.abilities.map((ability, i) => (
            <VStack w="100%" align="center" key={i} h="100%">
              <Text fontWeight="bold" fontSize="1.35rem">
                {ability.abilityName}
              </Text>
              <Text
                color={ability.abilityScore === 10 ? "red" : "black"}
                fontWeight="bold"
                fontSize="1.25rem"
              >
                {ability.abilityScore}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>

        <Button
          size="sm"
          position="absolute"
          right="2rem"
          bottom="2rem"
          colorScheme="blue"
          disabled={selectedCharacters.length === 5 || checkIsInTeam(data.name)}
          onClick={() => {
            const mappedAbility = new Map();

            data.abilities.forEach((datum) => {
              mappedAbility.set(datum.abilityName, datum.abilityScore);
            });

            return setSelectedCharacters({
              name: data.name,
              abilities: mappedAbility,
              thumbnail: data.thumbnail,
            });
          }}
        >
          Add to Roster
        </Button>
      </HStack>
    </HStack>
  );
};
