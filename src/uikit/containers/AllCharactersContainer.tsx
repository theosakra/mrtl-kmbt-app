import { SearchIcon } from "@chakra-ui/icons";
import {
  SimpleGrid,
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
import {
  Limit,
  useCharacterStore,
} from "../../modules/characters/characterStore";
import { Loader } from "../components/Loader";
import Select from "react-select";
import { CHARACTER_TAGS } from "../../shared/constant";
import { CharacterCard } from "../components/CharacterCard";
import { LimitButton } from "../components/LimitButton";

type FormValue = {
  name: string;
  tags: Array<{ value: string; label: string }>;
};

const buttonLimitValue: Array<Limit> = [40, 80, 120, 160, "all"];

export const AllCharactersContainer = () => {
  const [
    limit,
    setLimit,
    name,
    setName,
    tags,
    setTags,
    resetStore,
    setSelectedID,
  ] = useCharacterStore(
    (state) => [
      state.limit,
      state.setLimit,
      state.name,
      state.setName,
      state.tags,
      state.setTags,
      state.resetStore,
      state.setSelectedID,
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
    <VStack
      spacing="2rem"
      w="100%"
      h="100%"
      align="start"
      p="1rem"
      className="all-character-container"
    >
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
            <CharacterCard
              alt={datum.name}
              src={datum.thumbnail}
              key={datum.id}
              onClick={() => setSelectedID(datum.id)}
            />
          ))
        )}
      </SimpleGrid>

      <HStack spacing="3rem" align="end" h="2.25rem">
        <VStack ml="2.5rem !important" align="start">
          <Text>Show:</Text>
          <ButtonGroup isAttached size="sm" className="show-by-number">
            {buttonLimitValue.map((lim, i) => (
              <LimitButton
                key={i}
                limit={lim}
                onClick={() => setLimit(lim)}
                isActive={lim === limit}
              />
            ))}
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
            <FormControl className="search-by-name">
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

            <FormControl className="filter-by-tags">
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

            <ButtonGroup className="filter-btn">
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
