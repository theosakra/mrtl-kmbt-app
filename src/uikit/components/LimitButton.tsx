import { Button } from "@chakra-ui/react";
import { Limit } from "../../modules/characters/characterStore";

export const LimitButton = (props: {
  limit: Limit;
  onClick?: () => void;
  isActive: boolean;
}) => {
  return (
    <Button
      bg={props.isActive ? "blue.300" : "blackAlpha.100"}
      onClick={props.onClick}
    >
      {props.limit}
    </Button>
  );
};
