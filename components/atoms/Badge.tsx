import { Circle, IconButton } from "@chakra-ui/react";
import { FiBell } from "react-icons/fi";
import { css } from "@emotion/react";

export default function Badge({ count }: { count: number }) {
  return (
    <IconButton
      css={css`
        position: relative !important;
      `}
      aria-label="Notifications"
      colorScheme="gray"
      isRound={true}
      variant="ghost"
      size="md"
      ml="0"
      icon={
        <>
          <FiBell color={"gray.750"} />
          <Circle
            as={"span"}
            color={"white"}
            position={"absolute"}
            top={"6px"}
            right={"4px"}
            fontSize={"0.6rem"}
            bgColor={"red"}
            borderRadius={"lg"}
            zIndex={9999}
            p={"2px"}
          >
            {count}
          </Circle>
        </>
      }
    />
  );
}
