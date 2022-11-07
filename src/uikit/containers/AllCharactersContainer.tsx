import { SearchIcon } from "@chakra-ui/icons";
import {
  SimpleGrid,
  Avatar,
  VStack,
  ButtonGroup,
  Button,
  Text,
  HStack,
  Input,
  FormControl,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import shallow from "zustand/shallow";
import { useGetAllCharacters } from "../../modules/characters/characterHooks";
import { useCharacterStore } from "../../modules/characters/characterStore";
import { Loader } from "../components/Loader";
import Select from "react-select";
import { CHARACTER_TAGS } from "../../shared/constant";

type FormValue = {
  name: string;
  tags: Array<{ value: string; label: string }>;
};

export const AllCharactersContainer = () => {
  const [limit, setLimit, name, setName, tags, setTags, resetStore] =
    useCharacterStore(
      (state) => [
        state.limit,
        state.setLimit,
        state.name,
        state.setName,
        state.tags,
        state.setTags,
        state.resetStore,
      ],
      shallow
    );

  const { register, handleSubmit, control } = useForm<FormValue>({
    defaultValues: {
      name: "",
      tags: [],
    },
  });

  const { data, isLoading } = useGetAllCharacters({
    page: 1,
    limit,
    name,
    tags,
  });

  return (
    <VStack spacing="2rem" w="100%" h="100%" align="start" p="1rem">
      <SimpleGrid
        w="100%"
        columns={isLoading ? 1 : 12}
        spacing="1rem"
        h="90%"
        overflowY="auto"
        overflowX="hidden"
        p="2.5rem"
      >
        {isLoading ? (
          <Loader />
        ) : (
          data?.map((datum) => (
            <Avatar
              key={datum.id}
              src={datum.thumbnail}
              name={datum.name}
              boxSize="5rem"
              cursor="pointer"
              _hover={{
                transform: "scale(1.75)",
                zIndex: 100,
              }}
            />
          ))
        )}
      </SimpleGrid>

      <HStack spacing="3rem" align="end" h="2.25rem">
        <VStack ml="2.5rem !important" align="start">
          <Text>Show:</Text>
          <ButtonGroup isAttached size="sm">
            <Button onClick={() => setLimit(40)}>40</Button>
            <Button onClick={() => setLimit(80)}>80</Button>
            <Button onClick={() => setLimit(120)}>120</Button>
            <Button onClick={() => setLimit(160)}>160</Button>
            <Button onClick={() => setLimit("all")}>All</Button>
          </ButtonGroup>
        </VStack>

        <form
          onSubmit={handleSubmit((e) => {
            if (e.tags.length) {
              setName("");
              return setTags(e.tags.map((tag) => tag.value));
            }

            return setName(e.name);
          })}
        >
          <HStack spacing="1rem">
            <FormControl>
              <InputGroup size="sm">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Search by name"
                  borderColor="blue.400"
                  w="15rem"
                  h="2.25rem"
                  {...register("name")}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <Controller
                name="tags"
                control={control}
                render={({ field: { onChange, ref } }) => (
                  <Select
                    ref={ref}
                    onChange={onChange}
                    placeholder="Filter by tags.."
                    isMulti
                    isClearable
                    name="colors"
                    options={CHARACTER_TAGS.map((tag) => ({
                      value: tag,
                      label: tag,
                    }))}
                    styles={{
                      container: (p) => ({
                        ...p,
                        width: "20rem",
                      }),
                      placeholder: (p) => ({
                        ...p,
                        fontSize: "0.9rem",
                      }),
                    }}
                  />
                )}
              />
            </FormControl>

            <ButtonGroup>
              <Button
                size="sm"
                colorScheme="blue"
                px="1rem"
                h="2.25rem"
                type="submit"
              >
                Filter
              </Button>
              <Button
                size="sm"
                colorScheme="blackAlpha"
                px="1rem"
                h="2.25rem"
                onClick={resetStore}
              >
                Reset
              </Button>
            </ButtonGroup>
          </HStack>
        </form>
      </HStack>
    </VStack>
  );
};
