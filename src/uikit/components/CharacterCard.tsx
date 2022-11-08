import { Avatar } from "@chakra-ui/react";

export interface CharacterCardProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

export const CharacterCard = (props: CharacterCardProps) => {
  return (
    <Avatar
      src={props.src}
      name={props.alt}
      onClick={props.onClick}
      boxSize="5rem"
      cursor="pointer"
      _hover={{
        transform: "scale(1.75)",
        zIndex: 100,
      }}
    />
  );
};
