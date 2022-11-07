import { Avatar, Stack } from "@mui/material";

export interface CharacterCardProps {
  src: string;
  alt: string;
}

export const CharacterCard = (props: CharacterCardProps) => {
  return (
    <Stack spacing={2}>
      <Avatar src={props.src} sx={{ width: "5rem", height: "5rem" }} />
    </Stack>
  );
};
