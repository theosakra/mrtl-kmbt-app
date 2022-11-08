import { Center, Text, useToken } from "@chakra-ui/react";

export const EmptyStateCharacterDetail = () => {
  const boxShadow = useToken("colors", "box-shadow");

  return (
    <Center w="100%" h="100%" p="2.5rem">
      <Center
        w="100%"
        h="100%"
        borderRadius="0.5rem"
        boxShadow={boxShadow}
        className="character-detail"
      >
        <Text fontWeight={700} color="blackAlpha.700">
          You haven't selected any character
        </Text>
      </Center>
    </Center>
  );
};
